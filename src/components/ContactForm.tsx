import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { profile } from "@/data/portfolio";

import { Button } from "./Button";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  subject: z.string().trim().min(3, "Please add a subject.").max(120),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(1200),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const submit = (data: FormValues) => {
    const body = encodeURIComponent(`${data.message}\n\nFrom: ${data.name} (${data.email})`);
    const subject = encodeURIComponent(data.subject);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="contact-form">
      <div className="form-grid">
        <label htmlFor="contact-name">
          Name
          <input
            id="contact-name"
            {...register("name")}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby="contact-name-error"
          />
          <small id="contact-name-error">{errors.name?.message}</small>
        </label>

        <label htmlFor="contact-email">
          Email
          <input
            id="contact-email"
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby="contact-email-error"
          />
          <small id="contact-email-error">{errors.email?.message}</small>
        </label>
      </div>

      <label htmlFor="contact-subject">
        Subject
        <input
          id="contact-subject"
          {...register("subject")}
          placeholder="Internship, collaboration, or opportunity"
          aria-invalid={!!errors.subject}
          aria-describedby="contact-subject-error"
        />
        <small id="contact-subject-error">{errors.subject?.message}</small>
      </label>

      <label htmlFor="contact-message">
        Message
        <textarea
          id="contact-message"
          {...register("message")}
          rows={5}
          placeholder="Tell me about the opportunity or project..."
          aria-invalid={!!errors.message}
          aria-describedby="contact-message-error"
        />
        <small id="contact-message-error">{errors.message?.message}</small>
      </label>

      <div className="form-actions">
        <Button type="submit">
          <Send size={16} aria-hidden="true" /> Send email
        </Button>
        {sent && (
          <span className="form-success" role="status" aria-live="polite">
            <CheckCircle2 size={15} aria-hidden="true" /> Your email app is ready.
          </span>
        )}
      </div>
    </form>
  );
}
