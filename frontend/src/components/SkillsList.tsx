/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Skill, SkillItem } from "./SkillItem";

export interface SkillsListProps {
  skills: Skill[];
  yearsExperience: (count: number) => string;
}

/**
 * Renders the responsive grid list of skills.
 * Follows Single Responsibility Principle (SRP) by managing list orchestration and delegating item rendering to SkillItem.
 */
export const SkillsList: React.FC<SkillsListProps> = ({
  skills,
  yearsExperience,
}) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-y-[52px] lg:gap-y-[58px] md:gap-x-6 lg:gap-x-[30px] text-center md:text-left list-none p-0">
      {skills.map((skill) => (
        <SkillItem
          key={skill.name}
          skill={skill}
          experienceText={yearsExperience(skill.years)}
        />
      ))}
    </ul>
  );
};
