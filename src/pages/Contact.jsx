import SectionHeading from "../components/common/SectionHeading";
import ContactInfo from "../components/sections/ContactInfo";
import { useLanguage } from "../context/LanguageContext";
import "./Contact.css";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <div className="contact">
      <SectionHeading
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        description={t("contact.description")}
      />
      <ContactInfo />
    </div>
  );
}
