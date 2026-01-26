import { createClient, createServerStorageClient } from '@/lib/supabase-server';
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
    const role = user?.user_metadata?.role;
    const isSuperAdmin = role === "superadmin";
    
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

    if (destination.owner_id !== user.id && !isSuperAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized: You do not own this destination' },
        { status: 403 }
      );
    }

    // Get update data
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const content = formData.get('content');
    const embed = formData.get('embed');
    const about_page_raw = formData.get('about_page');
    const about_page =
      typeof about_page_raw === "string" && about_page_raw.trim() !== ""
        ? JSON.parse(about_page_raw)
        : null;


    const image = formData.get('image') as File | null;
    if (image && image.size > 0) {
      const ext = image.name.split('.').pop();
      const filePath = `${slug}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('Images')
        .upload(filePath, image, { upsert: true, contentType: image.type });

      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }
    }

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
