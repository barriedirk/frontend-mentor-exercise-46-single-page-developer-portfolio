/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { HERO_PORTRAIT_IMAGE } from "./data/projects";
import { Language, TRANSLATIONS, TranslatedProject } from "./data/translations";
import { PatternCircle, PatternRings } from "./components/Icons";
import { ProjectModal } from "./components/ProjectModal";
import { DesignSystemModal } from "./components/DesignSystemModal";
import { ScrollDrivenHeroVideo } from "./components/ScrollDrivenHeroVideo";
import { SkillsList } from "./components/SkillsList";
import { ProjectsList } from "./components/ProjectsList";
import { ContactSection } from "./components/ContactSection";
import Footer from "./components/Footer";
import Header from "./components/Header";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

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
        <Header t={{ header: t.header }} lang={lang} setLang={setLang} />

        {/* PRIMARY MAIN LANDMARK */}
        <main id="content" tabIndex={-1} className="outline-none">
          {/* HERO SECTION */}
          <section
            id="top"
            aria-label="Introduction"
            className="relative max-w-[1110px] mx-auto px-4 md:px-8 lg:px-0 pb-20 md:pb-[60px] lg:pb-[104px] md:min-h-[540px] lg:min-h-[652px]"
          >
            {/* Decorative Rings Top-Left */}
            <PatternRings className="absolute -left-[342px] top-[124px] md:-left-[265px] md:top-[86px] lg:-left-[265px] lg:top-[133px] z-0" />

            {/* Portrait Container with Scroll-Driven Video */}
            <div className="relative mx-auto -mt-[92px] w-[174px] h-[383px] md:mt-0 md:mx-0 md:absolute md:-top-[62px] md:-right-8 md:w-[322px] md:h-[600px] lg:-top-[72px] lg:right-0 lg:w-[445px] lg:h-[720px] bg-gradient-to-b from-[#242424]/40 via-[#242424] to-[#242424] z-10 flex items-end overflow-visible">
              <ScrollDrivenHeroVideo
                fallbackImage={HERO_PORTRAIT_IMAGE}
                alt={t.hero.portraitAlt}
              />

              {/* Decorative Circle overlapping portrait edge */}
              <PatternCircle className="absolute -right-[64px] bottom-0 md:-right-[64px] md:bottom-0 lg:right-auto lg:-left-[64.5px] lg:bottom-[70px] z-20" />
            </div>

            {/* Hero Copy Block */}
            <div className="relative z-20 mt-10 md:mt-0 md:pt-[90px] lg:pt-[127px] text-center md:text-left max-w-[455px] md:max-w-[455px] lg:max-w-[710px] mx-auto md:mx-0">
              <h1 className="heading-xl text-white">
                <span className="block lg:inline">{t.hero.greetingLine1}</span>
                <span className="block lg:inline">{t.hero.greetingLine2}</span>
                <span className="inline">{t.hero.imPrefix}</span>
                <span className="inline-block border-b-4 md:border-b-[6px] border-[#4EE1A0] pb-0.5 md:pb-1.5">
                  {t.hero.name}
                </span>
                <span>{t.hero.dot}</span>
              </h1>

              <p className="body-l text-[#D9D9D9] mt-6 md:mt-[60px] lg:mt-[43px] mb-6 md:mb-[34px] lg:mb-[66px] max-w-[445px] mx-auto md:mx-0">
                {t.hero.bio}
              </p>

              <div>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="btn-underline"
                >
                  {t.hero.contactBtn}
                </button>
              </div>
            </div>
          </section>

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
