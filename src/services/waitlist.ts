import type { WaitlistFormData } from "@/types/waitlist";

export async function handleWaitlistSubmit(payload: WaitlistFormData): Promise<void> {
  // Fase 2: integrar persistencia no backend (ex.: Supabase) e envio de e-mail (ex.: Resend).
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
