import { createApp } from 'vue'
import App from './App.vue'

import './stylesheets/default.css'

const app = createApp(App);


app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  });
