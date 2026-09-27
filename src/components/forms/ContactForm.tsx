"use client";

import { useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { contactTopics } from "@/content/site";
import { useFormSubmit, EMAIL_RE } from "./useFormSubmit";
import styles from "./forms.module.css";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/** Contact form. Server handler: public/api/contact.php (runs on Bluehost). */
export function ContactForm() {
  const topic = useSearchParams().get("topic") ?? undefined;
  const initialTopic = topic === "review" ? "Review" : topic;
  const uid = useId();
  const { status, submit } = useFormSubmit("/api/contact.php");
  const [errors, setErrors] = useState<Errors>({});
  const defaultTopic = (contactTopics as readonly string[]).includes(initialTopic ?? "") ? initialTopic : "General";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(data.email?.trim() ?? "")) next.email = "Please enter a valid email address.";
    if ((data.message?.trim().length ?? 0) < 10) next.message = "Please write a short message (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    if (await submit(data)) form.reset();
  }

  if (status.state === "success") {
    return (
      <div className={styles.successCard} role="status">
        <h2 className={styles.successTitle}>Thank you for reaching out!</h2>
        <p>Your message has been sent. I&apos;ll get back to you as soon as I can.</p>
      </div>
    );
  }

  const field = (name: keyof Errors, label: string, input: React.ReactNode) => (
    <div className={styles.field}>
      <label htmlFor={`${uid}-${name}`} className={styles.label}>
        {label} <span aria-hidden="true">*</span>
      </label>
      {input}
      {errors[name] && (
        <span id={`${uid}-${name}-err`} className={styles.error}>
          {errors[name]}
        </span>
      )}
    </div>
  );
  const a11y = (name: keyof Errors) => ({
    id: `${uid}-${name}`,
    name,
    required: true,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${uid}-${name}-err` : undefined,
  });

  return (
    <form className={styles.contactForm} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        {field("name", "Your name", <input type="text" autoComplete="name" className={styles.inputLight} {...a11y("name")} />)}
        {field("email", "Email", <input type="email" inputMode="email" autoComplete="email" className={styles.inputLight} {...a11y("email")} />)}
      </div>
      <div className={styles.field}>
        <label htmlFor={`${uid}-topic`} className={styles.label}>
          What&apos;s this about?
        </label>
        <select id={`${uid}-topic`} name="topic" defaultValue={defaultTopic} className={styles.inputLight}>
          {contactTopics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      {field("message", "Message", <textarea rows={6} className={styles.inputLight} {...a11y("message")} />)}
      <div className={styles.hp} aria-hidden="true">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" className={styles.submit} disabled={status.state === "submitting"}>
        {status.state === "submitting" ? "Sending…" : "Send Message"}
      </button>
      <p role="status" aria-live="polite" className={styles.status}>
        {status.state === "error" ? status.message : ""}
      </p>
    </form>
  );
}
