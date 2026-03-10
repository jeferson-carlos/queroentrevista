export type CurrentMomentOption = "primeiro-emprego" | "recolocacao" | "troca-empresa";

export type WaitlistFormData = {
  name: string;
  email: string;
  currentMoment: CurrentMomentOption | "";
  linkedin: string;
};

export type WaitlistFormErrors = Partial<Record<keyof WaitlistFormData, string>>;
