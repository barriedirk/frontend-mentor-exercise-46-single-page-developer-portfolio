/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  IconFrontendMentor,
  IconGitHub,
  IconLinkedIn,
} from "./Icons";

export interface SocialLinkItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: "GitHub",
    href: "https://github.com/barriedirk",
    icon: IconGitHub,
  },
  {
    name: "Frontend Mentor",
    href: "https://www.frontendmentor.io/profile/barriedirk",
    icon: IconFrontendMentor,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/barriefreyre/",
    icon: IconLinkedIn,
  },
];

export interface SocialLinksProps {
  ariaLabel: string;
  opensInNewTabLabel: string;
  className?: string;
}

/**
 * Renders the social media links navigation with accessible icons and links.
 * Follows Single Responsibility Principle (SRP) by handling only social navigation presentation.
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({
  ariaLabel,
  opensInNewTabLabel,
  className = "gap-5 md:gap-6",
}) => {
  return (
    <nav
      aria-label={ariaLabel}
      className={`flex items-center ${className}`}
    >
      {SOCIAL_LINKS.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.name} (${opensInNewTabLabel})`}
            className="text-white hover:text-[#4EE1A0] focus-visible:text-[#4EE1A0] focus-visible:outline-2 focus-visible:outline-[#4EE1A0] focus-visible:outline-offset-4 rounded-sm transition-colors duration-150"
          >
            <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        );
      })}
    </nav>
  );
};
