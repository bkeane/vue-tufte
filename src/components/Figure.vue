<template>
  <figure>
    <label v-if="$slots.default" :for="figureId" class="margin-toggle">&#8853;</label>
    <input v-if="$slots.default" :id="figureId" class="margin-toggle" type="checkbox" />
    <span v-if="$slots.default" class="marginnote">
      <slot />
    </span>
    <img :src="src" :alt="alt" />
  </figure>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string
  alt?: string
}

defineProps<Props>()

const figureId = ref(`mn-${Math.random().toString(36).substr(2, 9)}`)
</script>