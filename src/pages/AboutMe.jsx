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
            I'm Mahad Ahmad, a Computer Science student and full-stack developer skilled in React, TypeScript, Node.js, Express, and MongoDB, with a passion for UI/UX and modern web experiences.
          </p>
          <p>
            Experienced in completing frontend development internship tasks and building personal projects across web development and interface design.
          </p>
        </GlowCard>
      </section>
    </div>
  );
}
