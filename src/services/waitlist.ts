import { getSupabaseClient } from "@/lib/supabaseClient";
import type { WaitlistSubmitPayload } from "@/types/waitlist";

export async function handleWaitlistSubmit(payload: WaitlistSubmitPayload): Promise<void> {
  const supabase = getSupabaseClient();

  const { error } = await supabase.from("waitlist_leads").insert({
    name: payload.name,
    email: payload.email.toLowerCase(),
    current_moment: payload.currentMoment,
    linkedin: payload.linkedin || null,
    source: "landing-page"
  });

  if (!error) {
    return;
  }

  if (error.code === "23505") {
    throw new Error("Este e-mail já está na lista de espera.");
  }

  if (error.code === "P0001") {
    throw new Error("Recebemos muitas tentativas em sequência. Aguarde 1 minuto e tente novamente.");
  }

  if (error.code === "23514") {
    throw new Error("Alguns dados parecem inválidos. Revise os campos e tente novamente.");
  }

  throw new Error("Não foi possível concluir seu cadastro agora. Tente novamente em instantes.");
}
