<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";

const props = defineProps({
  frames: {
    type: Array,
    required: true,
  },
  interval: {
    type: Number,
    default: 200, // milliseconds
  },
  class: {
    type: String,
    default: "",
  },
});

const currentFrameIndex = ref(0);
const lastTime = ref(0);
let raf = null;

const currentFrame = computed(() => props.frames[currentFrameIndex.value]);

const animate = (timestamp) => {
  if (!lastTime.value) lastTime.value = timestamp;

  if (timestamp - lastTime.value >= props.interval) {
    currentFrameIndex.value =
      (currentFrameIndex.value + 1) % props.frames.length;
    lastTime.value = timestamp;
  }

  raf = requestAnimationFrame(animate);
};

onMounted(() => {
  raf = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
});

watch(
  () => props.frames,
  () => {
    currentFrameIndex.value = 0;
    lastTime.value = 0;
  }
);
</script>

<template>
  <div :class="['ascii-container', props.class]">
    <pre>{{ currentFrame }}</pre>
  </div>
</template>

<style scoped>
pre {
  font-family: monospace;
  white-space: pre;
  line-height: 1.1;
}
.ascii-container {
  font-family: monospace;
  white-space: pre;
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.ascii-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1; /* siempre detrás */
}
</style>
