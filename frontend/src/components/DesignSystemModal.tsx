import React, { useEffect, useRef } from 'react';
import { IconErrorExclamation, PatternRings } from './Icons';
import { Translations } from '../data/translations';

interface DesignSystemModalProps {
  isOpen: boolean;
  t: Translations['designSystem'];
  onClose: () => void;
}

const COLOR_SWATCHES = [
  { hex: '#151515', rgb: '21, 21, 21', hsl: '0°, 0%, 8%', darkText: false, bordered: true },
  { hex: '#4EE1A0', rgb: '78, 225, 160', hsl: '153°, 71%, 59%', darkText: true, bordered: false },
  { hex: '#242424', rgb: '36, 36, 36', hsl: '0°, 0%, 14%', darkText: false, bordered: false },
  { hex: '#D9D9D9', rgb: '217, 217, 217', hsl: '0°, 0%, 85%', darkText: true, bordered: false },
  { hex: '#FFFFFF', rgb: '255, 255, 255', hsl: '0°, 0%, 100%', darkText: true, bordered: false },
];

export function DesignSystemModal({ isOpen, t, onClose }: DesignSystemModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const backBtnRef = useRef<HTMLButtonElement | null>(null);

  // Focus preservation and restoration
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => {
        backBtnRef.current?.focus();
      });
    }

    return () => {
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Escape listener and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;

        const focusable = modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-[#151515] overflow-y-auto text-white focus:outline-none"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="design-system-title"
    >
      <div className="relative max-w-[1110px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <PatternRings className="absolute -right-40 top-8 opacity-80" />

        {/* Header */}
        <div className="flex items-start justify-between mb-16 md:mb-24 relative z-10">
          <div>
            <h1
              id="design-system-title"
              className="text-[28px] leading-[32px] font-bold tracking-[-0.4px] text-white"
            >
              {t.title}{' '}
              <span className="text-[#D9D9D9]/50 block md:inline font-normal">
                {t.subtitle}
              </span>
            </h1>
          </div>

          <button
            ref={backBtnRef}
            type="button"
            onClick={onClose}
            className="btn-underline"
          >
            {t.backBtn}
          </button>
        </div>

        {/* Color Section */}
        <section aria-labelledby="design-system-color" className="mb-20 md:mb-28">
          <h2 id="design-system-color" className="text-[36px] md:text-[40px] font-medium text-white mb-10">
            {t.colorTitle}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 list-none p-0">
            {COLOR_SWATCHES.map((swatch) => (
              <li key={swatch.hex}>
                <div
                  style={{ backgroundColor: swatch.hex }}
                  className={`h-[110px] p-5 flex items-start ${
                    swatch.bordered ? 'border border-white/30' : ''
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`font-bold text-base ${
                      swatch.darkText ? 'text-[#151515]' : 'text-white'
                    }`}
                  >
                    {swatch.hex}
                  </span>
                </div>
                <div className="mt-4 space-y-1 text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-[#D9D9D9]/50 w-8">RGB</span>
                    <span className="text-white font-medium tabular-nums">{swatch.rgb}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#D9D9D9]/50 w-8">HSL</span>
                    <span className="text-white font-medium tabular-nums">{swatch.hsl}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Typography Section */}
        <section aria-labelledby="design-system-typography" className="mb-20 md:mb-28">
          <h2 id="design-system-typography" className="text-[36px] md:text-[40px] font-medium text-white mb-10">
            {t.typographyTitle}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-10">
              <div>
                <div className="flex flex-wrap gap-4 text-sm text-[#D9D9D9]/50 mb-3" aria-hidden="true">
                  <span>Space Grotesk Bold</span>
                  <span>88px</span>
                  <span>88px Line</span>
                  <span>-2.5px Char. Spacing</span>
                </div>
                <p className="heading-xl text-white">Heading (XL)</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-4 text-sm text-[#D9D9D9]/50 mb-3" aria-hidden="true">
                  <span>Space Grotesk Bold</span>
                  <span>48px</span>
                  <span>56px Line</span>
                  <span>-1.5px Char. Spacing</span>
                </div>
                <p className="heading-l text-white">Heading (L)</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-4 text-sm text-[#D9D9D9]/50 mb-3" aria-hidden="true">
                  <span>Space Grotesk Bold</span>
                  <span>24px</span>
                  <span>32px Line</span>
                </div>
                <p className="heading-m text-white">Heading (M)</p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-wrap gap-4 text-sm text-[#D9D9D9]/50 mb-3" aria-hidden="true">
                <span>Space Grotesk Medium</span>
                <span>18px</span>
                <span>28px Line</span>
              </div>
              <div className="space-y-6 body-l text-[#D9D9D9]">
                <p>{t.bodySample1}</p>
                <p>{t.bodySample2}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Elements Section */}
        <section aria-labelledby="design-system-interactive">
          <h2 id="design-system-interactive" className="text-[36px] md:text-[40px] font-medium text-white mb-10">
            {t.interactiveTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons Showcase */}
            <div className="bg-[#242424] p-12 flex flex-col items-center justify-center gap-14">
              <div className="text-center">
                <span className="inline-block font-bold text-[16px] leading-[26px] tracking-[2.29px] uppercase text-white pb-[10px] border-b-2 border-[#4EE1A0]">
                  CONTACT ME
                </span>
                <div className="text-sm text-[#D9D9D9]/50 mt-4">{t.buttonIdle}</div>
              </div>

              <div className="text-center">
                <span className="inline-block font-bold text-[16px] leading-[26px] tracking-[2.29px] uppercase text-[#4EE1A0] pb-[10px] border-b-2 border-[#4EE1A0]">
                  CONTACT ME
                </span>
                <div className="text-sm text-[#D9D9D9]/50 mt-4">{t.buttonHover}</div>
              </div>
            </div>

            {/* Text Fields Showcase */}
            <div className="bg-[#242424] p-10 md:p-12 flex flex-col justify-center space-y-10">
              <div>
                <div className="pb-4 pl-6 border-b border-white/60 text-white/50 text-[16px] leading-[26px] tracking-[-0.22px] font-medium uppercase">
                  NAME
                </div>
              </div>

              <div>
                <div className="pb-4 pl-6 border-b border-[#4EE1A0] text-white text-[16px] leading-[26px] tracking-[-0.22px] font-medium uppercase">
                  FREDRICK JOULES |
                </div>
                <div className="text-sm text-[#D9D9D9]/50 text-center mt-3">{t.textFieldActive}</div>
              </div>

              <div>
                <div className="relative pb-4 pl-6 pr-8 border-b border-[#FF6F5B] text-white text-[16px] leading-[26px] tracking-[-0.22px] font-medium uppercase flex items-center justify-between">
                  <span>FREDRICK JOULES |</span>
                  <IconErrorExclamation className="w-6 h-6 shrink-0" />
                </div>
                <div className="text-[12px] leading-[16px] tracking-[-0.17px] text-[#FF6F5B] text-right mt-[5px]">
                  {t.sampleErrorText}
                </div>
                <div className="text-sm text-[#D9D9D9]/50 text-center mt-2">{t.textFieldError}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
