<template>
  <div class="min-h-screen">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#inicio" class="inline-flex items-center gap-2">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cta text-sm font-bold text-white">Q</span>
          <span class="text-sm font-semibold tracking-tight text-ink sm:text-base">Quero Entrevistas</span>
        </a>

        <a
          href="#waitlist-form"
          class="inline-flex items-center justify-center rounded-lg bg-cta px-4 py-2 text-xs font-semibold text-white transition hover:bg-cta-hover sm:text-sm"
        >
          Entrar na lista
        </a>
      </div>
    </header>

    <main>
      <HeroSection />
      <PainSection />
      <BenefitsSection />
      <AudienceSection />
      <HowItWorksSection />
      <SecondaryCtaSection />
      <FaqSection />
    </main>

    <footer class="px-4 pb-10 pt-4 sm:px-6">
      <div class="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center">
        <p>Quero Entrevistas</p>
        <a href="#waitlist-form" class="font-medium text-cta transition hover:text-cta-hover">Quero entrar na lista</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AudienceSection from "@/components/sections/AudienceSection.vue";
import BenefitsSection from "@/components/sections/BenefitsSection.vue";
import FaqSection from "@/components/sections/FaqSection.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import HowItWorksSection from "@/components/sections/HowItWorksSection.vue";
import PainSection from "@/components/sections/PainSection.vue";
import SecondaryCtaSection from "@/components/sections/SecondaryCtaSection.vue";
</script>
