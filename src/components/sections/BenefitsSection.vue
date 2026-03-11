<template>
  <SectionBlock id="beneficios">
    <div class="max-w-3xl">
      <h2 class="text-2xl font-semibold text-ink sm:text-3xl">O que o Quero Entrevistas vai te ajudar a melhorar</h2>
      <p class="mt-3 text-base leading-relaxed text-muted">
        Não é sobre "encher currículo". É sobre mostrar valor de forma estratégica para aumentar interesse real.
      </p>
    </div>

    <div class="mt-7 grid gap-4 md:grid-cols-3">
      <article v-for="benefit in benefits" :key="benefit.title" class="rounded-xl border border-slate-200 bg-white p-6">
        <h3 class="text-lg font-semibold text-ink">{{ benefit.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ benefit.description }}</p>
      </article>
    </div>
  </SectionBlock>
</template>

<script setup lang="ts">
import SectionBlock from "@/components/ui/SectionBlock.vue";

const benefits = [
  {
    title: "Currículo mais forte",
    description: "Transforme experiências em argumentos de valor que recrutadores entendem rápido."
  },
  {
    title: "LinkedIn mais atrativo",
    description: "Ajuste perfil, resumo e palavras-chave para aumentar visibilidade em buscas."
  },
  {
    title: "Mais clareza para se candidatar",
    description: "Pare de atirar para todo lado e foque em vagas com melhor chance de retorno."
  }
];
</script>
