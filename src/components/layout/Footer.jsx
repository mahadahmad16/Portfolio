import { Github, Linkedin, Mail } from "lucide-react";
import "./Footer.css";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mahadahmad16", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mahad-ahmad-4a19b32a7/",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:mahadahmadhtm@gmail.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__text">
        © {new Date().getFullYear()} Mahad Ahmad. Built with React.
      </p>

      <ul className="site-footer__socials">
        {SOCIALS.map(({ label, href, icon: Icon }) => {
          const isExternal = href.startsWith("http");
          return (
            <li key={label}>
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                aria-label={label}
                className="site-footer__icon-link"
              >
                <Icon size={18} strokeWidth={1.75} />
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
