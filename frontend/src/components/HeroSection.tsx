/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { HERO_PORTRAIT_IMAGE } from "../data/projects";
import { PatternCircle, PatternRings } from "./Icons";
import { ScrollDrivenHeroVideo } from "./ScrollDrivenHeroVideo";

interface HeroTranslations {
  greetingLine1: string;
  greetingLine2: string;
  imPrefix: string;
  name: string;
  dot: string;
  bio: string;
  contactBtn: string;
  portraitAlt: string;
}

interface HeroSectionProps {
  t: HeroTranslations;
  onContactClick: () => void;
}

/**
 * Full-bleed hero section: portrait, decorative patterns, heading, bio, and CTA.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  onContactClick,
}) => {
  return (
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
          alt={t.portraitAlt}
        />

        {/* Decorative Circle overlapping portrait edge */}
        <PatternCircle className="absolute -right-[64px] bottom-0 md:-right-[64px] md:bottom-0 lg:right-auto lg:-left-[64.5px] lg:bottom-[70px] z-20" />
      </div>

      {/* Hero Copy Block */}
      <div className="relative z-20 mt-10 md:mt-0 md:pt-[90px] lg:pt-[127px] text-center md:text-left max-w-[455px] md:max-w-[455px] lg:max-w-[710px] mx-auto md:mx-0">
        <h1 className="heading-xl text-white">
          <span className="block lg:inline">{t.greetingLine1}</span>
          <span className="block lg:inline">{t.greetingLine2}</span>
          <span className="inline">{t.imPrefix}</span>
          <span className="inline-block border-b-4 md:border-b-[6px] border-[#4EE1A0] pb-0.5 md:pb-1.5">
            {t.name}
          </span>
          <span>{t.dot}</span>
        </h1>

        <p className="body-l text-[#D9D9D9] mt-6 md:mt-[60px] lg:mt-[43px] mb-6 md:mb-[34px] lg:mb-[66px] max-w-[445px] mx-auto md:mx-0">
          {t.bio}
        </p>

        <div>
          <button
            type="button"
            onClick={onContactClick}
            className="btn-underline"
          >
            {t.contactBtn}
          </button>
        </div>
      </div>
    </section>
  );
};
