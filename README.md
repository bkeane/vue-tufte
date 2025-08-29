# Vue Tufte

Vue 3 components implementing Edward Tufte's design principles for elegant, readable typography and data visualization.

## Installation

```bash
npm install vue-tufte
```

## Usage

### As a Plugin (Global Registration)

```js
import { createApp } from 'vue'
import { install as VueTufte } from 'vue-tufte'
import App from './App.vue'

const app = createApp(App)
app.use(VueTufte)
app.mount('#app')
```

### Individual Components

```js
import { Article, Section, Sidenote, CodeBlock } from 'vue-tufte'

export default {
  components: {
    Article,
    Section, 
    Sidenote,
    CodeBlock
  }
}
```

## Components

- **Article** - Main content container with Tufte styling
- **Section** - Content sections with proper spacing  
- **NewThought** - Small caps for section openings
- **Subtitle** - Section subtitles that appear below headings
- **Sidenote** - Numbered margin notes with automatic numbering
- **MarginNote** - Unnumbered margin notes using symbols
- **Figure** - Images with captions
- **MarginFigure** - Figures displayed in margins
- **FullWidthFigure** - Full-width images and visualizations
- **Epigraph** - Quotations with attribution
- **CodeBlock** - Syntax-highlighted code blocks with Shiki

## Example

```vue
<template>
  <Article>
    <h1>My Document</h1>
    <Subtitle>An elegant document</Subtitle>
    
    <Section>
      <NewThought>This is the beginning</NewThought> of an elegantly 
      formatted document following Tufte's principles.
      
      <Sidenote>This appears in the margin with automatic numbering.</Sidenote>
    </Section>
    
    <CodeBlock language="javascript">
      console.log('Beautifully highlighted code')
    </CodeBlock>
    
    <Figure src="/chart.png">
      Caption for the visualization
    </Figure>
  </Article>
</template>
```

## Code Highlighting Configuration

Configure syntax highlighting themes and languages:

```js
app.use(VueTufte, {
  shiki: {
    themes: ['github-dark', 'github-light'],
    langs: ['javascript', 'python', 'css']
  }
})
```

## License

MIT