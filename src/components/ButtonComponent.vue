<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: { type: String, default: "primary" }, // 'primary' | 'secondary'
  size: { type: String, default: "md" }, // 'sm' | 'md' | 'lg'
  disabled: { type: Boolean, default: false },
  type: { type: String, default: "button" },
  ariaLabel: { type: String, default: "" },
});

const emit = defineEmits(["click"]);

const classes = computed(() => [
  "btn",
  `btn--${props.variant}`,
  `btn--${props.size}`,
  props.disabled ? "btn--disabled" : "",
]);

function onClick(e) {
  if (props.disabled) return;
  emit("click", e);
}

function onKeydown(e) {
  if (props.disabled) return;
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    emit("click", e);
  }
}
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled"
    :type="type"
    :aria-label="ariaLabel || undefined"
    :aria-disabled="disabled ? 'true' : 'false'"
    @click="onClick"
    @keydown="onKeydown"
  >
    <slot>Button</slot>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-weight: 600;
  transition:
    background-color 0.12s ease,
    transform 0.06s ease;
  user-select: none;
}

.btn:focus {
  outline: 2px solid rgba(0, 0, 0, 0.12);
  outline-offset: 2px;
}

/* Variants */
.btn--primary {
  background: var(--color-muted);
  color: var(--color-background);
  border: solid 1px;
  border-color: var(--color-muted);
}
.btn--primary:hover {
  color: var(--color-background);
  background: var(--color-primary);
  border: solid 1px;
}

.btn--secondary {
  background: var(--color-background);
  color: var(--color-muted);
  border: solid 1px;
  border-color: var(--color-muted);
}
.btn--secondary:hover {
  color: var(--color-primary);
  border: solid 1px;
}

/* Sizes */
.btn--sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
}
.btn--md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.btn--lg {
  padding: 0.75rem 1.25rem;
  font-size: 1.125rem;
}

/* Disabled */
.btn--disabled,
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
