<template>
  <Article>
    <h1>Vue-Tufte</h1>
    <Subtitle><a href="https://edwardtufte.github.io/tufte-css/" target="_blank">Tufte CSS</a> for Vue</Subtitle>

    <Section>
      <p>
        <NewThought>Vue Tufte</NewThought> wraps Edward Tufte's CSS framework into Vue components.
      </p>
    </Section>

    <Section>
      <h2>Installation</h2>

      <CodeBlock language="bash">npm install vue-tufte</CodeBlock>

      <p>Import components individually:</p>
      <CodeBlock language="javascript">import { Article, Sidenote, Figure } from 'vue-tufte'</CodeBlock>

      <p>Or install globally:</p>
      <CodeBlock language="javascript">import { createApp } from 'vue'
import VueTufte from 'vue-tufte'

const app = createApp(App)
app.use(VueTufte)
app.mount('#app')</CodeBlock>
    </Section>

    <Section>
      <h2>Layout</h2>

      <h3>Document Structure</h3>
      <CodeBlock language="html">&lt;Article&gt;
  &lt;h1&gt;Title&lt;/h1&gt;
  &lt;Section&gt;
    &lt;h2&gt;Section&lt;/h2&gt;
    &lt;p&gt;Content&lt;/p&gt;
  &lt;/Section&gt;
&lt;/Article&gt;</CodeBlock>
    </Section>

    <Section>
      <h2>Text Components</h2>

      <h3>New Thought</h3>
      <p>
        <NewThought>Start sections</NewThought> with small-caps emphasis.
      </p>
      <CodeBlock language="html">&lt;p&gt;
  &lt;NewThought&gt;Start sections&lt;/NewThought&gt; with small-caps emphasis.
&lt;/p&gt;</CodeBlock>

      <h3>Subtitle</h3>
      <p>Subtitles appear below headings:</p>
      <CodeBlock language="html">&lt;h1&gt;Vue-Tufte&lt;/h1&gt;
&lt;Subtitle&gt;&lt;a href="https://edwardtufte.github.io/tufte-css/"&gt;Tufte CSS&lt;/a&gt; for Vue&lt;/Subtitle&gt;</CodeBlock>
    </Section>

    <Section>
      <h2>Margin Notes</h2>

      <h3>Sidenotes</h3>
      <p>
        Numbered references<Sidenote>Like this explanatory note that appears in the margin with automatic numbering.</Sidenote> appear in the margin.
      </p>
      <CodeBlock language="html">&lt;p&gt;
  Numbered references&lt;Sidenote&gt;
    Like this explanatory note that appears in the margin with automatic numbering.
  &lt;/Sidenote&gt; appear in the margin.
&lt;/p&gt;</CodeBlock>

      <h3>Margin Notes</h3>
      <p>
        Unnumbered notes<MarginNote>This margin note has no number and uses a symbol toggle on mobile.</MarginNote> use symbols.
      </p>
      <CodeBlock language="html">&lt;p&gt;
  Unnumbered notes&lt;MarginNote&gt;
    This margin note has no number and uses a symbol toggle on mobile.
  &lt;/MarginNote&gt; use symbols.
&lt;/p&gt;</CodeBlock>
    </Section>

    <Section>
      <h2>Figures</h2>

      <h3>Standard Figures</h3>
      <Figure 
        src="https://raw.githubusercontent.com/edwardtufte/tufte-css/gh-pages/img/exports-imports.png"
        alt="Exports and Imports to and from Denmark & Norway from 1700 to 1780"
      >
        From Edward Tufte, <em>Visual Display of Quantitative Information</em>, page 92.
      </Figure>
      <CodeBlock language="html">&lt;Figure src="/images/chart.png"&gt;
  From Edward Tufte, &lt;em&gt;Visual Display of Quantitative Information&lt;/em&gt;, page 92.
&lt;/Figure&gt;</CodeBlock>

      <h3>Full-Width Figures</h3>
      <FullWidthFigure 
        src="https://raw.githubusercontent.com/edwardtufte/tufte-css/gh-pages/img/napoleons-march.png"
        alt="Figurative map of the successive losses of the French Army in the Russian campaign, 1812-1813"
      >
        Napoleon's March visualization from Beautiful Evidence.
      </FullWidthFigure>
      <CodeBlock language="html">&lt;FullWidthFigure src="/images/wide-chart.png"&gt;
  Napoleon's March visualization from Beautiful Evidence.
&lt;/FullWidthFigure&gt;</CodeBlock>

      <h3>Margin Figures</h3>
      <p>
        Images in the margin. <MarginFigure 
          src="https://raw.githubusercontent.com/edwardtufte/tufte-css/gh-pages/img/rhino.png" 
          alt="Image of a Rhinoceros"
        >
          Dürer's rhinoceros from <em>Visual Explanations</em>.
        </MarginFigure> Good for supplementary visuals.
      </p>
      <CodeBlock language="html">&lt;p&gt;
  Images in the margin. &lt;MarginFigure src="/images/rhino.png"&gt;
    Dürer's rhinoceros from &lt;em&gt;Visual Explanations&lt;/em&gt;.
  &lt;/MarginFigure&gt; Good for supplementary visuals.
&lt;/p&gt;</CodeBlock>
    </Section>

    <Section>
      <h2>Quotes</h2>

      <h3>Epigraphs</h3>
      <Epigraph>
        <p>The commonality between science and art is in trying to see profoundly.</p>
        <template #footer>Edward Tufte</template>
      </Epigraph>
      <CodeBlock language="html">&lt;Epigraph&gt;
  &lt;p&gt;The commonality between science and art is in trying to see profoundly.&lt;/p&gt;
  &lt;template #footer&gt;Edward Tufte&lt;/template&gt;
&lt;/Epigraph&gt;</CodeBlock>
    </Section>

    <Section>
      <h2>Code</h2>

      <h3>Code Blocks</h3>
      
      <p>Configure languages and themes at plugin install:</p>
      <CodeBlock language="javascript">import VueTufte from 'vue-tufte'

// Custom Shiki configuration
app.use(VueTufte, {
  shiki: {
    langs: ['python', 'rust', 'go'],
    themes: ['dracula', 'github-light']
  }
})</CodeBlock>

      <p>Basic usage:</p>
      <CodeBlock language="html">&lt;CodeBlock language="javascript"&gt;
  // Your JavaScript code here
&lt;/CodeBlock&gt;</CodeBlock>
      
      <CodeBlock language="javascript">import { Article, Section, Sidenote } from 'vue-tufte'

export default {
  components: { Article, Section, Sidenote }
}</CodeBlock>

      <p>With different theme:</p>
      <CodeBlock language="html">&lt;CodeBlock language="javascript" theme="github-light"&gt;
  // JavaScript code with light theme
&lt;/CodeBlock&gt;</CodeBlock>

      <CodeBlock language="javascript" theme="github-light">import { Article, Section, Sidenote } from 'vue-tufte'

export default {
  components: { Article, Section, Sidenote }
}</CodeBlock>

      <p>See <a href="https://shiki.style/guide/install#fine-grained-bundle" target="_blank">Shiki docs</a> for all configuration options.</p>
    </Section>


  </Article>
</template>

<script setup lang="ts">
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

// Test template variable for multiline preservation
const gitCommands = `git init
git add .
git commit -m "initial commit"`

</script>