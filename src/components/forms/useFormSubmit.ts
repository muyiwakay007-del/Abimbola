"use client";

import { useState } from "react";

export type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const messages: Record<string, string> = {
  not_configured: "This form isn't connected yet. Please check back soon. Thank you for your patience!",
  invalid_email: "Please enter a valid email address.",
  name_required: "Please tell me your name.",
  message_too_short: "Please write a little more in your message.",
};

/** Posts JSON to an API route and tracks honest status messages. */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function submit(data: Record<string, string>) {
    setStatus({ state: "submitting" });
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        setStatus({ state: "success" });
        return true;
      }
      const { error } = await res.json().catch(() => ({ error: "" }));
      setStatus({ state: "error", message: messages[error] ?? "Something went wrong. Please try again in a moment." });
    } catch {
      setStatus({ state: "error", message: "We couldn't reach the server. Please check your connection and try again." });
    }
    return false;
  }

  return { status, submit };
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
