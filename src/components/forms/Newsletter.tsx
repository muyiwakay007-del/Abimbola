"use client";

import { useId, useState, type FormEvent } from "react";
import { useFormSubmit, EMAIL_RE } from "./useFormSubmit";
import styles from "./forms.module.css";

type Errors = Partial<Record<"name" | "email", string>>;

/** "Stay Connected" newsletter sign-up. Server handler: src/app/api/newsletter/route.ts */
export function Newsletter({ id = "newsletter" }: { id?: string }) {
  const uid = useId();
  const { status, submit } = useFormSubmit("/api/newsletter");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(data.email?.trim() ?? "")) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    if (await submit(data)) form.reset();
  }

  return (
    <section className={styles.newsletter} id={id} aria-labelledby={`${uid}-title`}>
      <div className={`container ${styles.newsletterInner}`}>
        <div className={styles.newsletterCopy} data-reveal>
          <span className="eyebrow">
            Newsletter
          </span>
          <h2 id={`${uid}-title`} className={styles.newsletterTitle}>
            Stay <em>Connected</em>
          </h2>
          <p className={styles.newsletterText}>Get updates on new books, reflections, resources, and what&apos;s happening next.</p>
        </div>

        {status.state === "success" ? (
          <div className={styles.success} role="status">
            <strong>Thank you for joining!</strong>
            <span>Please check your inbox. You may need to confirm your subscription.</span>
          </div>
        ) : (
          <form className={styles.newsletterForm} onSubmit={onSubmit} noValidate data-reveal>
            <div className={styles.field}>
              <label htmlFor={`${uid}-name`} className={styles.labelLight}>
                Name
              </label>
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                autoComplete="given-name"
                className={styles.input}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${uid}-name-err` : undefined}
              />
              {errors.name && (
                <span id={`${uid}-name-err`} className={styles.errorLight}>
                  {errors.name}
                </span>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor={`${uid}-email`} className={styles.labelLight}>
                Email
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className={styles.input}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${uid}-email-err` : undefined}
              />
              {errors.email && (
                <span id={`${uid}-email-err`} className={styles.errorLight}>
                  {errors.email}
                </span>
              )}
            </div>
            {/* honeypot: hidden from people, tempting to bots */}
            <div className={styles.hp} aria-hidden="true">
              <label>
                Company <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <button type="submit" className={styles.submitLight} disabled={status.state === "submitting"}>
              {status.state === "submitting" ? "Joining…" : "Join the Community"}
            </button>
            <p className={styles.fine}>No spam, just thoughtful updates. Unsubscribe anytime.</p>
            <p role="status" aria-live="polite" className={styles.statusLight}>
              {status.state === "error" ? status.message : ""}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
