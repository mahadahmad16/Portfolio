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
            I'm Mahad Ahmad, a Computer Science student who likes turning ideas into websites and apps people enjoy using. I bring the pages to life with React, JavaScript, and TypeScript, and use Figma for UI/UX design before adding polish with Tailwind and Bootstrap.
          </p>
          <p>
            Behind the scenes, I build with Python, FastAPI, Node.js, Express, or PHP, with PostgreSQL, MongoDB, or MySQL to keep the data in order. Git, GitHub and Postman help me take each project from first sketch to finished feature.
          </p>
        </GlowCard>
      </section>
    </div>
  );
}
