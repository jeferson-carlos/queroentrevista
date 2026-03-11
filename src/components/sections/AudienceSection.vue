<template>
  <SectionBlock id="para-quem">
    <div class="max-w-3xl">
      <h2 class="text-2xl font-semibold text-ink sm:text-3xl">Feito para quem quer sair do limbo das candidaturas</h2>
      <p class="mt-3 text-base leading-relaxed text-muted">
        Ideal para quem está se esforçando para crescer na carreira, mas não está sendo chamado para entrevistas.
      </p>
      <ul class="mt-5 space-y-3 text-sm text-ink sm:text-base">
        <li v-for="item in audience" :key="item" class="flex items-start gap-2">
          <span class="mt-0.5 text-blue-700">•</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </SectionBlock>
</template>

<script setup lang="ts">
import SectionBlock from "@/components/ui/SectionBlock.vue";

const audience = [
  "Quem busca o primeiro emprego",
  "Quem quer recolocação no mercado",
  "Quem deseja trocar de empresa",
  "Quem já se candidatou várias vezes e não recebe retorno"
];
</script>
