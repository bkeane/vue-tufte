<template>
  <figure class="fullwidth">
    <img :src="src" :alt="alt" />
    <figcaption v-if="$slots.default">
      <slot />
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt?: string
}

defineProps<Props>()
</script>