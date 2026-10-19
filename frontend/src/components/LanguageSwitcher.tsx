import React from "react";
import { Language } from "../data/translations";

interface LanguageSwitcherProps {
  lang: Language;
  setLang: (lang: Language) => void;
  ariaLabel: string;
  size?: "md" | "sm";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  lang,
  setLang,
  ariaLabel,
  size = "md",
}) => {
  const textSize = size === "md" ? "text-[14px] md:text-[15px]" : "text-[13px]";

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`flex items-center ${textSize} font-bold tracking-[1.5px] uppercase pl-2 border-l border-white/20`}
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
  );
};
