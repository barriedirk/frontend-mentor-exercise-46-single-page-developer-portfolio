import { Language } from "../data/translations";
import { SocialLinks } from "./SocialLinks";

interface FooterTranslations {
  footer: {
    logo: string;
    designSystemBtn: string;
    socialAria: string;
  };
  header: {
    opensInNewTab: string;
    langToggleAria: string;
  };
}

interface FooterProps {
  t: FooterTranslations;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<Language>>;
  setIsDesignSystemOpen: (isOpen: boolean) => void;
}

export default function Footer({
  t,
  lang,
  setLang,
  setIsDesignSystemOpen,
}: FooterProps) {
  return (
    <footer className="relative bg-[#242424] border-t border-white/25 pt-10 md:pt-[30px] lg:pt-[47px] pb-[60px] md:pb-10 lg:pb-[92px]">
      <div className="relative max-w-[1110px] mx-auto px-4 md:px-8 lg:px-0 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-6">
          <a
            href="#top"
            className="text-[24px] md:text-[32px] leading-[32px] font-bold tracking-[-0.33px] md:tracking-[-0.44px] text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#4EE1A0] focus-visible:outline-offset-4 rounded-sm"
          >
            {t.footer.logo}
          </a>
          <button
            type="button"
            onClick={() => setIsDesignSystemOpen(true)}
            className="text-xs font-bold tracking-[1.5px] uppercase text-[#D9D9D9]/50 hover:text-[#4EE1A0] focus-visible:text-[#4EE1A0] focus-visible:outline-2 focus-visible:outline-[#4EE1A0] focus-visible:outline-offset-4 transition-colors cursor-pointer rounded-sm"
          >
            {t.footer.designSystemBtn}
          </button>
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          <SocialLinks
            ariaLabel={t.footer.socialAria}
            opensInNewTabLabel={t.header.opensInNewTab}
            className="gap-6 md:gap-8"
          />

          {/* Footer Language Switcher */}
          <div
            role="group"
            aria-label={t.header.langToggleAria}
            className="flex items-center text-[13px] font-bold tracking-[1.5px] uppercase pl-2 border-l border-white/20"
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
      </div>
    </footer>
  );
}
