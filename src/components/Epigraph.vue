<template>
  <div class="epigraph">
    <blockquote>
      <slot />
      <footer v-if="$slots.footer">
        <slot name="footer" />
      </footer>
    </blockquote>
  </div>
</template>

<script setup lang="ts">
</script>