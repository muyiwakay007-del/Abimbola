import { clean, isEmail, sendContact } from "@/lib/forms";
import { contactTopics } from "@/content/site";

const TOPICS: readonly string[] = contactTopics;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "invalid_request" }, { status: 400 });

  if (clean(body.company)) return Response.json({ ok: true }); // honeypot

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const topic = TOPICS.includes(body.topic) ? body.topic : "General";
  const message = clean(body.message, 5000);
  if (!name) return Response.json({ error: "name_required" }, { status: 400 });
  if (!isEmail(email)) return Response.json({ error: "invalid_email" }, { status: 400 });
  if (message.length < 10) return Response.json({ error: "message_too_short" }, { status: 400 });

  const result = await sendContact({ name, email, topic, message });
  return result.ok ? Response.json({ ok: true }) : Response.json({ error: result.error }, { status: result.status });
}
