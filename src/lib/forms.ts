import { adminClient } from "@/lib/supabase";

/**
 * Server-side handlers for the newsletter and contact forms.
 * Pick a provider with environment variables (see .env.local.example):
 *
 *   NEWSLETTER_PROVIDER = brevo | mailchimp | convertkit | webhook | supabase
 *   CONTACT_PROVIDER    = webhook | supabase
 *
 * Until a provider is configured the API responds 503 and the form tells
 * the visitor honestly that sign-ups aren't open yet: nothing is faked.
 */

export type Result = { ok: true } | { ok: false; status: number; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isEmail = (v: unknown): v is string => typeof v === "string" && v.length <= 254 && EMAIL_RE.test(v.trim());
export const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const notConfigured: Result = { ok: false, status: 503, error: "not_configured" };

async function ok(res: Response, allow: number[] = []): Promise<Result> {
  if (res.ok || allow.includes(res.status)) return { ok: true };
  console.error("[forms] provider error", res.status, await res.text().catch(() => ""));
  return { ok: false, status: 502, error: "provider_error" };
}

async function postWebhook(url: string, payload: object): Promise<Result> {
  return ok(await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) }));
}

/* ------------------------------ Newsletter ------------------------------ */

export async function subscribe({ name, email }: { name: string; email: string }): Promise<Result> {
  const env = process.env;
  const [firstName] = name.split(/\s+/);

  switch (env.NEWSLETTER_PROVIDER) {
    case "brevo": {
      if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID) return notConfigured;
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, attributes: { FIRSTNAME: firstName }, listIds: [Number(env.BREVO_LIST_ID)], updateEnabled: true }),
      });
      return ok(res);
    }
    case "mailchimp": {
      if (!env.MAILCHIMP_API_KEY || !env.MAILCHIMP_AUDIENCE_ID) return notConfigured;
      const dc = env.MAILCHIMP_API_KEY.split("-")[1];
      const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_AUDIENCE_ID}/members`, {
        method: "POST",
        headers: { Authorization: `Basic ${Buffer.from(`any:${env.MAILCHIMP_API_KEY}`).toString("base64")}`, "Content-Type": "application/json" },
        // "pending" sends Mailchimp's double opt-in confirmation email.
        body: JSON.stringify({ email_address: email, status: "pending", merge_fields: { FNAME: firstName } }),
      });
      // 400 "Member Exists" is treated as success so re-subscribing isn't an error.
      if (res.status === 400) {
        const body = await res.json().catch(() => ({}));
        if (body?.title === "Member Exists") return { ok: true };
        console.error("[forms] mailchimp error", body);
        return { ok: false, status: 502, error: "provider_error" };
      }
      return ok(res);
    }
    case "convertkit": {
      if (!env.CONVERTKIT_API_KEY || !env.CONVERTKIT_FORM_ID) return notConfigured;
      const res = await fetch(`https://api.convertkit.com/v3/forms/${env.CONVERTKIT_FORM_ID}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: env.CONVERTKIT_API_KEY, email, first_name: firstName }),
      });
      return ok(res);
    }
    case "webhook": {
      if (!env.NEWSLETTER_WEBHOOK_URL) return notConfigured;
      return postWebhook(env.NEWSLETTER_WEBHOOK_URL, { type: "newsletter", name, email, submittedAt: new Date().toISOString() });
    }
    case "supabase": {
      const db = adminClient();
      if (!db) return notConfigured;
      const { error } = await db.from("subscribers").upsert({ email: email.toLowerCase(), name }, { onConflict: "email" });
      if (error) {
        console.error("[forms] supabase subscribers:", error.message);
        return { ok: false, status: 502, error: "provider_error" };
      }
      return { ok: true };
    }
    default:
      return notConfigured;
  }
}

/* -------------------------------- Contact ------------------------------- */

export async function sendContact(msg: { name: string; email: string; topic: string; message: string }): Promise<Result> {
  const env = process.env;
  switch (env.CONTACT_PROVIDER) {
    case "webhook": {
      // Works with Formspree, Basin, Zapier/Make webhooks, Slack workflows, etc.
      if (!env.CONTACT_WEBHOOK_URL) return notConfigured;
      return postWebhook(env.CONTACT_WEBHOOK_URL, { ...msg, _subject: `Website message: ${msg.topic}`, submittedAt: new Date().toISOString() });
    }
    case "supabase": {
      const db = adminClient();
      if (!db) return notConfigured;
      const { error } = await db.from("contact_messages").insert(msg);
      if (error) {
        console.error("[forms] supabase contact_messages:", error.message);
        return { ok: false, status: 502, error: "provider_error" };
      }
      return { ok: true };
    }
    default:
      return notConfigured;
  }
}
