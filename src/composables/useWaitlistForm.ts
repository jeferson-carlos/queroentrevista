import { reactive, ref } from "vue";
import { handleWaitlistSubmit } from "@/services/waitlist";
import type { WaitlistFormData, WaitlistFormErrors } from "@/types/waitlist";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    linkedin: ""
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

    const validation = validate(form);
    Object.assign(errors, validation);

    if (Object.keys(validation).length > 0) {
      return false;
    }

    isSubmitting.value = true;

    try {
      await handleWaitlistSubmit({
        name: form.name.trim(),
        email: form.email.trim(),
        currentMoment: form.currentMoment,
        linkedin: form.linkedin.trim()
      });

      Object.assign(form, createInitialForm());
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
