import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import SectionHeading from "./components/common/SectionHeading";
import AboutMe from "./pages/AboutMe";
import Qualifications from "./pages/Qualifications";

/**
 * Temporary stand-in for pages that haven't been built yet. Swap each
 * remaining route's `element` below for the real page component as
 * you build src/pages/*.jsx — About Me and Qualifications are done.
 */
function Placeholder({ title }) {
  return (
    <SectionHeading
      eyebrow="Coming soon"
      title={title}
      description="This section hasn't been built yet — content coming soon."
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AboutMe />} />
          <Route path="qualifications" element={<Qualifications />} />
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