<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import p5 from "p5";

const canvasContainer = ref(null);
const CANVAS_SIZE = 700;
const asciiSvg = ref(null);
const asciiText = ref(null);

// Props
const props = defineProps({
  brightnessThreshold: { type: Number, required: true },
  invert: { type: Boolean, default: false },
  charSize: { type: Number, default: 10 },
  charSet: { type: String, default: "@%#*+=-:. " },
});
defineExpose({
  asciiSvg,
});

let asciiSketch = null;
let mainImage = null;

const sketch = (p) => {
  let cols, rows, tileW, tileH;
  let font = null;

  p.setup = async () => {
    if (!canvasContainer.value) return;

    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE).parent(canvasContainer.value);

    try {
      font = await p.loadFont(
        "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf"
      );
      p.textFont(font);
    } catch (e) {
      console.error("Font load error:", e);
    }

    p.textAlign(p.CENTER, p.CENTER);
    p.noLoop();
    p.background(0);
  };

  const renderASCII = () => {
    if (!mainImage) return;

    tileW = props.charSize;
    tileH = props.charSize;
    cols = Math.floor(p.width / tileW);
    rows = Math.floor(p.height / tileH);

    p.background(0);
    p.textSize(props.charSize);
    const charSet = props.charSet;
    const maxThreshold = Number(props.brightnessThreshold) || 255;

    mainImage.loadPixels();
    let asciiLines = [];

    for (let y = 0; y < rows; y++) {
      let line = "";
      for (let x = 0; x < cols; x++) {
        const px = Math.floor((x * mainImage.width) / cols);
        const py = Math.floor((y * mainImage.height) / rows);
        const idx = 4 * (py * mainImage.width + px);

        const r = mainImage.pixels[idx];
        const g = mainImage.pixels[idx + 1];
        const b = mainImage.pixels[idx + 2];
        const bright = (r + g + b) / 3;

        const index = Math.floor(
          p.map(
            bright,
            0,
            maxThreshold,
            props.invert ? charSet.length - 1 : 0,
            props.invert ? 0 : charSet.length - 1
          )
        );

        const c = charSet.charAt(
          Math.max(0, Math.min(charSet.length - 1, index))
        );

        line += c;

        const xPos = x * tileW + tileW / 2;
        const yPos = y * tileH + tileH / 2;

        p.fill(255);
        p.text(c, xPos, yPos);
      }
      asciiLines.push(line);
    }

    asciiText.value = asciiLines.join("\n");
    console.log(asciiText.value);
  };

  p.draw = renderASCII;
};

// File handler
function onFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (asciiSketch) {
      asciiSketch.loadImage(e.target.result, (img) => {
        mainImage = img;
        mainImage.resize(CANVAS_SIZE, CANVAS_SIZE);
        asciiSketch.redraw();
      });
    }
  };
  reader.readAsDataURL(file);
}

onMounted(() => {
  nextTick(() => {
    asciiSketch = new p5(sketch);
  });
});

onBeforeUnmount(() => {
  asciiSketch?.remove();
});

// Watchers
const refreshSketch = () => {
  if (asciiSketch && mainImage) asciiSketch.redraw();
};

watch(() => props.brightnessThreshold, refreshSketch);
watch(() => props.invert, refreshSketch);
watch(() => props.charSize, refreshSketch);
watch(() => props.charSet, refreshSketch);
</script>

<template>
  <div class="wrapper">
    <div ref="canvasContainer" class="canvas-container"></div>
    <label for="file-upload" class="custom-file-upload">Choose an image</label>
    <input
      id="file-upload"
      type="file"
      accept="image/*"
      @change="onFileChange"
      class="custom-input"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.canvas-container {
  border: 1px solid var(--color-muted);
  padding: 0.5rem;
  background-color: #000;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  border: 1px solid var(--color-primary);
  padding: 0.4rem 1rem;
  cursor: pointer;
  display: inline-block;
}

.custom-file-upload:hover {
  color: var(--color-background);
  font-weight: bold;
  background: var(--color-muted);
}
</style>
