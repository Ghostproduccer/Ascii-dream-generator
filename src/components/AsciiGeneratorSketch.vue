<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import p5 from 'p5'

const canvasContainer = ref(null)
const CANVAS_SIZE = 700

// Props
const props = defineProps({
  brightnessThreshold: {
    type: Number,
    required: true
  },
  invert: {
    type: Boolean,
    default: false
  }
})

let asciiSketch = null
let mainImage = null
let redrawTimeout = null

const sketch = (p) => {
  const charSet = "@%#*+=-:. "
  const cols = 120
  let rows, tileW, tileH
  let font = null

  p.setup = async () => {
    if (!canvasContainer.value) {
      console.error("Canvas container is not ready.")
      return
    }

    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE).parent(canvasContainer.value)

    try {
      font = await p.loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf")
      p.textFont(font)
    } catch (e) {
      console.error("Failed to load font:", e)
    }

    p.textAlign(p.CENTER, p.CENTER)
    p.textSize(8)
    p.noLoop()
    p.background(0)
  }

  p.draw = () => {
    if (!mainImage || !mainImage.pixels) return

    p.background(0)

    tileW = p.width / cols
    tileH = tileW
    rows = Math.floor(p.height / tileH)

    mainImage.loadPixels()

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = Math.floor((x * mainImage.width) / cols)
        const py = Math.floor((y * mainImage.height) / rows)
        const idx = 4 * (py * mainImage.width + px)

        const r = mainImage.pixels[idx]
        const g = mainImage.pixels[idx + 1]
        const b = mainImage.pixels[idx + 2]
        const bright = (r + g + b) / 3

        const maxThreshold = Number(props.brightnessThreshold) || 255

        const charIndex = Math.floor(p.map(
          bright,
          0,
          maxThreshold,
          props.invert ? charSet.length - 1 : 0,
          props.invert ? 0 : charSet.length - 1
       ))

        const c = charSet.charAt(Math.max(0, Math.min(charSet.length - 1, charIndex)))

        p.fill(255)
        p.text(c, x * tileW + tileW / 2, y * tileH + tileH / 2)
      }
    }
  }
}

// File input handler
function onFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (asciiSketch) {
        asciiSketch.loadImage(e.target.result, (img) => {
          mainImage = img
          mainImage.resize(CANVAS_SIZE, CANVAS_SIZE)
          asciiSketch.redraw()
        })
      }
    }
    reader.readAsDataURL(file)
  }
}

// Initialize and cleanup
onMounted(() => {
  nextTick(() => {
    asciiSketch = new p5(sketch)
  })
})

onBeforeUnmount(() => {
  if (asciiSketch) {
    asciiSketch.remove()
  }
})

// Debounced redraws
const debounceTimeout = 150;

watch(() => props.brightnessThreshold, () => {
  if (asciiSketch && mainImage) {
    clearTimeout(redrawTimeout)
    redrawTimeout = setTimeout(() => {
      asciiSketch.redraw()
    }, debounceTimeout)
  }
})

watch(() => props.invert, () => {
  if (asciiSketch && mainImage) {
    clearTimeout(redrawTimeout)
    redrawTimeout = setTimeout(() => {
      asciiSketch.redraw()
    }, debounceTimeout)
  }
})
</script>

<template>
  <div class="wrapper">
    <div ref="canvasContainer" class="canvas-container"></div>
    <label for="file-upload" class="custom-file-upload">
        Choose an image
    </label>
    <input id="file-upload" type="file" accept="image/*" @change="onFileChange" class="custom-input" />
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
  padding: 10px;
  background-color: #000;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid var(--color-primary);
  display: inline-block;
  padding: 0.4rem 1rem;
  cursor: pointer;
}
.custom-file-upload:hover {
  color: var(--color-background);
  font-weight: bold;
  background: var(--color-muted);
}
</style>
