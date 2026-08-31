import { Mail, Phone, MapPin } from "lucide-react";
import GlowCard from "../common/GlowCard";
import SocialIcons from "../common/SocialIcons";
import { CONTACT_INFO } from "../../data/contactInfo";
import "./ContactInfo.css";

const ICONS = {
  Email: Mail,
  Phone: Phone,
  Location: MapPin,
};

/**
 * Contact details as clickable actions (email/phone open the native
 * app), plus the shared social links row underneath. Data lives in
 * src/data/contactInfo.js.
 */
export default function ContactInfo() {
  return (
    <GlowCard as="section" className="contact-info">
      <ul className="contact-info__list">
        {CONTACT_INFO.map(({ label, value, href }) => {
          const Icon = ICONS[label];
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
        <SocialIcons />
      </div>
    </GlowCard>
  );
}