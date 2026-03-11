<template>
  <SectionBlock>
    <div class="rounded-2xl border border-blue-100 bg-blue-50 p-7 sm:p-10">
      <h2 class="text-2xl font-semibold text-ink sm:text-3xl">Entre agora na lista de espera</h2>
      <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        As vagas dos testes iniciais são limitadas. Quem entrar agora recebe prioridade para conhecer a plataforma em
        primeira mão.
      </p>

      <a
        href="#waitlist-form"
        class="mt-6 inline-flex items-center justify-center rounded-lg bg-cta px-5 py-3 text-sm font-semibold text-white transition hover:bg-cta-hover"
      >
        Quero prioridade na lista
      </a>
      <p class="mt-3 text-xs text-slate-500">Cadastro gratuito. Atualizações apenas quando houver novidades importantes.</p>
    </div>
  </SectionBlock>
</template>

<script setup lang="ts">
import SectionBlock from "@/components/ui/SectionBlock.vue";
</script>
