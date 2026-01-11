<script setup>
import { ref } from "vue";
import AsciiAnimationComponent from "./AsciiAnimationComponent.vue";

const symbols = ref([
  "▚",
  "▦",
  "▂",
  "┐",
  "▗",
  "▣",
  "▄",
  "▌",
  "┤",
  "▅",
  "▇",
  "└",
  "░",
  "┬",
  "▧",
  "▁",
  "┘",
  "▖",
  "▞",
  "│",
  "▢",
  "▤",
  "▓",
  "▝",
  "▨",
  "┴",
  "□",
  "▀",
  "┼",
  "■",
  "─",
  "▐",
  "├",
  "┌",
  "▃",
  "═",
  "▩",
  "▘",
]);

const symbolCount = 80;
const floatingSymbols = Array.from({ length: symbolCount });
</script>

<template>
  <div class="ascii-background">
    <span
      v-for="(s, i) in floatingSymbols"
      :key="i"
      class="symbol"
      :style="{
        top: Math.random() * 100 + 'vh',
        left: Math.random() * 100 + 'vw',
        fontSize: 3 + Math.random() * 10 + 'px',
        animationDuration: 25 + Math.random() * 10 + 's',
        animationDelay: Math.random() * 5 + 's',
        color: `rgba(255,255,255,${0.05 + Math.random() * 0.4})`,
      }"
    >
      <ascii-animation-component :frames="symbols" :interval="100" />
    </span>
  </div>
</template>

<style scoped>
.ascii-background {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.symbol {
  position: absolute;
  font-family: monospace;
  white-space: pre;
  animation-name: float;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(-50vh);
    opacity: 0;
  }
}
</style>
