<template>
  <SectionBlock id="como-funciona">
    <div class="max-w-3xl">
      <h2 class="text-2xl font-semibold text-ink sm:text-3xl">Como vai funcionar</h2>
      <p class="mt-3 text-base leading-relaxed text-muted">
        Processo direto em 4 etapas para sair da candidatura sem retorno para um perfil mais competitivo.
      </p>
    </div>

    <ol class="mt-7 space-y-3">
      <li
        v-for="(step, index) in steps"
        :key="step"
        class="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
      >
        <span class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
          {{ index + 1 }}
        </span>
        <span class="pt-0.5 text-sm text-ink sm:text-base">{{ step }}</span>
      </li>
    </ol>
  </SectionBlock>
</template>

<script setup lang="ts">
import SectionBlock from "@/components/ui/SectionBlock.vue";

const steps = [
  "Voce entra na lista de espera",
  "Recebe prioridade quando abrirmos os testes",
  "Acessa orientacoes praticas para fortalecer seu perfil profissional",
  "Aplica os ajustes e aumenta suas chances de conquistar entrevistas"
];
</script>
