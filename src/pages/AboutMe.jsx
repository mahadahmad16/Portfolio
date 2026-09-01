import Hero from "../components/sections/Hero";
import GlowCard from "../components/common/GlowCard";
import SectionHeading from "../components/common/SectionHeading";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <div className="about-me">
      <Hero />
      <section className="about-me__bio">
        <SectionHeading as="h2" eyebrow="About" title="A bit about me" />
        <GlowCard className="about-me__bio-card">
          <p>
            I'm Mahad Ahmad, a BS Computer Science student at GIFT University,
            currently in my 7th semester. I enjoy working across the frontend
            stack — HTML, CSS, JavaScript, and React — alongside tools like
            Git &amp; GitHub and Figma.
          </p>
          <p>
            My goal is to grow into a Frontend Developer who builds modern,
            thoughtful web applications, and I'm currently expanding into
            full-stack development as the next step in that journey.
          </p>
        </GlowCard>
      </section>
    </div>
  );
}
