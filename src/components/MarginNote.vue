<template>
  <label :for="marginNoteId" class="margin-toggle">&#8853;</label>
  <input :id="marginNoteId" class="margin-toggle" type="checkbox" />
  <span class="marginnote"><slot /></span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const marginNoteId = ref(`mn-${Math.random().toString(36).substr(2, 9)}`)
</script>