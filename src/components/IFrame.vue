<template>
  <figure class="iframe-wrapper">
    <iframe 
      :src="src" 
      :width="width" 
      :height="height"
      :frameborder="frameborder || '0'"
      :allowfullscreen="allowfullscreen"
    />
  </figure>
</template>

<script setup lang="ts">
interface Props {
  src: string
  width?: string | number
  height?: string | number
  frameborder?: string
  allowfullscreen?: boolean
}

defineProps<Props>()
</script>