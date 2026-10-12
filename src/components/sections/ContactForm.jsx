import { useState } from "react";
import { Send } from "lucide-react";
import GlowCard from "../common/GlowCard";
import Button from "../common/Button";
import "./ContactForm.css";

const ENDPOINT = "https://api.web3forms.com/submit";

// Vite inlines this at BUILD time — it must be set in your .env locally
// AND in Vercel's Environment Variables, then redeployed. The key is
// public by design (it only routes submissions to your inbox; it can't
// log in to anything), so having it in the bundle is expected.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

/**
 * Contact form with no backend of your own: the browser POSTs the
 * fields to Web3Forms, and Web3Forms sends the email. Spam protection
 * is a hidden honeypot checkbox (`botcheck`) plus Web3Forms' own
 * server-side filtering.
 */
export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    // Grab the form now — event.currentTarget is null again after the first await
    const form = event.currentTarget;

    if (!ACCESS_KEY) {
      setStatus("error");
      setFeedback("The contact form isn't configured yet (missing access key).");
      return;
    }

    setStatus("sending");
    setFeedback("");

    // Unchecked checkboxes are omitted from FormData, so `botcheck`
    // only shows up in the payload if a bot ticked the hidden box.
    const fields = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...fields,
          access_key: ACCESS_KEY,
          subject: `New message from your portfolio — ${fields.name}`,
          from_name: "Portfolio Contact Form",
        }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFeedback("Thanks — your message was sent. I'll get back to you soon.");
        form.reset();
      } else {
        setStatus("error");
        setFeedback(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Couldn't reach the server. Check your connection and try again.");
    }
  }

  const isSending = status === "sending";

  return (
    <GlowCard as="section" className="contact-form" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className="contact-form__title">
        Send a message
      </h2>

      <form className="contact-form__form" onSubmit={handleSubmit}>
        <label className="contact-form__field">
          <span className="contact-form__label">Name</span>
          <input
            className="contact-form__input"
            type="text"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
          />
        </label>

        <label className="contact-form__field">
          <span className="contact-form__label">Email</span>
          <input
            className="contact-form__input"
            type="email"
            name="email"
            autoComplete="email"
            maxLength={150}
            required
          />
        </label>

        <label className="contact-form__field">
          <span className="contact-form__label">Message</span>
          <textarea
            className="contact-form__input contact-form__textarea"
            name="message"
            rows={5}
            maxLength={2000}
            required
          />
        </label>

        {/* Honeypot: invisible to people, tempting to bots */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: "none" }}
        />

        <Button
          type="submit"
          variant="primary"
          icon={Send}
          disabled={isSending}
          className="contact-form__submit"
        >
          {isSending ? "Sending…" : "Send message"}
        </Button>

        <p
          className={`contact-form__status ${
            status === "success"
              ? "contact-form__status--success"
              : status === "error"
              ? "contact-form__status--error"
              : ""
          }`}
          role="status"
          aria-live="polite"
        >
          {feedback}
        </p>
      </form>
    </GlowCard>
  );
}
