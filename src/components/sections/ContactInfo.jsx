import { Mail, Phone, MapPin } from "lucide-react";
import GlowCard from "../common/GlowCard";
import SocialIcons from "../common/SocialIcons";
import "./ContactInfo.css";

// TODO: move to src/data/contactInfo.js once the data/ folder is built
const CONTACT_ITEMS = [
  {
    label: "Email",
    value: "mahadahmadhtm@gmail.com",
    href: "mailto:mahadahmadhtm@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "0330-5458458",
    href: "tel:+923305458458",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Gujranwala, Pakistan",
    href: null,
    icon: MapPin,
  },
];

/**
 * Contact details as clickable actions (email/phone open the native
 * app), plus the shared social links row underneath.
 */
export default function ContactInfo() {
  return (
    <GlowCard as="section" className="contact-info">
      <ul className="contact-info__list">
        {CONTACT_ITEMS.map(({ label, value, href, icon: Icon }) => (
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
        ))}
      </ul>

      <div className="contact-info__socials">
        <p className="contact-info__label">Elsewhere</p>
        <SocialIcons />
      </div>
    </GlowCard>
  );
}