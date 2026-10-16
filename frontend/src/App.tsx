/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { HERO_PORTRAIT_IMAGE } from "./data/projects";
import { Language, TRANSLATIONS, TranslatedProject } from "./data/translations";
import {
  IconErrorExclamation,
  PatternCircle,
  PatternRings,
} from "./components/Icons";
import { ProjectModal } from "./components/ProjectModal";
import { DesignSystemModal } from "./components/DesignSystemModal";
import { ScrollDrivenHeroVideo } from "./components/ScrollDrivenHeroVideo";
import { SocialLinks } from "./components/SocialLinks";
import { SkillsList } from "./components/SkillsList";
import { ProjectsList } from "./components/ProjectsList";

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

  // Contact form state
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Re-sync selected project when language changes
  useEffect(() => {
    if (selectedProject) {
      const updated = t.projects.list.find((p) => p.id === selectedProject.id);
      if (updated) setSelectedProject(updated);
    }
  }, [lang, t.projects.list, selectedProject]);

  const validateField = (
    field: keyof FormValues,
    value: string,
  ): string | undefined => {
    const trimmed = value.trim();
    if (field === "name") {
      if (!trimmed) return t.contact.errors.required;
      return undefined;
    }
    if (field === "email") {
      if (!trimmed) return t.contact.errors.required;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return t.contact.errors.invalidEmail;
      return undefined;
    }
    if (field === "message") {
      if (!trimmed) return t.contact.errors.required;
      return undefined;
    }
    return undefined;
  };

  const validateAll = (values: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    const nameErr = validateField("name", values.name);
    const emailErr = validateField("email", values.email);
    const msgErr = validateField("message", values.message);
    if (nameErr) nextErrors.name = nameErr;
    if (emailErr) nextErrors.email = emailErr;
    if (msgErr) nextErrors.message = msgErr;
    return nextErrors;
  };

  const handleInputChange = (field: keyof FormValues, value: string) => {
    const nextValues = { ...formValues, [field]: value };
    setFormValues(nextValues);
    if (submittedMessage) setSubmittedMessage(null);

    if (touched[field]) {
      const fieldError = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: fieldError,
      }));
    }
  };

  const handleInputBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldError = validateField(field, formValues[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: fieldError,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const validationErrors = validateAll(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedMessage(t.contact.successMessage(formValues.name.trim()));
      setFormValues({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setErrors({});
    }
  };

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

  const getBorderClass = (field: keyof FormValues) => {
    if (touched[field] && errors[field]) {
      return "border-[#FF6F5B] focus:border-[#FF6F5B]";
    }
    if (formValues[field].trim().length > 0 && !errors[field]) {
      return "border-[#4EE1A0] focus:border-[#4EE1A0]";
    }
    return "border-white/60 focus:border-[#4EE1A0]";
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
        {/* HEADER */}
        <header className="relative z-30 max-w-[1110px] mx-auto px-4 md:px-8 lg:px-0 pt-5 md:pt-[29px] lg:pt-[39px] flex flex-col md:flex-row items-center justify-between gap-5">
          <a
            href="#top"
            className="text-[24px] md:text-[32px] leading-[32px] font-bold tracking-[-0.33px] md:tracking-[-0.44px] text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#4EE1A0] focus-visible:outline-offset-4 rounded-sm"
          >
            {t.header.logo}
          </a>

          <div className="flex items-center gap-6 md:gap-8 md:pr-[30px]">
            {/* Social Media Links */}
            <SocialLinks
              ariaLabel={t.header.socialAria}
              opensInNewTabLabel={t.header.opensInNewTab}
              className="gap-5 md:gap-6"
            />

            {/* Language Switcher */}
            <div
              role="group"
              aria-label={t.header.langToggleAria}
              className="flex items-center text-[14px] md:text-[15px] font-bold tracking-[1.5px] uppercase pl-2 border-l border-white/20"
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`transition-colors cursor-pointer pb-0.5 focus-visible:outline-2 focus-visible:outline-[#4EE1A0] rounded-sm ${
                  lang === "en"
                    ? "text-[#4EE1A0] border-b-2 border-[#4EE1A0]"
                    : "text-[#D9D9D9]/60 hover:text-white"
                }`}
              >
                EN
              </button>
              <span className="mx-2 text-white/30" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                onClick={() => setLang("es")}
                aria-pressed={lang === "es"}
                className={`transition-colors cursor-pointer pb-0.5 focus-visible:outline-2 focus-visible:outline-[#4EE1A0] rounded-sm ${
                  lang === "es"
                    ? "text-[#4EE1A0] border-b-2 border-[#4EE1A0]"
                    : "text-[#D9D9D9]/60 hover:text-white"
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </header>

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
          <section
            ref={contactSectionRef}
            id="contact"
            aria-labelledby="contact-heading"
            className="relative bg-[#242424] pt-[60px] lg:pt-[84px] pb-[87px] md:pb-[92px] overflow-hidden"
          >
            <div className="relative max-w-[1110px] mx-auto px-4 md:px-8 lg:px-0">
              {/* Decorative Rings Bottom-Left of Contact */}
              <PatternRings className="absolute -left-[343px] bottom-[97px] md:-left-[368px] md:bottom-[27px] lg:-left-[370px] lg:bottom-[47px] z-0" />

              {/* Contact Split Container */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">
                {/* Contact Intro Copy */}
                <div className="w-full max-w-[445px] text-center lg:text-left">
                  <h2 id="contact-heading" className="heading-xl text-white">
                    {t.contact.title}
                  </h2>
                  <p className="body-l text-[#D9D9D9] mt-5 lg:mt-9">
                    {t.contact.description}
                  </p>
                </div>

                {/* Contact Form */}
                <form
                  noValidate
                  onSubmit={handleFormSubmit}
                  className="w-full max-w-[445px] space-y-8"
                >
                  {/* NAME FIELD */}
                  <div>
                    <label htmlFor="contact-name" className="sr-only">
                      {t.contact.nameLabel}
                    </label>
                    <div className="relative">
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        aria-required="true"
                        placeholder={t.contact.namePlaceholder}
                        aria-invalid={Boolean(touched.name && errors.name)}
                        aria-describedby={
                          touched.name && errors.name ? "name-error" : undefined
                        }
                        value={formValues.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        onBlur={() => handleInputBlur("name")}
                        className={`w-full bg-transparent pb-4 pl-6 pr-10 border-b ${getBorderClass(
                          "name",
                        )} text-white placeholder:text-white/50 text-[16px] leading-[26px] tracking-[-0.22px] font-medium uppercase focus:outline-none transition-colors`}
                      />
                      {touched.name && errors.name && (
                        <IconErrorExclamation className="w-6 h-6 absolute right-0 top-0" />
                      )}
                    </div>
                    {touched.name && errors.name && (
                      <p
                        id="name-error"
                        role="alert"
                        className="text-[12px] leading-[16px] tracking-[-0.17px] text-[#FF6F5B] text-right mt-[5px]"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL FIELD */}
                  <div>
                    <label htmlFor="contact-email" className="sr-only">
                      {t.contact.emailLabel}
                    </label>
                    <div className="relative">
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        spellCheck="false"
                        required
                        aria-required="true"
                        placeholder={t.contact.emailPlaceholder}
                        aria-invalid={Boolean(touched.email && errors.email)}
                        aria-describedby={
                          touched.email && errors.email
                            ? "email-error"
                            : undefined
                        }
                        value={formValues.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        onBlur={() => handleInputBlur("email")}
                        className={`w-full bg-transparent pb-4 pl-6 pr-10 border-b ${getBorderClass(
                          "email",
                        )} text-white placeholder:text-white/50 text-[16px] leading-[26px] tracking-[-0.22px] font-medium uppercase focus:outline-none transition-colors`}
                      />
                      {touched.email && errors.email && (
                        <IconErrorExclamation className="w-6 h-6 absolute right-0 top-0" />
                      )}
                    </div>
                    {touched.email && errors.email && (
                      <p
                        id="email-error"
                        role="alert"
                        className="text-[12px] leading-[16px] tracking-[-0.17px] text-[#FF6F5B] text-right mt-[5px]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* MESSAGE FIELD */}
                  <div>
                    <label htmlFor="contact-message" className="sr-only">
                      {t.contact.messageLabel}
                    </label>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        aria-required="true"
                        placeholder={t.contact.messagePlaceholder}
                        aria-invalid={Boolean(
                          touched.message && errors.message,
                        )}
                        aria-describedby={
                          touched.message && errors.message
                            ? "message-error"
                            : undefined
                        }
                        value={formValues.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        onBlur={() => handleInputBlur("message")}
                        className={`w-full bg-transparent pb-4 pl-6 pr-10 border-b ${getBorderClass(
                          "message",
                        )} text-white placeholder:text-white/50 text-[16px] leading-[26px] tracking-[-0.22px] font-medium uppercase resize-none focus:outline-none transition-colors`}
                      />
                      {touched.message && errors.message && (
                        <IconErrorExclamation className="w-6 h-6 absolute right-0 top-0" />
                      )}
                    </div>
                    {touched.message && errors.message && (
                      <p
                        id="message-error"
                        role="alert"
                        className="text-[12px] leading-[16px] tracking-[-0.17px] text-[#FF6F5B] text-right mt-[5px]"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Confirmation message upon valid submission */}
                  {submittedMessage && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="p-4 bg-[#151515] border border-[#4EE1A0] text-[#4EE1A0] text-sm font-medium"
                    >
                      {submittedMessage}
                    </div>
                  )}

                  {/* SEND MESSAGE BUTTON */}
                  <div className="flex justify-end pt-1">
                    <button type="submit" className="btn-underline">
                      {t.contact.sendBtn}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* BOTTOM FOOTER BAR */}
        <footer className="relative bg-[#242424] border-t border-white/25 pt-10 md:pt-[30px] lg:pt-[47px] pb-[60px] md:pb-10 lg:pb-[92px]">
          <div className="relative max-w-[1110px] mx-auto px-4 md:px-8 lg:px-0 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-6">
              <a
                href="#top"
                className="text-[24px] md:text-[32px] leading-[32px] font-bold tracking-[-0.33px] md:tracking-[-0.44px] text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#4EE1A0] focus-visible:outline-offset-4 rounded-sm"
              >
                {t.footer.logo}
              </a>
              <button
                type="button"
                onClick={() => setIsDesignSystemOpen(true)}
                className="text-xs font-bold tracking-[1.5px] uppercase text-[#D9D9D9]/50 hover:text-[#4EE1A0] focus-visible:text-[#4EE1A0] focus-visible:outline-2 focus-visible:outline-[#4EE1A0] focus-visible:outline-offset-4 transition-colors cursor-pointer rounded-sm"
              >
                {t.footer.designSystemBtn}
              </button>
            </div>

            <div className="flex items-center gap-6 md:gap-8">
              <SocialLinks
                ariaLabel={t.footer.socialAria}
                opensInNewTabLabel={t.header.opensInNewTab}
                className="gap-6 md:gap-8"
              />

              {/* Footer Language Switcher */}
              <div
                role="group"
                aria-label={t.header.langToggleAria}
                className="flex items-center text-[13px] font-bold tracking-[1.5px] uppercase pl-2 border-l border-white/20"
              >
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  aria-pressed={lang === "en"}
                  className={`transition-colors cursor-pointer pb-0.5 focus-visible:outline-2 focus-visible:outline-[#4EE1A0] rounded-sm ${
                    lang === "en"
                      ? "text-[#4EE1A0] border-b-2 border-[#4EE1A0]"
                      : "text-[#D9D9D9]/60 hover:text-white"
                  }`}
                >
                  EN
                </button>
                <span className="mx-2 text-white/30" aria-hidden="true">
                  /
                </span>
                <button
                  type="button"
                  onClick={() => setLang("es")}
                  aria-pressed={lang === "es"}
                  className={`transition-colors cursor-pointer pb-0.5 focus-visible:outline-2 focus-visible:outline-[#4EE1A0] rounded-sm ${
                    lang === "es"
                      ? "text-[#4EE1A0] border-b-2 border-[#4EE1A0]"
                      : "text-[#D9D9D9]/60 hover:text-white"
                  }`}
                >
                  ES
                </button>
              </div>
            </div>
          </div>
        </footer>
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
