<template>
  <label :for="marginNoteId" class="margin-toggle">&#8853;</label>
  <input :id="marginNoteId" class="margin-toggle" type="checkbox" />
  <span class="marginnote"><slot /></span>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue'

const marginNoteId = ref(`mn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)

// Validate proper usage context
onMounted(() => {
  const instance = getCurrentInstance()
  const parentElement = instance?.vnode?.el?.parentElement
  
  if (parentElement) {
    const validBlockElements = ['P', 'DIV', 'SECTION', 'ARTICLE', 'BLOCKQUOTE', 'MAIN', 'ASIDE']
    const isInValidContext = validBlockElements.includes(parentElement.tagName)
    
    if (!isInValidContext) {
      console.error(
        `❌ MarginNote must be used within block elements (${validBlockElements.map(t => t.toLowerCase()).join(', ')}) for proper positioning. ` +
        `Currently in: ${parentElement.tagName.toLowerCase()}. Layout will not work correctly.`
      )
    }
  }
})
</script>