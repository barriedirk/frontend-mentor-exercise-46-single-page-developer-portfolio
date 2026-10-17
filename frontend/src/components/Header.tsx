import { Language } from "../data/translations";
import { SocialLinks } from "./SocialLinks";

export interface HeaderTranslations {
  readonly t: {
    header: {
      logo: string;
      socialAria: string;
      opensInNewTab: string;
      langToggleAria: string;
      skipToContent: string;
    };
  };
  readonly lang: Language;
  readonly setLang: React.Dispatch<React.SetStateAction<Language>>;
}

export default function Header({ t, lang, setLang }: HeaderTranslations) {
  return (
    <header className="relative z-30 max-w-[1110px] mx-auto px-4 md:px-8 lg:px-0 pt-5 md:pt-[29px] lg:pt-[39px] flex flex-col md:flex-row items-center justify-between gap-5">
      <a
        href="#top"
        className="text-[24px] md:text-[32px] leading-[32px] font-bold tracking-[-0.33px] md:tracking-[-0.44px] text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#4EE1A0] focus-visible:outline-offset-4 rounded-sm"
      >
        {t.header.logo}
      </a>

      <div className="flex items-center gap-6 md:gap-8 md:pr-[30px]">
        {/* Social Media Links */}
        <SocialLinks
          ariaLabel={t.header.socialAria}
          opensInNewTabLabel={t.header.opensInNewTab}
          className="gap-5 md:gap-6"
        />

        {/* Language Switcher */}
        <div
          role="group"
          aria-label={t.header.langToggleAria}
          className="flex items-center text-[14px] md:text-[15px] font-bold tracking-[1.5px] uppercase pl-2 border-l border-white/20"
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
      </div>
    </header>
  );
}
