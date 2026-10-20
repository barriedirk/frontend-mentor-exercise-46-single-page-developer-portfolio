/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Language, TRANSLATIONS, TranslatedProject } from "./data/translations";
import { PatternRings } from "./components/Icons";
import { ProjectModal } from "./components/ProjectModal";
import { DesignSystemModal } from "./components/DesignSystemModal";
import { HeroSection } from "./components/HeroSection";
import { SkillsList } from "./components/SkillsList";
import { ProjectsList } from "./components/ProjectsList";
import { ContactSection } from "./components/ContactSection";
import { SiteHeader } from "./components/SiteHeader";
import Footer from "./components/Footer";

export default function App() {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const contactSectionRef = useRef<HTMLElement | null>(null);

  // Language state (default 'en' per Frontend Mentor challenge, or user preference)
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("barrie_freyre_lang");
      if (saved === "es" || saved === "en") return saved;
    } catch {
      // Ignore localStorage access issues
    }
    return "en";
  });

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    try {
      localStorage.setItem("barrie_freyre_lang", lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore localStorage access issues
    }
  }, [lang]);

  const [selectedProject, setSelectedProject] =
    useState<TranslatedProject | null>(null);
  const [modalMode, setModalMode] = useState<"preview" | "code">("preview");
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);

  const isModalOpen = selectedProject !== null || isDesignSystemOpen;

  // Re-sync selected project when language changes
  useEffect(() => {
    if (selectedProject) {
      const updated = t.projects.list.find((p) => p.id === selectedProject.id);
      if (updated) setSelectedProject(updated);
    }
  }, [lang, t.projects.list, selectedProject]);

  const scrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 450);
  };

  const openProjectModal = (
    project: TranslatedProject,
    mode: "preview" | "code",
  ) => {
    setSelectedProject(project);
    setModalMode(mode);
  };

  return (
    <>
      {/* Skip Link for Keyboard Accessibility */}
      <a href="#content" className="skip-link">
        {t.header.skipToContent}
      </a>

      {/* Main Page Layout Wrapper (inert when modal dialog is open) */}
      <div
        inert={isModalOpen ? true : undefined}
        className="min-h-screen bg-[#151515] text-white relative overflow-x-hidden"
      >
        <SiteHeader
          logo={t.header.logo}
          socialAria={t.header.socialAria}
          langToggleAria={t.header.langToggleAria}
          opensInNewTab={t.header.opensInNewTab}
          lang={lang}
          setLang={setLang}
        />

        {/* PRIMARY MAIN LANDMARK */}
        <main id="content" tabIndex={-1} className="outline-none">
          <HeroSection t={t.hero} onContactClick={scrollToContact} />

          {/* SKILLS SECTION */}
          <section
            aria-labelledby="skills-heading"
            className="relative max-w-[1110px] mx-auto px-4 md:px-8 lg:px-0 border-t border-white/25 border-b md:border-b-0 py-10 md:pt-[52px] md:pb-0 lg:pt-[72px] mb-20 md:mb-[100px] lg:mb-[140px]"
          >
            {/* Screen reader section heading for landmark outline */}
            <h2 id="skills-heading" className="sr-only">
              {t.skills.sectionTitle}
            </h2>

            <SkillsList
              skills={t.skills.skills}
              yearsExperience={t.skills.yearsExperience}
            />

            {/* Decorative Rings Bottom-Right of Skills */}
            <PatternRings className="absolute -right-[344px] -bottom-[64px] md:-right-[332px] md:-bottom-[64px] lg:-right-[404px] lg:-bottom-[50px] z-0" />
          </section>

          {/* PROJECTS SECTION */}
          <section
            id="projects"
            aria-labelledby="projects-heading"
            className="max-w-[1110px] mx-auto px-4 md:px-8 lg:px-0 pb-20 md:pb-[100px] lg:pb-[139px]"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10 md:mb-[60px] lg:mb-20">
              <h2 id="projects-heading" className="heading-xl text-white">
                {t.projects.sectionTitle}
              </h2>
              <button
                type="button"
                onClick={scrollToContact}
                className="btn-underline"
              >
                {t.projects.contactBtn}
              </button>
            </div>

            {/* Projects 2-Column Grid */}
            <ProjectsList
              projects={t.projects.list}
              viewProjectText={t.projects.viewProject}
              viewCodeText={t.projects.viewCode}
              liveDemoLabel={t.projects.liveDemoLabel}
              githubLabel={t.projects.githubLabel}
              liveSiteTooltip={t.projects.liveSiteTooltip}
              githubTooltip={t.projects.githubTooltip}
              onOpenModal={openProjectModal}
            />
          </section>

          {/* CONTACT SECTION */}
          <ContactSection
            sectionRef={contactSectionRef}
            nameInputRef={nameInputRef}
            t={{
              title: t.contact.title,
              description: t.contact.description,
              nameLabel: t.contact.nameLabel,
              emailLabel: t.contact.emailLabel,
              messageLabel: t.contact.messageLabel,
              namePlaceholder: t.contact.namePlaceholder,
              emailPlaceholder: t.contact.emailPlaceholder,
              messagePlaceholder: t.contact.messagePlaceholder,
              sendBtn: t.contact.sendBtn,
              successMessage: t.contact.successMessage,
              submissionErrorMessage: t.contact.submissionErrorMessage,
              errors: t.contact.errors,
            }}
          />
        </main>

        {/* BOTTOM FOOTER BAR */}
        <Footer
          t={{ footer: t.footer, header: t.header }}
          lang={lang}
          setLang={setLang}
          setIsDesignSystemOpen={setIsDesignSystemOpen}
        />
      </div>

      {/* Interactive Project Preview / Code Modal (outside inert page wrapper) */}
      <ProjectModal
        project={selectedProject}
        initialMode={modalMode}
        t={t.projects}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Design System Reference Modal (outside inert page wrapper) */}
      <DesignSystemModal
        isOpen={isDesignSystemOpen}
        t={t.designSystem}
        onClose={() => setIsDesignSystemOpen(false)}
      />
    </>
  );
}
