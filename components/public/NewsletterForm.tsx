
// ============================================
// FILE: src/components/public/NewsletterForm.tsx
// ============================================

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/hooks/useNotification";
import { newsletterSchema } from "@/lib/validation/newsletter";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      showError("Invalid email address");
      return;
    }

    setLoading(true);
    try {
      await apiClient.post(API_ENDPOINTS.NEWSLETTER.SUBSCRIBE, { email });
      showSuccess("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      showError("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}