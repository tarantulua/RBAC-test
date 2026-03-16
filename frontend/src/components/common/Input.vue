<script setup lang="ts">
interface InputProps {
  type?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const {
  type = "text",
  id,
  placeholder,
  required = false,
  disabled = false,
  size = "md",
} = defineProps<InputProps>();

const model = defineModel<string | number>();
</script>

<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    v-model="model"
    :class="['input', `input--${size}`, { 'input--disabled': disabled }]"
  />
</template>

<style scoped>
.input {
  width: 100%;
  border: 1px solid var(--input-border, #cbd5e1);
  border-radius: 0.47rem;
  background: #fff;
  color: var(--text-color, #1f2a44);
  font-size: 1rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  box-sizing: border-box;

  &.input--sm {
    padding: 0.35rem 0.6rem;
    font-size: 0.8rem;
  }

  &.input--md {
    padding: 0.62rem 0.75rem;
    font-size: 0.9rem;
  }

  &.input--lg {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }

  &.input--disabled {
    opacity: 0.55;
    cursor: not-allowed;
    background: var(--disabled-bg, #f1f5f9);
  }

  &:focus {
    outline: none;
    border-color: var(--primary, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }

  &::placeholder {
    color: var(--placeholder, #94a3b8);
  }
}
</style>
