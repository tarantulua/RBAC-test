<script setup lang="ts">
import { computed } from "vue";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const {
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
} = defineProps<ButtonProps>();

const classes = computed(() => [
  "btn",
  `btn--${variant}`,
  `btn--${size}`,
  { "btn--disabled": disabled },
]);
</script>

<template>
  <button :type="type" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border: none;
  border-radius: 0.45rem;
  padding: 0.6rem 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.btn--primary {
    background: var(--primary, #3b82f6);
    color: #fff;
  }

  &.btn--secondary {
    background: var(--secondary, #64748b);
    color: #fff;
  }

  &.btn--danger {
    background: var(--danger, #ef4444);
    color: #fff;
  }

  &.btn--ghost {
    background: transparent;
    color: var(--text-color, #1f2a44);
    border: 1px solid var(--border, #cbd5e1);
  }

  &.btn--sm {
    padding: 0.35rem 0.6rem;
    font-size: 0.8rem;
  }

  &.btn--md {
    padding: 0.6rem 0.85rem;
    font-size: 0.9rem;
  }

  &.btn--lg {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }

  &.btn--disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:not(.btn--disabled):hover {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring, #3b82f6);
    outline-offset: 2px;
  }
}
</style>
