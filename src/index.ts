import type { App } from 'vue'
import type { BundledLanguage, BundledTheme } from 'shiki'
import { createHighlighter } from 'shiki'
import './assets/tufte.css'

// Components
import NewThought from './components/NewThought.vue'
import Subtitle from './components/Subtitle.vue'
import Sidenote from './components/Sidenote.vue'
import MarginNote from './components/MarginNote.vue'
import Epigraph from './components/Epigraph.vue'
import Figure from './components/Figure.vue'
import MarginFigure from './components/MarginFigure.vue'
import FullWidthFigure from './components/FullWidthFigure.vue'
import CodeBlock from './components/CodeBlock.vue'

// Export components
export {
  NewThought,
  Subtitle,
  Sidenote,
  MarginNote,
  Epigraph,
  Figure,
  MarginFigure,
  FullWidthFigure,
  CodeBlock
}

// Plugin configuration interface
export interface VueTufteOptions {
  shiki?: {
    themes?: BundledTheme[]
    langs?: BundledLanguage[]
  }
}

// Global highlighter instance
let globalHighlighter: any = null
let highlighterPromise: Promise<any> | null = null
let userConfig: { themes?: BundledTheme[], langs?: BundledLanguage[] } | null = null

export const getGlobalHighlighter = async (options?: { themes?: BundledTheme[], langs?: BundledLanguage[] }) => {
  if (globalHighlighter) {
    return globalHighlighter
  }
  
  if (highlighterPromise) {
    return highlighterPromise
  }

  // Default configuration  
  const defaultConfig = {
    themes: ['nord', 'github-light'] as BundledTheme[],
    langs: ['javascript', 'typescript', 'html', 'css', 'bash', 'json', 'vue', 'yaml'] as BundledLanguage[]
  }
  
  // Use stored user config or provided options or defaults
  const configToUse = userConfig || options || {}
  
  // Merge languages additively instead of replacing
  const config = { 
    themes: configToUse.themes || defaultConfig.themes,
    langs: [...defaultConfig.langs, ...(configToUse.langs || [])]
  }
  
  console.log('Shiki config:', config)
  
  highlighterPromise = createHighlighter(config).then(hl => {
    globalHighlighter = hl
    highlighterPromise = null
    return hl
  })
  
  return highlighterPromise
}

// Plugin installation function
const install = (app: App, options?: VueTufteOptions) => {
  // Store user config globally so CodeBlock components can access it
  if (options?.shiki) {
    console.log('Plugin installing with shiki config:', options.shiki)
    userConfig = options.shiki
    getGlobalHighlighter(options.shiki)
  }

  app.component('NewThought', NewThought)
  app.component('Subtitle', Subtitle)
  app.component('Sidenote', Sidenote)
  app.component('MarginNote', MarginNote)
  app.component('Epigraph', Epigraph)
  app.component('Figure', Figure)
  app.component('MarginFigure', MarginFigure)
  app.component('FullWidthFigure', FullWidthFigure)
  app.component('CodeBlock', CodeBlock)
}

// Export install as both named and default
export { install }
export default { install }