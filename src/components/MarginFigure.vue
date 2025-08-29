<template>
  <label :for="marginFigureId" class="margin-toggle">&#8853;</label>
  <input :id="marginFigureId" class="margin-toggle" type="checkbox" />
  <span class="marginnote">
    <img :src="src" :alt="alt" />
    <slot>{{ caption }}</slot>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string
  alt: string
  caption?: string
}

defineProps<Props>()

const marginFigureId = ref(`mn-figure-${Math.random().toString(36).substr(2, 9)}`)
</script>