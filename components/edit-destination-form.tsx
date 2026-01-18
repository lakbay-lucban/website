"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import MDEditor from '@uiw/react-md-editor';


import {
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
  } from "@/components/ui/field"

type Destination = {
  slug: string;
  name: string;
  description: string;
  content: string | null;
  embed: string | null;
  about_page: {
    phone?: string;
    email?: string;
    facebook?: string;
    address?: string;
  } | null;
};

type EditDestinationFormProps = {
  destination: Destination;
};

export default function EditDestinationForm({ destination }: EditDestinationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState(destination.name);
  const [description, setDescription] = useState(destination.description || "");
  const [content, setContent] = useState(destination.content || "");
  const [embed, setEmbed] = useState(destination.embed || "");
  
  const [phone, setPhone] = useState(destination.about_page?.phone || "");
  const [email, setEmail] = useState(destination.about_page?.email || "");
  const [facebook, setFacebook] = useState(destination.about_page?.facebook || "");
  const [address, setAddress] = useState(destination.about_page?.address || "");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const aboutPage = {
        ...(phone && { phone }),
        ...(email && { email }),
        ...(facebook && { facebook }),
        ...(address && { address }),
      };

      const response = await fetch(`/api/destinations/${destination.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          content,
          embed,
          about_page: Object.keys(aboutPage).length > 0 ? aboutPage : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to update destination");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      
      // Refresh the page after a short delay to show success message
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Card>
       <div className="px-5">
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Basic Information</FieldLegend>
                    <FieldGroup className="flex flex-col gap-3">
                        <FieldLabel>Name *</FieldLabel>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </FieldGroup>
                    <FieldGroup className="flex flex-col gap-3">
                        <FieldLabel>Description *</FieldLabel>
                        <Textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </FieldGroup>
                    <FieldGroup className="flex flex-col gap-3">
                        <FieldLabel>Google Maps Link *</FieldLabel>
                        <Input id="embed" type="url" value={embed} onChange={(e) => setEmbed(e.target.value)} required placeholder="https://www.google.com/maps/embed?..."/>
                    </FieldGroup>
                </FieldSet>
                <FieldSeparator/>
                <FieldSet>
                    <FieldLegend>Content</FieldLegend>
                    <div data-color-mode="light">
                        <div className="md:hidden flex flex-col gap-5">
                            <MDEditor value={content} onChange={(val) => setContent(val ?? "")} height="100%" preview="edit"/>
                        </div>
                        <div className="hidden md:block">
                            <MDEditor value={content} onChange={(val) => setContent(val ?? "")} height="100%" preview="live"/>
                        </div>
                    </div>
                </FieldSet>
                <FieldSet>
                    <FieldLegend>Contact Information</FieldLegend>
                    <FieldGroup className="flex flex-col gap-3">
                        <FieldLabel>Phone</FieldLabel>
                        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+63 000 000 0000"/>
                    </FieldGroup>
                    <FieldGroup className="flex flex-col gap-3">
                        <FieldLabel>Email</FieldLabel>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@example.com"/>
                    </FieldGroup>
                    <FieldGroup className="flex flex-col gap-3">
                        <FieldLabel>Facebook</FieldLabel>
                        <Input id="facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="Facebook Page"/>
                    </FieldGroup>
                    <FieldGroup className="flex flex-col gap-3">
                        <FieldLabel>Address</FieldLabel>
                        <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, Barangay, City"/>
                    </FieldGroup>
                </FieldSet>
                <FieldSet>
                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-green-600 text-sm bg-green-50 p-3 rounded">
                            Destination updated successfully!
                        </div>
                    )}
                    <Button type="submit" className="bg-gray-900" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
                    <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>Cancel</Button>
                </FieldSet>
            </FieldGroup>
       </div>
    </Card>
  );
}
