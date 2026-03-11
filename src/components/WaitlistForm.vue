<template>
  <form
    id="waitlist-form"
    class="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-7"
    novalidate
    @submit.prevent="onSubmit"
  >
    <div class="mb-5">
      <h2 class="text-xl font-semibold text-ink">Garanta seu acesso antecipado</h2>
      <p class="mt-1 text-sm text-muted">Leva menos de 1 minuto. Receba convite prioritário para os testes.</p>
    </div>

    <div class="sr-only" aria-hidden="true">
      <label for="website">Website</label>
      <input
        id="website"
        type="text"
        tabindex="-1"
        autocomplete="off"
        :value="form.website"
        @input="setField('website', ($event.target as HTMLInputElement).value)"
      >
    </div>

    <div class="space-y-4">
      <div>
        <label for="name" class="mb-1 block text-sm font-medium text-ink">Nome*</label>
        <input
          id="name"
          type="text"
          :value="form.name"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-cta focus:ring-4 focus:ring-[var(--focus-ring)]"
          placeholder="Seu nome completo"
          :aria-invalid="Boolean(errors.name)"
          :aria-describedby="errors.name ? 'name-error' : undefined"
          @input="setField('name', ($event.target as HTMLInputElement).value)"
        >
        <p v-if="errors.name" id="name-error" class="mt-1 text-xs text-rose-600">{{ errors.name }}</p>
      </div>

      <div>
        <label for="email" class="mb-1 block text-sm font-medium text-ink">E-mail*</label>
        <input
          id="email"
          type="email"
          :value="form.email"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-cta focus:ring-4 focus:ring-[var(--focus-ring)]"
          placeholder="seu@email.com"
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="errors.email ? 'email-error' : undefined"
          @input="setField('email', ($event.target as HTMLInputElement).value)"
        >
        <p v-if="errors.email" id="email-error" class="mt-1 text-xs text-rose-600">{{ errors.email }}</p>
      </div>

      <div>
        <label for="currentMoment" class="mb-1 block text-sm font-medium text-ink">Momento atual*</label>
        <select
          id="currentMoment"
          :value="form.currentMoment"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-cta focus:ring-4 focus:ring-[var(--focus-ring)]"
          :aria-invalid="Boolean(errors.currentMoment)"
          :aria-describedby="errors.currentMoment ? 'currentMoment-error' : undefined"
          @change="setField('currentMoment', ($event.target as HTMLSelectElement).value as WaitlistFormData['currentMoment'])"
        >
          <option value="">Selecione uma opção</option>
          <option value="primeiro-emprego">Primeiro emprego</option>
          <option value="recolocacao">Recolocação</option>
          <option value="troca-empresa">Quero trocar de empresa</option>
        </select>
        <p v-if="errors.currentMoment" id="currentMoment-error" class="mt-1 text-xs text-rose-600">
          {{ errors.currentMoment }}
        </p>
      </div>
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-cta px-4 py-3 text-sm font-semibold text-white transition hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-75"
    >
      {{ isSubmitting ? "Enviando..." : "Quero entrar na lista de espera" }}
    </button>

    <p class="mt-3 text-center text-xs text-slate-500">Grátis na fase inicial. Sem spam.</p>

    <p v-if="errorMessage" class="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
      {{ errorMessage }}
    </p>

    <p v-if="successMessage" class="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
      {{ successMessage }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { useWaitlistForm } from "@/composables/useWaitlistForm";
import type { WaitlistFormData } from "@/types/waitlist";

const { form, errors, isSubmitting, successMessage, errorMessage, setField, submit } = useWaitlistForm();

async function onSubmit() {
  await submit();
}
</script>
