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

  const hl = await getGlobalHighlighter()

  // Helper function to attempt highlighting with dynamic loading
  const attemptHighlight = async (): Promise<string> => {
    try {
      return hl.codeToHtml(code, {
        lang: props.language,
        theme: props.theme
      })
    } catch (error) {
      const errorMessage = (error as any)?.message || ''
      
      // Check if it's a language error
      if (errorMessage.includes('Language') && errorMessage.includes('not found')) {
        await hl.loadLanguage(props.language)
        // Retry after loading language
        return attemptHighlight()
      }
      
      // Check if it's a theme error
      if (errorMessage.includes('Theme') && errorMessage.includes('not found')) {
        await hl.loadTheme(props.theme)
        // Retry after loading theme
        return attemptHighlight()
      }
      
      // Re-throw if it's not a loading issue we can handle
      throw error
    }
  }

  try {
    const html = await attemptHighlight()
    
    // Get theme background color after ensuring theme is loaded
    const themeInfo = hl.getTheme(props.theme)
    const bgColor = themeInfo?.bg || '#ffffff'
    
    // Force the background color by modifying the HTML
    const modifiedHtml = html.replace(
      /style="([^"]*)"/, 
      `style="$1; background-color: ${bgColor} !important;"`
    )
    
    highlightedCode.value = modifiedHtml
  } catch (error) {
    console.warn(`VueTufte: Failed to highlight ${props.language}/${props.theme}`, (error as any)?.message || error)
    // Fallback to plain text rendering
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

@media (max-width: 760px) {
  .shiki-wrapper {
    width: 97%;
  }
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

@media (max-width: 760px) {
  pre:not(.shiki) {
    width: 97%;
  }
}

.shiki-wrapper code {
  width: 100% !important;
  margin-left: 0 !important;
}
</style>