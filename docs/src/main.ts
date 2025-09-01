import { createApp } from 'vue'
import VueTufte from '../../src/index'
import App from './App.vue'

const app = createApp(App)
app.use(VueTufte) // No configuration needed! Languages and themes loaded dynamically
app.mount('#app')