<template>
  <div class="min-h-screen">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#inicio" class="inline-flex items-center gap-2">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cta text-sm font-bold text-white">Q</span>
          <span class="text-sm font-semibold tracking-tight text-ink sm:text-base">Quero Entrevista</span>
        </a>

        <a
          href="#waitlist-form"
          class="inline-flex items-center justify-center rounded-lg bg-cta px-4 py-2 text-xs font-semibold text-white transition hover:bg-cta-hover sm:text-sm"
        >
          Entrar na lista de espera
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

    <footer class="border-t border-slate-200 bg-white px-4 pb-10 pt-10 sm:px-6">
      <div class="mx-auto w-full max-w-6xl">
        <div class="grid gap-8 border-b border-slate-200 pb-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <a href="#inicio" class="inline-flex items-center gap-2">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cta text-sm font-bold text-white">Q</span>
              <span class="text-sm font-semibold tracking-tight text-ink sm:text-base">Quero Entrevista</span>
            </a>
            <p class="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Plataforma criada para ajudar profissionais a fortalecer currículo, LinkedIn e posicionamento para conquistar mais entrevistas.
            </p>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-ink">Navegação</h3>
            <nav class="mt-3 space-y-2 text-sm">
              <a href="#beneficios" class="block text-muted transition hover:text-ink">Benefícios</a>
              <a href="#para-quem" class="block text-muted transition hover:text-ink">Para quem é</a>
              <a href="#como-funciona" class="block text-muted transition hover:text-ink">Como funciona</a>
              <a href="#faq" class="block text-muted transition hover:text-ink">FAQ</a>
            </nav>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-ink">Lista de espera</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted">Receba prioridade para testar o Quero Entrevista quando abrirmos os primeiros acessos.</p>
            <a
              href="#waitlist-form"
              class="mt-4 inline-flex items-center justify-center rounded-lg bg-cta px-4 py-2 text-sm font-semibold text-white transition hover:bg-cta-hover"
            >
              Entrar na lista de espera
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-2 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {{ currentYear }} Quero Entrevista. Todos os direitos reservados.</p>
          <p>Comunicação objetiva, sem spam e com foco em oportunidades reais.</p>
        </div>
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

const currentYear = new Date().getFullYear();
</script>
