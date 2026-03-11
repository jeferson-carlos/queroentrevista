export type CurrentMomentOption = "primeiro-emprego" | "recolocacao" | "troca-empresa";

export type WaitlistSubmitPayload = {
  name: string;
  email: string;
  currentMoment: CurrentMomentOption | "";
  linkedin?: string;
};

export type WaitlistFormData = WaitlistSubmitPayload & {
  website: string;
};

export type WaitlistFormErrors = Partial<Record<keyof WaitlistFormData, string>>;
