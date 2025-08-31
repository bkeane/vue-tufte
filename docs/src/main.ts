import { createApp } from 'vue'
import VueTufte from '../../src/index'
import App from './App.vue'

const app = createApp(App)
app.use(VueTufte, {
    shiki: {
        langs: ['javascript'],
        themes: ['nord', 'github-light']
    }
})
app.mount('#app')