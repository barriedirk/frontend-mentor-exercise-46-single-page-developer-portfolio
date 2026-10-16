import React, { useEffect, useRef, useState } from "react";
import { TranslatedProject, Translations } from "../data/translations";
import { IconExternalLink, IconGitHub } from "./Icons";

interface ProjectModalProps {
  project: TranslatedProject | null;
  initialMode: "preview" | "code";
  t: Translations["projects"];
  onClose: () => void;
}

export function ProjectModal({
  project,
  initialMode,
  t,
  onClose,
}: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">(initialMode);
  const [copied, setCopied] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const previewTabRef = useRef<HTMLButtonElement | null>(null);
  const codeTabRef = useRef<HTMLButtonElement | null>(null);

  // Sync mode and copy state
  useEffect(() => {
    setActiveTab(initialMode);
    setCopied(false);
  }, [project, initialMode]);

  // Capture triggering element & restore focus on unmount
  useEffect(() => {
    if (project) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      // Initial focus onto the active tab button or close button
      requestAnimationFrame(() => {
        if (initialMode === "code") {
          codeTabRef.current?.focus();
        } else {
          previewTabRef.current?.focus();
        }
      });
    }

    return () => {
      triggerElementRef.current?.focus();
    };
  }, [project, initialMode]);

  // Lock body scroll while modal is mounted
  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [project]);

  // Escape key and Tab focus trap
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const modal = modalRef.current;
        if (!modal) return;

        const focusable = modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      if (activeTab === "preview") {
        setActiveTab("code");
        codeTabRef.current?.focus();
      } else {
        setActiveTab("preview");
        previewTabRef.current?.focus();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-[#242424] border border-white/15 text-white overflow-hidden max-h-[90vh] flex flex-col shadow-2xl focus:outline-none"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/15 bg-[#151515]">
          <div>
            <h2
              id="modal-project-title"
              className="heading-m uppercase text-white"
            >
              {project.title}
            </h2>
            <ul
              aria-label="Technologies used"
              className="flex items-center gap-4 mt-1 text-sm text-[#D9D9D9] font-medium list-none p-0"
            >
              {project.tags.map((tag, idx) => (
                <li key={tag} className="flex items-center gap-4">
                  <span>{tag}</span>
                  {idx < project.tags.length - 1 && (
                    <span aria-hidden="true">·</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* External Links with Accessible Tooltips */}
            <div className="flex items-center gap-2 border-r border-white/15 pr-4">
              {/* Live Site Link */}
              <div className="relative group/tooltip inline-flex items-center">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`header-live-${project.id}`}
                  aria-describedby={`header-tooltip-live-${project.id}`}
                  aria-label={`${t.liveDemoLabel}: ${project.title} (${t.liveSiteTooltip})`}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white/80 hover:text-[#4EE1A0] hover:bg-white/10 focus-visible:text-[#4EE1A0] focus-visible:ring-2 focus-visible:ring-[#4EE1A0] focus:outline-none transition-all cursor-pointer"
                >
                  <IconExternalLink className="w-5 h-5" />
                </a>
                <span
                  id={`header-tooltip-live-${project.id}`}
                  role="tooltip"
                  className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100 transition-all duration-150 px-2.5 py-1 text-xs font-normal text-white bg-[#151515] border border-white/20 rounded shadow-xl whitespace-nowrap z-50"
                >
                  {t.liveSiteTooltip}
                  <span
                    className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#151515]"
                    aria-hidden="true"
                  />
                </span>
              </div>

              {/* GitHub Repo Link */}
              <div className="relative group/tooltip inline-flex items-center">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`header-repo-${project.id}`}
                  aria-describedby={`header-tooltip-repo-${project.id}`}
                  aria-label={`${t.githubLabel}: ${project.title} (${t.githubTooltip})`}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white/80 hover:text-[#4EE1A0] hover:bg-white/10 focus-visible:text-[#4EE1A0] focus-visible:ring-2 focus-visible:ring-[#4EE1A0] focus:outline-none transition-all cursor-pointer"
                >
                  <IconGitHub className="w-5 h-5" />
                </a>
                <span
                  id={`header-tooltip-repo-${project.id}`}
                  role="tooltip"
                  className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100 transition-all duration-150 px-2.5 py-1 text-xs font-normal text-white bg-[#151515] border border-white/20 rounded shadow-xl whitespace-nowrap z-50"
                >
                  {t.githubTooltip}
                  <span
                    className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#151515]"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>

            {/* Accessible Tab List */}
            <div
              role="tablist"
              aria-label={t.tablistAria}
              className="flex items-center gap-4"
            >
              <button
                ref={previewTabRef}
                id="tab-preview"
                role="tab"
                type="button"
                aria-selected={activeTab === "preview"}
                aria-controls="panel-preview"
                tabIndex={activeTab === "preview" ? 0 : -1}
                onClick={() => setActiveTab("preview")}
                onKeyDown={handleTabKeyDown}
                className={`text-sm font-bold tracking-[2px] uppercase pb-1 border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4EE1A0] ${
                  activeTab === "preview"
                    ? "text-[#4EE1A0] border-[#4EE1A0]"
                    : "text-[#D9D9D9] border-transparent hover:text-white"
                }`}
              >
              {t.tabDetails}
              </button>
              <button
                ref={codeTabRef}
                id="tab-code"
                role="tab"
                type="button"
                aria-selected={activeTab === "code"}
                aria-controls="panel-code"
                tabIndex={activeTab === "code" ? 0 : -1}
                onClick={() => setActiveTab("code")}
                onKeyDown={handleTabKeyDown}
                className={`text-sm font-bold tracking-[2px] uppercase pb-1 border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4EE1A0] ${
                  activeTab === "code"
                    ? "text-[#4EE1A0] border-[#4EE1A0]"
                    : "text-[#D9D9D9] border-transparent hover:text-white"
                }`}
              >
              {t.tabImplementation}
              </button>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={t.closeModal}
              className="w-10 h-10 flex items-center justify-center text-white hover:text-[#4EE1A0] focus-visible:text-[#4EE1A0] transition-colors text-2xl font-bold cursor-pointer rounded-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {activeTab === "preview" ? (
            <div
              id="panel-preview"
              role="tabpanel"
              aria-labelledby="tab-preview"
              tabIndex={0}
              className="focus:outline-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 bg-[#151515] overflow-hidden border border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold tracking-[2px] uppercase text-[#4EE1A0] mb-2">
                      {t.projectOverview}
                    </h3>
                    <p className="body-l text-[#D9D9D9]">{project.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold tracking-[2px] uppercase text-[#4EE1A0] mb-3">
                      {t.architectureHighlights}
                    </h3>
                    <ul className="space-y-2.5 text-[#D9D9D9] text-base leading-relaxed list-none p-0">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="text-[#4EE1A0] font-bold"
                            aria-hidden="true"
                          >
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-6 md:gap-8">
                    {/* Live Site Action Link */}
                    <div className="relative group/tooltip inline-flex items-center">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`action-live-${project.id}`}
                        aria-describedby={`tooltip-action-live-${project.id}`}
                        aria-label={`${t.liveDemoLabel}: ${project.title} (${t.liveSiteTooltip})`}
                        className="btn-underline inline-flex items-center gap-2 text-white hover:text-[#4EE1A0] focus-visible:text-[#4EE1A0] transition-colors"
                      >
                        <IconExternalLink className="w-4 h-4 text-[#4EE1A0]" />
                        <span>{t.liveDemoLabel}</span>
                      </a>
                      <span
                        id={`tooltip-action-live-${project.id}`}
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100 transition-all duration-150 px-2.5 py-1 text-xs font-normal text-white bg-[#151515] border border-white/20 rounded shadow-xl whitespace-nowrap z-50"
                      >
                        {t.liveSiteTooltip}
                        <span
                          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#151515]"
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    {/* GitHub Repo Action Link */}
                    <div className="relative group/tooltip inline-flex items-center">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`action-repo-${project.id}`}
                        aria-describedby={`tooltip-action-repo-${project.id}`}
                        aria-label={`${t.githubLabel}: ${project.title} (${t.githubTooltip})`}
                        className="btn-underline inline-flex items-center gap-2 text-white hover:text-[#4EE1A0] focus-visible:text-[#4EE1A0] transition-colors"
                      >
                        <IconGitHub className="w-4 h-4 text-[#4EE1A0]" />
                        <span>{t.githubLabel}</span>
                      </a>
                      <span
                        id={`tooltip-action-repo-${project.id}`}
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100 transition-all duration-150 px-2.5 py-1 text-xs font-normal text-white bg-[#151515] border border-white/20 rounded shadow-xl whitespace-nowrap z-50"
                      >
                        {t.githubTooltip}
                        <span
                          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#151515]"
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("code");
                        codeTabRef.current?.focus();
                      }}
                      className="btn-underline"
                    >
                      {t.inspectSource}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-underline"
                    >
                      {t.backToPortfolio}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              id="panel-code"
              role="tabpanel"
              aria-labelledby="tab-code"
              tabIndex={0}
              className="space-y-6 focus:outline-none"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold tracking-[2px] uppercase text-[#4EE1A0]">
                    {t.coreSnippet}
                  </h3>
                  <p className="text-sm text-[#D9D9D9] mt-1">
                    {t.snippetSubtitle(project.title)}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  {/* GitHub Repo Link in Code Tab */}
                  <div className="relative group/tooltip inline-flex items-center">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`code-tab-repo-${project.id}`}
                      aria-describedby={`tooltip-code-repo-${project.id}`}
                      aria-label={`${t.githubLabel}: ${project.title} (${t.githubTooltip})`}
                      className="btn-underline text-sm inline-flex items-center gap-2 text-white hover:text-[#4EE1A0] focus-visible:text-[#4EE1A0] transition-colors"
                    >
                      <IconGitHub className="w-4 h-4 text-[#4EE1A0]" />
                      <span>{t.githubLabel}</span>
                    </a>
                    <span
                      id={`tooltip-code-repo-${project.id}`}
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100 transition-all duration-150 px-2.5 py-1 text-xs font-normal text-white bg-[#151515] border border-white/20 rounded shadow-xl whitespace-nowrap z-50"
                    >
                      {t.githubTooltip}
                      <span
                        className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#151515]"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="btn-underline text-sm"
                  >
                    {copied ? t.copiedSnippet : t.copySnippet}
                  </button>
                  <span className="sr-only" role="status" aria-live="polite">
                    {copied ? t.copiedSnippet : ""}
                  </span>
                </div>
              </div>

              <pre className="bg-[#151515] p-6 border border-white/15 overflow-x-auto text-sm md:text-base font-mono text-[#D9D9D9] leading-relaxed">
                <code>{project.codeSnippet}</code>
              </pre>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {project.highlights.map((highlight, index) => (
                  <div
                    key={highlight}
                    className="bg-[#151515] p-5 border border-white/10"
                  >
                    <div className="text-xs font-bold tracking-[2px] text-[#4EE1A0] uppercase mb-2">
                      {t.specificationIndex(index + 1)}
                    </div>
                    <p className="text-sm text-[#D9D9D9] leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
