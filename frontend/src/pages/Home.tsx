import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import ProblemStatements from "../components/sections/ProblemStatements";
import Timeline from "../components/sections/Timeline";
import Prizes from "../components/sections/Prizes";
import FAQ from "../components/sections/FAQ";
import Contact from "../components/sections/Contact";
import ContinuousBackground from "../components/ui/ContinuousBackground";

interface HomeProps {
  onRegisterClick: () => void;
  onLoginClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onRegisterClick }) => (
  <>
    <Hero onRegisterClick={onRegisterClick} />
    <div style={{ position: "relative" }}>
      <ContinuousBackground />
      <About />
      <ProblemStatements />
      <Timeline />
      <Prizes />
      <FAQ />
      <Contact />
    </div>
  </>
);

export default Home;
