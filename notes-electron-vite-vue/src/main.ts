import { createApp } from 'vue'
import App from './App.vue'

import './stylesheets/default.css'

import clickOutside from './directives/v-click-outside';

const app = createApp(App);


app.directive('click-outside', clickOutside);
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  });
