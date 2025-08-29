<template>
  <div v-if="highlightedCode" v-html="highlightedCode" class="shiki-wrapper"></div>
  <pre v-else><code><slot /></code></pre>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getGlobalHighlighter } from '../index'

interface Props {
  language?: string
  theme?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'text',
  theme: 'nord'
})

const slots = defineSlots<{
  default(): any
}>()

const highlightedCode = ref('')

async function highlightCode() {
  const slotContent = slots.default?.()
  if (!slotContent || slotContent.length === 0) {
    return
  }
  
  // Extract text content while preserving whitespace
  let code = ''
  if (typeof slotContent[0].children === 'string') {
    code = slotContent[0].children
  } else if (Array.isArray(slotContent[0].children)) {
    code = slotContent[0].children.join('')
  } else {
    code = slotContent[0].children?.toString() || ''
  }
  
  if (!code.trim()) {
    return
  }

  try {
    const hl = await getGlobalHighlighter()

    // Get theme background color manually
    const themeInfo = hl.getTheme(props.theme)
    const bgColor = themeInfo?.bg || '#ffffff'
    
    const html = hl.codeToHtml(code, {
      lang: props.language,
      theme: props.theme
    })
    
    // Force the background color by modifying the HTML
    const modifiedHtml = html.replace(
      /style="([^"]*)"/, 
      `style="$1; background-color: ${bgColor} !important;"`
    )
    
    highlightedCode.value = modifiedHtml
  } catch (error) {
    console.warn('Failed to highlight code:', error)
    // Fallback to plain text
  }
}

onMounted(highlightCode)
watch(() => [props.language, props.theme], highlightCode)
</script>

<style>
.shiki-wrapper {
  margin: 0;
}

.shiki-wrapper pre {
  margin: 0;
  padding: 0;
  background: transparent !important;
}

.shiki-wrapper code {
  padding: 0;
  background: transparent;
}

/* Integrate with Tufte CSS typography */
.shiki-wrapper {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.42;
}

.shiki-wrapper {
  width: 55%;
  margin-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.shiki-wrapper pre {
  padding: 1rem;
  overflow-x: auto;
  border-radius: 8px;
  margin: 0;
  width: 100%;
  display: block;
}

/* Ensure Shiki themes override any global styles */
.shiki-wrapper pre.shiki {
  background-color: unset !important;
}

/* Fallback styling for non-highlighted code */
pre:not(.shiki) {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  width: 55%;
  margin: 1rem 0;
  display: block;
}

.shiki-wrapper code {
  width: 100% !important;
  margin-left: 0 !important;
}
</style>