<template>
  <SectionBlock id="faq" custom-class="pt-6">
    <div class="max-w-3xl">
      <h2 class="text-2xl font-semibold text-ink sm:text-3xl">FAQ</h2>
    </div>

    <div class="mt-6 space-y-3">
      <details
        v-for="(item, index) in faqItems"
        :key="item.question"
        :open="index === 0"
        class="rounded-xl border border-slate-200 bg-white p-5"
      >
        <summary class="cursor-pointer list-none pr-5 text-sm font-semibold text-ink">{{ item.question }}</summary>
        <p class="mt-3 text-sm leading-relaxed text-muted">{{ item.answer }}</p>
      </details>
    </div>
  </SectionBlock>
</template>

<script setup lang="ts">
import SectionBlock from "@/components/ui/SectionBlock.vue";

const faqItems = [
  {
    question: "O Quero Entrevistas ja esta disponivel?",
    answer: "Ainda nao. Estamos abrindo a lista de espera para os primeiros testes."
  },
  {
    question: "Entrar na lista de espera tem custo?",
    answer: "Nao. O cadastro e gratuito nesta fase de validacao."
  },
  {
    question: "Vou receber spam?",
    answer: "Nao. Enviamos apenas atualizacoes relevantes sobre o produto e a abertura dos testes."
  },
  {
    question: "Preciso ter LinkedIn?",
    answer: "Nao obrigatoriamente, mas ter um perfil aumenta seu potencial de visibilidade no mercado."
  },
  {
    question: "E para primeiro emprego ou recolocacao?",
    answer: "Para os dois casos. O produto foi pensado para quem quer aumentar suas chances de ser chamado para entrevistas."
  }
];
</script>
