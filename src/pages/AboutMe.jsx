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
            I'm Mahad Ahmad, A Computer Science student and aspiring full-stack developer with hands-on experience building responsive web interfaces and modern web applications. Familiar with React, JavaScript, TypeScript, Node.js, Express, and MongoDB, with a strong interest in UI/UX design and creating intuitive digital experiences.
          </p>
          <p>
            Experienced in completing frontend development internship tasks and building personal projects across web development and interface design.
          </p>
        </GlowCard>
      </section>
    </div>
  );
}
