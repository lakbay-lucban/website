"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Image from "next/image";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
  } from "@/components/ui/field"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
          <div className="flex justify-center">
            <Image src="/logo.ico" alt="Lakbay Lucban Logo" width={86} height={86} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldSet>
                <FieldGroup>
                    <FieldTitle>Sign in to dashboard</FieldTitle>
                    <FieldDescription>Access your dashboard and manage your destinations.</FieldDescription>
                    <Field>
                        <FieldLabel>Email address</FieldLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="owner@example.com"/>
                    </Field>
                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"/>
                    </Field>
                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                        {error}
                        </div>
                    )}
                    <Button type="submit" className="w-full bg-gray-900" disabled={loading}>
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </FieldGroup>
            </FieldSet>
          </form>
      </Card>
    </div>
  );
}
