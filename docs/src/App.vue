<template>
  <article>
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem; max-width: 90%; flex-wrap: wrap; gap: 1rem;">
      <div style="flex-shrink: 0;">
        <h1 style="margin: 0; white-space: nowrap;">Vue-Tufte</h1>
        <Subtitle style="white-space: nowrap;"><a href="https://edwardtufte.github.io/tufte-css/" target="_blank">Tufte CSS</a> for Vue</Subtitle>
      </div>
      <Nav github="https://github.com/bkeane/vue-tufte">
        <a href="#installation">Install</a>
        <a href="#configuration">Config</a>
        <a href="#components">Components</a>
      </Nav>
    </div>

    <!-- Sticky hamburger menu when scrolled -->
    <Nav 
      sticky
      github="https://github.com/bkeane/vue-tufte"
    >
      <a href="#installation">Install</a>
      <a href="#configuration">Config</a>
      <a href="#components">Components</a>
    </Nav>

    <section>
      <p>
        <NewThought>Vue Tufte</NewThought> wraps Edward Tufte's CSS framework into Vue components.
      </p>
    </section>

    <section id="installation">
      <h2>Installation</h2>

      <CodeBlock language="bash">npm install vue-tufte</CodeBlock>
    </section>

    <section id="configuration">
      <h2>Configuration</h2>

      <p>Import components individually:</p>
      <CodeBlock language="javascript">{{ individualImport }}</CodeBlock>

      <p>Or install globally (no configuration needed):</p>
      <CodeBlock language="javascript">{{ simpleConfigFull }}</CodeBlock>

      <p>Optional: Pre-load specific languages/themes for performance:</p>
      <CodeBlock language="javascript">{{ shikiConfigFull }}</CodeBlock>

      <p>Browse available <a href="https://shiki.style/languages" target="_blank">languages</a> and <a href="https://shiki.style/themes" target="_blank">themes</a> in the Shiki docs.</p>
    </section>

    <section>
      <h2>Layout</h2>

      <h3>Document Structure</h3>
      <CodeBlock language="html">{{ documentStructure }}</CodeBlock>
    </section>

    <section id="components">
      <h2>Text Components</h2>

      <h3>New Thought</h3>
      <p>
        <NewThought>Start sections</NewThought> with small-caps emphasis.
      </p>
      <CodeBlock language="html">{{ newThoughtExample }}</CodeBlock>

      <h3>Subtitle</h3>
      <p>Subtitles appear below headings:</p>
      <CodeBlock language="html">{{ subtitleExample }}</CodeBlock>
    </section>

    <section>
      <h2>Margin Notes</h2>

      <h3>Sidenotes</h3>
      <p>
        Numbered references<Sidenote>Like this explanatory note that appears in the margin with automatic numbering.</Sidenote> appear in the margin.
      </p>
      <CodeBlock language="html">{{ sidenoteExample }}</CodeBlock>

      <h3>Margin Notes</h3>
      <p>
        Unnumbered notes<MarginNote>This margin note has no number and uses a symbol toggle on mobile.</MarginNote> use symbols.
      </p>
      <CodeBlock language="html">{{ marginNoteExample }}</CodeBlock>
    </section>

    <section id="examples">
      <h2>Figures</h2>

      <h3>Standard Figures</h3>
      <Figure 
        src="https://raw.githubusercontent.com/edwardtufte/tufte-css/gh-pages/img/exports-imports.png"
        alt="Exports and Imports to and from Denmark & Norway from 1700 to 1780"
      >
        From Edward Tufte, <em>Visual Display of Quantitative Information</em>, page 92.
      </Figure>
      <CodeBlock language="html">{{ figureExample }}</CodeBlock>

      <h3>Full-Width Figures</h3>
      <FullWidthFigure 
        src="https://raw.githubusercontent.com/edwardtufte/tufte-css/gh-pages/img/napoleons-march.png"
        alt="Figurative map of the successive losses of the French Army in the Russian campaign, 1812-1813"
      >
        Napoleon's March visualization from Beautiful Evidence.
      </FullWidthFigure>
      <CodeBlock language="html">{{ fullWidthFigureExample }}</CodeBlock>

      <h3>Margin Figures</h3>
      <p>
        Images in the margin. <MarginFigure 
          src="https://raw.githubusercontent.com/edwardtufte/tufte-css/gh-pages/img/rhino.png" 
          alt="Image of a Rhinoceros"
        >
          Dürer's rhinoceros from <em>Visual Explanations</em>.
        </MarginFigure> Good for supplementary visuals.
      </p>
      <CodeBlock language="html">{{ marginFigureExample }}</CodeBlock>
    </section>

    <section>
      <h2>Quotes</h2>

      <h3>Epigraphs</h3>
      <Epigraph>
        <p>The commonality between science and art is in trying to see profoundly.</p>
        <template #footer>Edward Tufte</template>
      </Epigraph>
      <CodeBlock language="html">{{ epigraphExample }}</CodeBlock>
    </section>

    <section>
      <h2>Navigation</h2>

      <h3>Nav Component</h3>
      <p>Navigation component with responsive hamburger menu behavior.</p>

      <CodeBlock language="html">{{ navExample }}</CodeBlock>
    </section>

    <section>
      <h2>Code</h2>

      <h3>Code Blocks</h3>
      
      <p>Basic usage:</p>
      <CodeBlock language="html">{{ codeBlockExample }}</CodeBlock>
      
      <CodeBlock language="javascript">{{ componentImport }}</CodeBlock>

      <p>With different theme:</p>
      <CodeBlock language="html">{{ themeExample }}</CodeBlock>

      <CodeBlock language="yaml" theme="github-dark">{{ yamlExample }}</CodeBlock>
    </section>


  </article>
</template>

<script setup lang="ts">
// Components are registered globally via the plugin in main.ts

// Nav items for demo
const navItems = [
  { text: 'Home', href: '#home' },
  { text: 'About', href: '#about' },
  { text: 'Work', href: '#work' },
  { text: 'Contact', href: '#contact' }
]

// Code examples
const individualImport = `import { NewThought, Sidenote, Figure } from 'vue-tufte'`

const simpleConfigFull = `import { createApp } from 'vue'
import VueTufte from 'vue-tufte'

const app = createApp(App)
app.use(VueTufte)
app.mount('#app')`

const documentStructure = `<article>
  <h1>Title</h1>
  <section>
    <h2>Section</h2>
    <p>Content</p>
  </section>
</article>`

const newThoughtExample = `<p>
  <NewThought>Start sections</NewThought> with small-caps emphasis.
</p>`

const subtitleExample = `<h1>Vue-Tufte</h1>
<Subtitle><a href="https://edwardtufte.github.io/tufte-css/">Tufte CSS</a> for Vue</Subtitle>`

const sidenoteExample = `<p>
  Numbered references<Sidenote>
    Like this explanatory note that appears in the margin with automatic numbering.
  </Sidenote> appear in the margin.
</p>`

const marginNoteExample = `<p>
  Unnumbered notes<MarginNote>
    This margin note has no number and uses a symbol toggle on mobile.
  </MarginNote> use symbols.
</p>`

const figureExample = `<Figure src="/images/chart.png">
  From Edward Tufte, <em>Visual Display of Quantitative Information</em>, page 92.
</Figure>`

const fullWidthFigureExample = `<FullWidthFigure src="/images/wide-chart.png">
  Napoleon's March visualization from Beautiful Evidence.
</FullWidthFigure>`

const marginFigureExample = `<p>
  Images in the margin. <MarginFigure src="/images/rhino.png">
    Dürer's rhinoceros from <em>Visual Explanations</em>.
  </MarginFigure> Good for supplementary visuals.
</p>`

const epigraphExample = `<Epigraph>
  <p>The commonality between science and art is in trying to see profoundly.</p>
  <template #footer>Edward Tufte</template>
</Epigraph>`

const shikiConfigFull = `import { createApp } from 'vue'
import VueTufte from 'vue-tufte'

const app = createApp(App)
app.use(VueTufte, {
  shiki: {
    langs: ['python', 'rust', 'go'],
    themes: ['dracula', 'github-light']
  }
})
app.mount('#app')`

const codeBlockExample = `<CodeBlock language="javascript">{{\`
import { NewThought, Sidenote } from 'vue-tufte'

export default {
  components: { NewThought, Sidenote }
}
\`}}</CodeBlock>`

const componentImport = `import { NewThought, Sidenote } from 'vue-tufte'

export default {
  components: { NewThought, Sidenote }
}`

const themeExample = `<CodeBlock language="yaml" theme="github-dark">{{\`
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
data:
  database_url: postgres://localhost:5432/myapp
  redis_url: redis://localhost:6379
\`}}</CodeBlock>`

const yamlExample = `apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
data:
  database_url: postgres://localhost:5432/myapp
  redis_url: redis://localhost:6379`

const navExample = `<Nav github="https://github.com/user/repo">
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#work">Work</a>
  <a href="#contact">Contact</a>
</Nav>`


</script>