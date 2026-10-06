import { Mail, Phone, MapPin } from "lucide-react";
import GlowCard from "../common/GlowCard";
import { CONTACT_INFO } from "../../data/contactInfo";
import { SOCIAL_LINKS } from "../../data/socialLinks";
import "./ContactInfo.css";

function GitHubIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.12 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12.05 0C5.48 0 .13 5.35.13 11.92c0 2.1.55 4.15 1.6 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.74 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.16-3.45-8.42ZM12.05 21.8a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 1 1 8.37 4.63Zm5.4-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07a8.12 8.12 0 0 1-2.4-1.48 9.05 9.05 0 0 1-1.67-2.08c-.17-.3-.02-.45.13-.6.13-.12.3-.32.45-.47.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

const CONTACT_ICONS = {
  Email: Mail,
  Phone: Phone,
  Location: MapPin,
};

const SOCIAL_ICONS = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  WhatsApp: WhatsAppIcon,
  Mail,
};

/**
 * Contact details as clickable actions (email/phone open the native
 * app), plus the social links row underneath. Data lives in
 * src/data/contactInfo.js and src/data/socialLinks.js.
 */
export default function ContactInfo() {
  return (
    <GlowCard as="section" className="contact-info">
      <ul className="contact-info__list">
        {CONTACT_INFO.map(({ label, value, href }) => {
          const Icon = CONTACT_ICONS[label];
          return (
            <li key={label} className="contact-info__item">
              <span className="contact-info__icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div>
                <p className="contact-info__label">{label}</p>
                {href ? (
                  <a href={href} className="contact-info__value">
                    {value}
                  </a>
                ) : (
                  <p className="contact-info__value">{value}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="contact-info__socials">
        <p className="contact-info__label">Elsewhere</p>
        <ul className="contact-info__social-list">
          {SOCIAL_LINKS.map(({ label, href }) => {
            const Icon = SOCIAL_ICONS[label];
            return (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="contact-info__social-link"
                >
                  <Icon size={16} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </GlowCard>
  );
}
