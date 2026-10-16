/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface Skill {
  name: string;
  years: number;
}

export interface SkillItemProps {
  skill: Skill;
  experienceText: string;
}

/**
 * Renders an individual skill entry with its name and calculated years of experience.
 * Follows Single Responsibility Principle (SRP) by managing only single skill item representation.
 */
export const SkillItem: React.FC<SkillItemProps> = ({
  skill,
  experienceText,
}) => {
  return (
    <li>
      <h3 className="heading-l text-white mb-0.5 md:mb-[14px]">
        {skill.name}
      </h3>
      <p className="body-l text-[#D9D9D9]">{experienceText}</p>
    </li>
  );
};
