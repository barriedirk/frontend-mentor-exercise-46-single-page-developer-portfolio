/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { IconErrorExclamation, PatternRings } from "./Icons";
import { useContactForm } from "../hooks/useContactForm";

interface ContactTranslations {
  title: string;
  description: string;
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  sendBtn: string;
  successMessage: (name: string) => string;
  submissionErrorMessage: string;
  errors: {
    required: string;
    invalidEmail: string;
  };
}

interface ContactSectionProps {
  t: ContactTranslations;
  sectionRef: React.RefObject<HTMLElement | null>;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

/**
 * Full contact section: intro copy on the left, validated form on the right.
 * All form logic lives in the useContactForm hook; this component is pure presentation.
 */
export const ContactSection: React.FC<ContactSectionProps> = ({
  t,
  sectionRef,
  nameInputRef,
}) => {
  const {
    formValues,
    touched,
    errors,
    submittedMessage,
    handleInputChange: onInputChange,
    handleInputBlur: onInputBlur,
    handleFormSubmit,
    getBorderClass,
  } = useContactForm(t.errors);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-[#242424] pt-[60px] lg:pt-[84px] pb-[87px] md:pb-[92px] overflow-hidden"
    >
      <div className="relative max-w-[1110px] mx-auto px-4 md:px-8 lg:px-0">
        {/* Decorative Rings Bottom-Left */}
        <PatternRings className="absolute -left-[343px] bottom-[97px] md:-left-[368px] md:bottom-[27px] lg:-left-[370px] lg:bottom-[47px] z-0" />

        {/* Contact Split Container */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">
          {/* Intro Copy */}
          <div className="w-full max-w-[445px] text-center lg:text-left">
            <h2 id="contact-heading" className="heading-xl text-white">
              {t.title}
            </h2>
            <p className="body-l text-[#D9D9D9] mt-5 lg:mt-9">
              {t.description}
            </p>
          </div>

          {/* Contact Form */}
          <form
            noValidate
            onSubmit={(e) =>
              handleFormSubmit(
                e,
                t.successMessage(formValues.name),
                t.submissionErrorMessage,
              )
            }
            className="w-full max-w-[445px] space-y-8"
          >
            {/* NAME FIELD */}
            <div>
              <label htmlFor="contact-name" className="sr-only">
                {t.nameLabel}
              </label>
              <div className="relative">
                <input
                  ref={nameInputRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  placeholder={t.namePlaceholder}
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={
                    touched.name && errors.name ? "name-error" : undefined
                  }
                  value={formValues.name}
                  onChange={(e) => onInputChange("name", e.target.value)}
                  onBlur={() => onInputBlur("name")}
                  className={`w-full bg-transparent pb-4 pl-6 pr-10 border-b ${getBorderClass(
                    "name",
                  )} text-white placeholder:text-white/50 text-[16px] leading-[26px] tracking-[-0.22px] font-medium uppercase focus:outline-none transition-colors`}
                />
                {touched.name && errors.name && (
                  <IconErrorExclamation className="w-6 h-6 absolute right-0 top-0" />
                )}
              </div>
              {touched.name && errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="text-[12px] leading-[16px] tracking-[-0.17px] text-[#FF6F5B] text-right mt-[5px]"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL FIELD */}
            <div>
              <label htmlFor="contact-email" className="sr-only">
                {t.emailLabel}
              </label>
              <div className="relative">
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck="false"
                  required
                  aria-required="true"
                  placeholder={t.emailPlaceholder}
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={
                    touched.email && errors.email ? "email-error" : undefined
                  }
                  value={formValues.email}
                  onChange={(e) => onInputChange("email", e.target.value)}
                  onBlur={() => onInputBlur("email")}
                  className={`w-full bg-transparent pb-4 pl-6 pr-10 border-b ${getBorderClass(
                    "email",
                  )} text-white placeholder:text-white/50 text-[16px] leading-[26px] tracking-[-0.22px] font-medium uppercase focus:outline-none transition-colors`}
                />
                {touched.email && errors.email && (
                  <IconErrorExclamation className="w-6 h-6 absolute right-0 top-0" />
                )}
              </div>
              {touched.email && errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-[12px] leading-[16px] tracking-[-0.17px] text-[#FF6F5B] text-right mt-[5px]"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* MESSAGE FIELD */}
            <div>
              <label htmlFor="contact-message" className="sr-only">
                {t.messageLabel}
              </label>
              <div className="relative">
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  aria-required="true"
                  placeholder={t.messagePlaceholder}
                  aria-invalid={Boolean(touched.message && errors.message)}
                  aria-describedby={
                    touched.message && errors.message
                      ? "message-error"
                      : undefined
                  }
                  value={formValues.message}
                  onChange={(e) => onInputChange("message", e.target.value)}
                  onBlur={() => onInputBlur("message")}
                  className={`w-full bg-transparent pb-4 pl-6 pr-10 border-b ${getBorderClass(
                    "message",
                  )} text-white placeholder:text-white/50 text-[16px] leading-[26px] tracking-[-0.22px] font-medium uppercase resize-none focus:outline-none transition-colors`}
                />
                {touched.message && errors.message && (
                  <IconErrorExclamation className="w-6 h-6 absolute right-0 top-0" />
                )}
              </div>
              {touched.message && errors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="text-[12px] leading-[16px] tracking-[-0.17px] text-[#FF6F5B] text-right mt-[5px]"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Confirmation message upon valid submission */}
            {submittedMessage && (
              <div
                role="status"
                aria-live="polite"
                className="p-4 bg-[#151515] border border-[#4EE1A0] text-[#4EE1A0] text-sm font-medium"
              >
                {submittedMessage}
              </div>
            )}

            {/* SEND MESSAGE BUTTON */}
            <div className="flex justify-end pt-1">
              <button type="submit" className="btn-underline">
                {t.sendBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
