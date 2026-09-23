import Hero from "../components/sections/Hero";
import GlowCard from "../components/common/GlowCard";
import SectionHeading from "../components/common/SectionHeading";
import { useLanguage } from "../context/LanguageContext";
import "./AboutMe.css";

export default function AboutMe() {
  const { t } = useLanguage();
  return (
    <div className="about-me">
      <Hero />
      <section className="about-me__bio">
        <SectionHeading as="h2" eyebrow={t("about.eyebrow")} title={t("about.title")} />
        <GlowCard className="about-me__bio-card">
          <p>
            {t("about.bioOne")}
          </p>
          <p>
            {t("about.bioTwo")}
          </p>
        </GlowCard>
      </section>
    </div>
  );
}
