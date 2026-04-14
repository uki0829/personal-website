import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import DesignPortfolio from "@/components/DesignPortfolio";
import ReachOut from "@/components/ReachOut";
export default function Home() {
  return (
    <main>
      <BackgroundSlideshow />
      <Navigation />
      <Hero />
      <Intro />
      <WorkExperience />
      <Skills />
      <Projects />
      <Education />
      <DesignPortfolio />
      <ReachOut />
    </main>
  );
}
