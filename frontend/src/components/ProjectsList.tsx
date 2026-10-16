/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TranslatedProject } from "../data/translations";
import { ProjectCard } from "./ProjectCard";

export interface ProjectsListProps {
  projects: TranslatedProject[];
  viewProjectText: string;
  viewCodeText: string;
  liveDemoLabel: string;
  githubLabel: string;
  liveSiteTooltip: string;
  githubTooltip: string;
  onOpenModal: (project: TranslatedProject, mode: "preview" | "code") => void;
}

/**
 * Renders the responsive 2-column grid of projects.
 * Follows Single Responsibility Principle (SRP) by coordinating the project list and delegating card rendering to ProjectCard.
 */
export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  viewProjectText,
  viewCodeText,
  liveDemoLabel,
  githubLabel,
  liveSiteTooltip,
  githubTooltip,
  onOpenModal,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-[60px] lg:gap-y-[69px] md:gap-x-6 lg:gap-x-[30px]">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          viewProjectText={viewProjectText}
          viewCodeText={viewCodeText}
          liveDemoLabel={liveDemoLabel}
          githubLabel={githubLabel}
          liveSiteTooltip={liveSiteTooltip}
          githubTooltip={githubTooltip}
          onOpenModal={onOpenModal}
        />
      ))}
    </div>
  );
};
