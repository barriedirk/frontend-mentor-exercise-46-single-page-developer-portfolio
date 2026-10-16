/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TranslatedProject } from "../data/translations";

export interface ProjectCardProps {
  project: TranslatedProject;
  viewProjectText: string;
  viewCodeText: string;
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

      {/* Project Title */}
      <h3 className="heading-m text-white uppercase mt-5">
        {project.title}
      </h3>

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
