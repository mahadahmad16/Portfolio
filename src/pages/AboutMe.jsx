import Hero from "../components/sections/Hero";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <div className="about-me">
      <Hero />
      <section className="about-me__bio" aria-labelledby="about-me-command">
        <h2 className="about-me__command" id="about-me-command">
          <span>mahad@portfolio:~</span> $ about
        </h2>
        <div className="about-me__bio-card">
          <div className="about-me__story">
            <p>
              I build websites that are fast and reliable, and I care about
              every detail—from how they work to how they look.
            </p>
            <p>
              I write clear code and make websites easy to use, with smooth
              performance and details that feel just right.
            </p>
          </div>
          <dl className="about-me__details">
            <div>
              <dt>Role</dt>
              <dd>Full-stack Developer || UI/UX Designer</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Web <span>·</span> Backend <span>·</span> UI/UX</dd>
            </div>
            <div>
              <dt>Mindset</dt>
              <dd className="about-me__mindset">Curious, always learning</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
