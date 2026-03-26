<script setup lang="ts">
import type { SelectOption } from "../../types/common";

interface SelectProps {
  id?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const {
  id,
  options,
  placeholder,
  required = false,
  disabled = false,
  size = "md",
} = defineProps<SelectProps>();

const model = defineModel<string | number | null>();
</script>

<template>
  <select
    :id="id"
    :required="required"
    :disabled="disabled"
    v-model="model"
    :class="['select', `select--${size}`, { 'select--disabled': disabled }]"
  >
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
.select {
  width: 100%;
  border: 1px solid var(--input-border, #cbd5e1);
  border-radius: 0.47rem;
  background: #fff;
  color: var(--text-color, #1f2a44);
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2364748b' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.2rem;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  box-sizing: border-box;

  &.select--sm {
    padding: 0.35rem 2rem 0.35rem 0.6rem;
    font-size: 0.8rem;
  }

  &.select--md {
    padding: 0.62rem 2.2rem 0.62rem 0.75rem;
    font-size: 0.9rem;
  }

  &.select--lg {
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    font-size: 1rem;
  }

  &.select--disabled {
    opacity: 0.55;
    cursor: not-allowed;
    background-color: var(--disabled-bg, #f1f5f9);
  }

  &:focus {
    outline: none;
    border-color: var(--primary, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
}
</style>
