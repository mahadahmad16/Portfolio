import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import SectionHeading from "./components/common/SectionHeading";
import AboutMe from "./pages/AboutMe";
import Qualifications from "./pages/Qualifications";
import MySkills from "./pages/MySkills";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Certificates from "./pages/Certificates";
import Projects from "./pages/MyProjects";
import Games from "./pages/Games";
import SnakeGame from "../src/components/games/snake/SnakeGame";
import TicTacToe from "../src/components/games/tic-tac-toe/TicTacToe";
import RockPaperScissors from "../src/components/games/rock-paper-scissors/RockPaperScissors";
import SplashScreen from "./components/common/SplashScreen";

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
  const [showSplash, setShowSplash] = useState(true);
  return (
    <BrowserRouter>
    {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AboutMe />} />
          <Route path="qualifications" element={<Qualifications />} />
          <Route path="skills" element={<MySkills />} />
          <Route path="contact" element={<Contact/>} />
          <Route path="resume" element={<Resume />} />
          <Route
            path="certificates"
            element={<Certificates />}
          />
          <Route path="projects" element={<Projects />} />
          <Route path="games" element={<Games />} />
          <Route
            path="games/snake"
            element={<SnakeGame />}
          />
          <Route
            path="games/tic-tac-toe"
            element={<TicTacToe />}
          />
          <Route
            path="games/rock-paper-scissors"
            element={<RockPaperScissors />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}