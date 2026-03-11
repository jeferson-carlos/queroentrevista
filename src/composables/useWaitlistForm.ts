import { reactive, ref } from "vue";
import { handleWaitlistSubmit } from "@/services/waitlist";
import { trackEvent } from "@/lib/analytics";
import type { WaitlistFormData, WaitlistFormErrors } from "@/types/waitlist";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FORM_FILL_TIME_MS = 1200;
const CLIENT_RATE_LIMIT_MS = 15_000;
const LAST_SUBMIT_AT_KEY = "qe_waitlist_last_submit_at";

function isValidLinkedInUrl(value: string): boolean {
  if (!value.trim()) return true;

  try {
    const parsed = new URL(value.trim());
    return parsed.hostname.includes("linkedin.com");
  } catch {
    return false;
  }
}

function createInitialForm(): WaitlistFormData {
  return {
    name: "",
    email: "",
    currentMoment: "",
    linkedin: "",
    website: ""
  };
}

function validate(data: WaitlistFormData): WaitlistFormErrors {
  const errors: WaitlistFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Informe seu nome.";
  }

  if (!data.email.trim()) {
    errors.email = "Informe seu e-mail.";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!data.currentMoment) {
    errors.currentMoment = "Selecione seu momento atual.";
  }

  if (!isValidLinkedInUrl(data.linkedin)) {
    errors.linkedin = "Informe uma URL válida do LinkedIn (linkedin.com).";
  }

  return errors;
}

export function useWaitlistForm() {
  const form = reactive<WaitlistFormData>(createInitialForm());
  const errors = reactive<WaitlistFormErrors>({});
  const isSubmitting = ref(false);
  const successMessage = ref("");
  const errorMessage = ref("");
  const formStartedAt = ref(Date.now());

  function hasRecentSubmit(): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    const rawValue = window.localStorage.getItem(LAST_SUBMIT_AT_KEY);
    if (!rawValue) {
      return false;
    }

    const lastSubmitAt = Number(rawValue);
    if (!Number.isFinite(lastSubmitAt)) {
      return false;
    }

    return Date.now() - lastSubmitAt < CLIENT_RATE_LIMIT_MS;
  }

  function markSubmitTimestamp(): void {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(LAST_SUBMIT_AT_KEY, String(Date.now()));
  }

  function clearErrors() {
    Object.keys(errors).forEach((key) => {
      delete errors[key as keyof WaitlistFormErrors];
    });
  }

  function setField<K extends keyof WaitlistFormData>(field: K, value: WaitlistFormData[K]) {
    form[field] = value;
    delete errors[field];
    if (successMessage.value || errorMessage.value) {
      successMessage.value = "";
      errorMessage.value = "";
    }
  }

  async function submit(): Promise<boolean> {
    successMessage.value = "";
    errorMessage.value = "";
    clearErrors();

    if (form.website.trim()) {
      Object.assign(form, createInitialForm());
      formStartedAt.value = Date.now();
      successMessage.value = "Pronto! Você entrou na lista de espera do Quero Entrevistas.";
      return true;
    }

    if (Date.now() - formStartedAt.value < MIN_FORM_FILL_TIME_MS) {
      errorMessage.value = "Aguarde alguns segundos e tente novamente.";
      return false;
    }

    if (hasRecentSubmit()) {
      errorMessage.value = "Recebemos uma tentativa recente. Aguarde alguns segundos para tentar novamente.";
      return false;
    }

    const validation = validate(form);
    Object.assign(errors, validation);

    if (Object.keys(validation).length > 0) {
      return false;
    }

    isSubmitting.value = true;

    try {
      const trimmedLinkedin = form.linkedin.trim();

      await handleWaitlistSubmit({
        name: form.name.trim(),
        email: form.email.trim(),
        currentMoment: form.currentMoment,
        linkedin: trimmedLinkedin
      });

      markSubmitTimestamp();
      trackEvent("waitlist_signup", {
        current_moment: form.currentMoment,
        has_linkedin: Boolean(trimmedLinkedin)
      });

      Object.assign(form, createInitialForm());
      formStartedAt.value = Date.now();
      clearErrors();
      successMessage.value = "Pronto! Você entrou na lista de espera do Quero Entrevistas.";
      return true;
    } catch (error) {
      if (error instanceof Error) {
        errorMessage.value = error.message;
      } else {
        errorMessage.value = "Não foi possível concluir seu cadastro agora. Tente novamente em instantes.";
      }
      return false;
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    form,
    errors,
    isSubmitting,
    successMessage,
    errorMessage,
    setField,
    submit
  };
}
