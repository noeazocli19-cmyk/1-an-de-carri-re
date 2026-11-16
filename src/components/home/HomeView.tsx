import { Container } from "@/components/shared/Container";
import AboutView from "@/components/about/AboutView";
import ContactView from "@/components/contact/ContactView";
import ParcoursView from "@/components/parcours/ParcoursView";
import { PendingSectionScroll } from "@/components/portfolio/PendingSectionScroll";
import Hero from "./Hero";
import SelectedProjects from "./SelectedProjects";
import OneYear from "./OneYear";
import Specialization from "./Specialization";

/**
 * Landing page : toutes les sections principales restent dans le même scroll.
 * La liste complète des projets, les notes et les tarifs ont leur propre vue.
 */
export default function HomeView() {
  return (
    <div>
      <PendingSectionScroll />
      <Hero />
      <SelectedProjects />
      <section id="about" className="scroll-mt-20">
        <AboutView />
      </section>
      <Container>
        <div className="rule" aria-hidden="true" />
      </Container>
      <section id="parcours" className="scroll-mt-20">
        <ParcoursView />
      </section>
      <OneYear />
      <Specialization />
      <section id="contact" className="scroll-mt-20">
        <ContactView />
      </section>
    </div>
  );
}
