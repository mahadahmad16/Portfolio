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
            I'm Mahad Ahmad, a Computer Science student who builds easy-to-use apps with React, JavaScript, TypeScript, Tailwind, and Bootstrap. I also create UI/UX designs in Figma and Canva.
          </p>
          <p>
            I use Python, FastAPI, Node.js, Express, PHP, PostgreSQL, MongoDB, and MySQL, plus Git, GitHub, and Postman to build and test my projects.
          </p>
        </GlowCard>
      </section>
    </div>
  );
}
