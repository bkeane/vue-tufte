<template>
  <label :for="sidenoteId" class="margin-toggle sidenote-number"></label>
  <input :id="sidenoteId" class="margin-toggle" type="checkbox" />
  <span class="sidenote"><slot /></span>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue'

const sidenoteId = ref(`sn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)

// Validate proper usage context
onMounted(() => {
  if (import.meta.env.DEV) {
    const instance = getCurrentInstance()
    const parentElement = instance?.vnode?.el?.parentElement
    
    if (parentElement) {
      const validBlockElements = ['P', 'DIV', 'SECTION', 'ARTICLE', 'BLOCKQUOTE', 'MAIN', 'ASIDE']
      const isInValidContext = validBlockElements.includes(parentElement.tagName)
      
      if (!isInValidContext) {
        console.warn(
          `⚠️ Sidenote should be used within block elements (${validBlockElements.map(t => t.toLowerCase()).join(', ')}) for proper positioning. ` +
          `Currently in: ${parentElement.tagName.toLowerCase()}`
        )
      }
    }
  }
})
</script>