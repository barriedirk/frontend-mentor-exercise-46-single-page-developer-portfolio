/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TranslatedProject } from "../data/translations";
import { IconExternalLink, IconGitHub } from "./Icons";

export interface ProjectCardProps {
  project: TranslatedProject;
  viewProjectText: string;
  viewCodeText: string;
  liveDemoLabel: string;
  githubLabel: string;
  liveSiteTooltip: string;
  githubTooltip: string;
  onOpenModal: (project: TranslatedProject, mode: "preview" | "code") => void;
}

/**
 * Renders an individual project card with preview, technology tags, and modal triggers.
 * Follows Single Responsibility Principle (SRP) by encapsulating single project representation.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  viewProjectText,
  viewCodeText,
  liveDemoLabel,
  githubLabel,
  liveSiteTooltip,
  githubTooltip,
  onOpenModal,
}) => {
  return (
    <article className="group flex flex-col">
      {/* Thumbnail Image Container */}
      <div className="relative aspect-[540/400] w-full bg-[#242424] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-200 ease-out lg:group-hover:scale-[1.02]"
        />

        {/* Desktop Hover / Focus-Within Overlay */}
        <div className="hidden lg:flex absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 flex-col items-center justify-center gap-12">
          <button
            type="button"
            onClick={() => onOpenModal(project, "preview")}
            aria-label={`${viewProjectText}: ${project.title}`}
            className="btn-underline"
          >
            {viewProjectText}
          </button>
          <button
            type="button"
            onClick={() => onOpenModal(project, "code")}
            aria-label={`${viewCodeText}: ${project.title}`}
            className="btn-underline"
          >
            {viewCodeText}
          </button>
        </div>
      </div>

      {/* Project Title + External Quick-Links */}
      <div className="flex items-center justify-between gap-3 mt-5">
        <h3 className="heading-m text-white uppercase">
          {project.title}
        </h3>

        <div className="flex items-center gap-1 shrink-0">
          {/* Live Demo icon */}
          <div className="relative group/tooltip inline-flex items-center">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`card-live-${project.id}`}
              aria-describedby={`card-tooltip-live-${project.id}`}
              aria-label={`${liveDemoLabel}: ${project.title} (${liveSiteTooltip})`}
              className="w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-[#4EE1A0] hover:bg-white/10 focus-visible:text-[#4EE1A0] focus-visible:ring-2 focus-visible:ring-[#4EE1A0] focus:outline-none transition-all"
            >
              <IconExternalLink className="w-4 h-4" />
            </a>
            <span
              id={`card-tooltip-live-${project.id}`}
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100 transition-all duration-150 px-2.5 py-1 text-xs font-normal text-white bg-[#151515] border border-white/20 rounded shadow-xl whitespace-nowrap z-10"
            >
              {liveSiteTooltip}
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#151515]"
                aria-hidden="true"
              />
            </span>
          </div>

          {/* GitHub icon */}
          <div className="relative group/tooltip inline-flex items-center">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`card-repo-${project.id}`}
              aria-describedby={`card-tooltip-repo-${project.id}`}
              aria-label={`${githubLabel}: ${project.title} (${githubTooltip})`}
              className="w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-[#4EE1A0] hover:bg-white/10 focus-visible:text-[#4EE1A0] focus-visible:ring-2 focus-visible:ring-[#4EE1A0] focus:outline-none transition-all"
            >
              <IconGitHub className="w-4 h-4" />
            </a>
            <span
              id={`card-tooltip-repo-${project.id}`}
              role="tooltip"
              className="pointer-events-none absolute bottom-full right-0 mb-2 opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100 transition-all duration-150 px-2.5 py-1 text-xs font-normal text-white bg-[#151515] border border-white/20 rounded shadow-xl whitespace-nowrap z-10"
            >
              {githubTooltip}
              <span
                className="absolute top-full right-2 border-4 border-transparent border-t-[#151515]"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>

      {/* Project Tech Tags List */}
      <ul
        aria-label={`Technologies used in ${project.title}`}
        className="flex items-center gap-[18px] mt-[7px] text-[18px] leading-[28px] font-medium text-[#D9D9D9] uppercase list-none p-0"
      >
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      {/* Mobile & Tablet Permanent Action Links */}
      <div className="flex lg:hidden items-center gap-[30px] mt-5">
        <button
          type="button"
          onClick={() => onOpenModal(project, "preview")}
          aria-label={`${viewProjectText}: ${project.title}`}
          className="btn-underline"
        >
          {viewProjectText}
        </button>
        <button
          type="button"
          onClick={() => onOpenModal(project, "code")}
          aria-label={`${viewCodeText}: ${project.title}`}
          className="btn-underline"
        >
          {viewCodeText}
        </button>
      </div>
    </article>
  );
};
