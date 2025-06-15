import { createApp } from 'vue'
import App from './App.vue'

import './stylesheets/default.css'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
