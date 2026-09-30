import { Container } from "@/components/shared/Container";
import Hero from "./Hero";
import SelectedProjects from "./SelectedProjects";
import OneYear from "./OneYear";
import Specialization from "./Specialization";
import ParcoursTeaser from "./ParcoursTeaser";
import NotesTeaser from "./NotesTeaser";
import ContactCta from "./ContactCta";

/**
 * Vue Accueil — assemblage des sections éditoriales dans l'ordre du récit :
 * Hero → Projets sélectionnés → Une année → Spécialisation → Parcours →
 * Notes → Contact. Les sections blanches adjacentes sont séparées par un
 * trait fin (.rule) aligné sur le Container.
 */
export default function HomeView() {
  return (
    <div>
      <Hero />
      <SelectedProjects />
      <OneYear />
      <Specialization />
      <Container>
        <div className="rule" aria-hidden="true" />
      </Container>
      <ParcoursTeaser />
      <Container>
        <div className="rule" aria-hidden="true" />
      </Container>
      <NotesTeaser />
      <ContactCta />
    </div>
  );
}
