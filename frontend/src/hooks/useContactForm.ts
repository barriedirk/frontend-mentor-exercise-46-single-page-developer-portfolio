/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";

export interface FormValues {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormErrors {
  required: string;
  invalidEmail: string;
}

/**
 * Encapsulates all contact form state, validation, and submission logic.
 * Accepts translated error strings so it stays i18n-agnostic.
 */
export function useContactForm(errors_t: ContactFormErrors) {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const validateField = (
    field: keyof FormValues,
    value: string,
  ): string | undefined => {
    const trimmed = value.trim();
    if (field === "name") {
      if (!trimmed) return errors_t.required;
      return undefined;
    }
    if (field === "email") {
      if (!trimmed) return errors_t.required;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return errors_t.invalidEmail;
      return undefined;
    }
    if (field === "message") {
      if (!trimmed) return errors_t.required;
      return undefined;
    }
    return undefined;
  };

  const validateAll = (values: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    const nameErr = validateField("name", values.name);
    const emailErr = validateField("email", values.email);
    const msgErr = validateField("message", values.message);
    if (nameErr) nextErrors.name = nameErr;
    if (emailErr) nextErrors.email = emailErr;
    if (msgErr) nextErrors.message = msgErr;
    return nextErrors;
  };

  const handleInputChange = (field: keyof FormValues, value: string) => {
    const nextValues = { ...formValues, [field]: value };
    setFormValues(nextValues);
    if (submittedMessage) setSubmittedMessage(null);

    if (touched[field]) {
      const fieldError = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: fieldError }));
    }
  };

  const handleInputBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldError = validateField(field, formValues[field]);
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    successMessage: string,
  ) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const validationErrors = validateAll(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedMessage(successMessage);
      setFormValues({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setErrors({});
    }
  };

  const getBorderClass = (field: keyof FormValues): string => {
    if (touched[field] && errors[field]) {
      return "border-[#FF6F5B] focus:border-[#FF6F5B]";
    }
    if (formValues[field].trim().length > 0 && !errors[field]) {
      return "border-[#4EE1A0] focus:border-[#4EE1A0]";
    }
    return "border-white/60 focus:border-[#4EE1A0]";
  };

  return {
    formValues,
    touched,
    errors,
    submittedMessage,
    handleInputChange,
    handleInputBlur,
    handleFormSubmit,
    getBorderClass,
  };
}
