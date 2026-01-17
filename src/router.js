import { createRouter, createWebHistory } from 'vue-router'

import LandingView from './views/LandingView.vue'
import AsciiGeneratorView from './views/AsciiGeneratorView.vue'

const routes = [
  { path: '/', component: LandingView },
  { path: '/generate', component: AsciiGeneratorView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})