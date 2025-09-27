import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import SocialRail from "./components/SocialRail";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <SocialRail />
      <Hero />
      <Projects />
      <Contact />
    </>
  );
}
