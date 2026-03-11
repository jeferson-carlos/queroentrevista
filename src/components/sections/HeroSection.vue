<template>
  <SectionBlock id="inicio" custom-class="pb-10 pt-12 sm:pt-16">
    <div class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div>
        <span class="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
          Lista de espera aberta | testes iniciais com vagas limitadas
        </span>

        <h1 class="mt-5 max-w-2xl text-4xl font-bold leading-[1.08] text-ink sm:text-5xl">
          Conquiste mais entrevistas com um perfil que convence.
        </h1>

        <p class="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Pare de se candidatar no escuro. O Quero Entrevistas ajuda você a identificar o que está travando suas
          respostas e ajustar currículo, LinkedIn e posicionamento para aumentar chamadas para processos seletivos.
        </p>

        <ul class="mt-6 space-y-2 text-sm text-slate-700">
          <li class="flex items-start gap-2">
            <span class="mt-0.5 text-blue-700">•</span>
            <span>Diagnóstico objetivo dos pontos que enfraquecem sua candidatura.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-0.5 text-blue-700">•</span>
            <span>Ajustes práticos no currículo e no LinkedIn para gerar mais interesse.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-0.5 text-blue-700">•</span>
            <span>Direcionamento mais claro para se candidatar com maior aderência.</span>
          </li>
        </ul>

        <div class="mt-7">
          <a
            href="#waitlist-form"
            class="inline-flex whitespace-nowrap items-center justify-center rounded-lg bg-cta px-6 py-3 text-sm font-semibold text-white transition hover:bg-cta-hover"
          >
            Entrar na lista de espera
          </a>
          <p class="mt-2 text-sm text-muted">Sem custo, sem spam e sem compromisso.</p>
        </div>
      </div>

      <div class="lg:pl-4">
        <WaitlistForm />
      </div>
    </div>
  </SectionBlock>
</template>

<script setup lang="ts">
import WaitlistForm from "@/components/WaitlistForm.vue";
import SectionBlock from "@/components/ui/SectionBlock.vue";
</script>
