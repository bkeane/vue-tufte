<template>
  <label :for="sidenoteId" class="margin-toggle sidenote-number"></label>
  <input :id="sidenoteId" class="margin-toggle" type="checkbox" />
  <span class="sidenote"><slot /></span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sidenoteId = ref(`sn-${Math.random().toString(36).substr(2, 9)}`)
</script>