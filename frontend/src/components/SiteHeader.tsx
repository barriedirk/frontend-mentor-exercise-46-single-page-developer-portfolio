/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Language } from "../data/translations";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SocialLinks } from "./SocialLinks";

interface SiteHeaderProps {
  logo: string;
  socialAria: string;
  langToggleAria: string;
  opensInNewTab: string;
  lang: Language;
  setLang: (lang: Language) => void;
}

/**
 * Top navigation bar: logo, social links, and language switcher.
 */
export const SiteHeader: React.FC<SiteHeaderProps> = ({
  logo,
  socialAria,
  langToggleAria,
  opensInNewTab,
  lang,
  setLang,
}) => {
  return (
    <header className="relative z-30 max-w-[1110px] mx-auto px-4 md:px-8 lg:px-0 pt-5 md:pt-[29px] lg:pt-[39px] flex flex-col md:flex-row items-center justify-between gap-5">
      <a
        href="#top"
        className="text-[24px] md:text-[32px] leading-[32px] font-bold tracking-[-0.33px] md:tracking-[-0.44px] text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#4EE1A0] focus-visible:outline-offset-4 rounded-sm"
      >
        {logo}
      </a>

      <div className="flex items-center gap-6 md:gap-8 md:pr-[30px]">
        <SocialLinks
          ariaLabel={socialAria}
          opensInNewTabLabel={opensInNewTab}
          className="gap-5 md:gap-6"
        />
        <LanguageSwitcher
          lang={lang}
          setLang={setLang}
          ariaLabel={langToggleAria}
          size="md"
        />
      </div>
    </header>
  );
};
