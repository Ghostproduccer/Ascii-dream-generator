<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import p5 from 'p5'

const canvasContainer = ref(null)
const CANVAS_SIZE = 900

let asciiSketch = null
let mainImage = null

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
        let px = Math.floor((x * mainImage.width) / cols)
        let py = Math.floor((y * mainImage.height) / rows)
        let idx = 4 * (py * mainImage.width + px)

        let r = mainImage.pixels[idx]
        let g = mainImage.pixels[idx + 1]
        let b = mainImage.pixels[idx + 2]
        let bright = (r + g + b) / 3

        let charIndex = Math.floor(p.map(bright, 0, 255, 0, charSet.length - 1))
        let c = charSet.charAt(charIndex)

        p.fill(255)
        p.text(c, x * tileW + tileW / 2, y * tileH + tileH / 2)
      }
    }
  }
}

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
</script>

<template>
  <div>
    <h1>Ascii Generator Sketch</h1>
    <input type="file" accept="image/*" @change="onFileChange" />
    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>

<style scoped>
.canvas-container {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #000;
}
</style>
