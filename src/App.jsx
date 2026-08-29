import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

/**
 * Temporary stand-in for pages that haven't been built yet.
 * Swap each route's `element` below for the real page component as
 * you build src/pages/*.jsx — this just lets you preview the layout
 * (Sidebar / Topbar / Footer / ParticlesBackground) in the meantime.
 */
function Placeholder({ title }) {
  return (
    <section>
      <h1 style={{ fontFamily: "var(--font-display)" }}>{title}</h1>
      <p style={{ color: "var(--text-muted)" }}>
        This section hasn't been built yet — content coming soon.
      </p>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Placeholder title="About Me" />} />
          <Route
            path="qualifications"
            element={<Placeholder title="Qualifications" />}
          />
          <Route path="skills" element={<Placeholder title="My Skills" />} />
          <Route path="contact" element={<Placeholder title="Contact" />} />
          <Route path="resume" element={<Placeholder title="Resume" />} />
          <Route
            path="certificates"
            element={<Placeholder title="Certificates" />}
          />
          <Route path="projects" element={<Placeholder title="My Projects" />} />
          <Route path="games" element={<Placeholder title="Games" />} />
          <Route
            path="games/snake"
            element={<Placeholder title="Snake Game" />}
          />
          <Route
            path="games/tic-tac-toe"
            element={<Placeholder title="Tic-Tac-Toe" />}
          />
          <Route
            path="games/rock-paper-scissors"
            element={<Placeholder title="Rock-Paper-Scissors" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}