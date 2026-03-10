import { getSupabaseClient } from "@/lib/supabaseClient";
import type { WaitlistFormData } from "@/types/waitlist";

export async function handleWaitlistSubmit(payload: WaitlistFormData): Promise<void> {
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

  throw new Error("Não foi possível concluir seu cadastro agora. Tente novamente em instantes.");
}
