import { Language } from "../data/translations";
import { LanguageSwitcher } from "./LanguageSwitcher";
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
  lang: Language;
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

          <LanguageSwitcher
            lang={lang}
            setLang={setLang}
            ariaLabel={t.header.langToggleAria}
            size="sm"
          />
        </div>
      </div>
    </footer>
  );
}
