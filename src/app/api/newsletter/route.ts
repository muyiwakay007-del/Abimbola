import { clean, isEmail, subscribe } from "@/lib/forms";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "invalid_request" }, { status: 400 });

  // Honeypot: real visitors never fill the hidden "company" field.
  if (clean(body.company)) return Response.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  if (!name) return Response.json({ error: "name_required" }, { status: 400 });
  if (!isEmail(email)) return Response.json({ error: "invalid_email" }, { status: 400 });

  const result = await subscribe({ name, email });
  return result.ok ? Response.json({ ok: true }) : Response.json({ error: result.error }, { status: result.status });
}
