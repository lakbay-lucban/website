import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify ownership
    const { data: destination, error: fetchError } = await supabase
      .from('destinations')
      .select('owner_id')
      .eq('slug', slug)
      .maybeSingle();

    if (fetchError || !destination) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    if (destination.owner_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized: You do not own this destination' },
        { status: 403 }
      );
    }

    // Get update data
    const updates = await request.json();
    const { name, description, content, embed, about_page } = updates;

    // Update destination
    const { data: updated, error: updateError } = await supabase
      .from('destinations')
      .update({
        name,
        description,
        content,
        embed,
        about_page,
      })
      .eq('slug', slug)
      .eq('owner_id', user.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      data: updated 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while updating the destination' },
      { status: 500 }
    );
  }
}
