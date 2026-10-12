import SectionHeading from "../components/common/SectionHeading";
import ContactInfo from "../components/sections/ContactInfo";
import ContactForm from "../components/sections/ContactForm";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact">
      <SectionHeading
        eyebrow="Get in touch"
        title="Contact"
        description="Reach out about internships, freelance work, or collaboration — I'll get back to you as soon as I can."
      />

      <div className="contact__grid">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}