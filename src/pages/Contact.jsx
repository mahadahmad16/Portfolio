import SectionHeading from "../components/common/SectionHeading";
import ContactInfo from "../components/sections/ContactInfo";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact">
      <SectionHeading
        eyebrow="Get in touch"
        title="Contact"
        description="Reach out about internships, freelance work, or collaboration — I'll get back to you as soon as I can."
      />
      <ContactInfo />
    </div>
  );
}
