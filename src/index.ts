import type { App } from 'vue'
import type { CreateHighlighterOptions } from 'shiki'
import { createHighlighter } from 'shiki'
import './assets/tufte.css'

// Components
import Article from './components/Article.vue'
import Section from './components/Section.vue'
import NewThought from './components/NewThought.vue'
import Subtitle from './components/Subtitle.vue'
import Sidenote from './components/Sidenote.vue'
import MarginNote from './components/MarginNote.vue'
import Epigraph from './components/Epigraph.vue'
import Figure from './components/Figure.vue'
import MarginFigure from './components/MarginFigure.vue'
import FullWidthFigure from './components/FullWidthFigure.vue'
import CodeBlock from './components/CodeBlock.vue'
import Table from './components/Table.vue'
import IFrame from './components/IFrame.vue'

// Export components
export {
  Article,
  Section,
  NewThought,
  Subtitle,
  Sidenote,
  MarginNote,
  Epigraph,
  Figure,
  MarginFigure,
  FullWidthFigure,
  CodeBlock,
  Table,
  IFrame
}

// Plugin configuration interface
export interface VueTufteOptions {
  shiki?: CreateHighlighterOptions
}

// Global highlighter instance
let globalHighlighter: any = null
let highlighterPromise: Promise<any> | null = null

export const getGlobalHighlighter = async (options?: CreateHighlighterOptions) => {
  if (globalHighlighter) {
    return globalHighlighter
  }
  
  if (highlighterPromise) {
    return highlighterPromise
  }

  // Default configuration  
  const defaultConfig: CreateHighlighterOptions = {
    themes: ['nord', 'github-light'],
    langs: ['javascript', 'typescript', 'html', 'css', 'bash', 'json', 'vue', 'text']
  }
  
  // Merge user config with defaults
  const config = options ? { ...defaultConfig, ...options } : defaultConfig
  
  highlighterPromise = createHighlighter(config).then(hl => {
    globalHighlighter = hl
    highlighterPromise = null
    return hl
  })
  
  return highlighterPromise
}

// Plugin installation function
export default {
  install(app: App, options?: VueTufteOptions) {
    // Initialize global highlighter with user config
    if (options?.shiki) {
      getGlobalHighlighter(options.shiki)
    }

    app.component('Article', Article)
    app.component('Section', Section)
    app.component('NewThought', NewThought)
    app.component('Subtitle', Subtitle)
    app.component('Sidenote', Sidenote)
    app.component('MarginNote', MarginNote)
    app.component('Epigraph', Epigraph)
    app.component('Figure', Figure)
    app.component('MarginFigure', MarginFigure)
    app.component('FullWidthFigure', FullWidthFigure)
    app.component('CodeBlock', CodeBlock)
    app.component('Table', Table)
    app.component('IFrame', IFrame)
  }
}