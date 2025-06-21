import { createApp } from 'vue'
import App from './App.vue'

import './stylesheets/default.scss'

import clickOutside from './directives/v-click-outside';
import vFocus from './directives/v-focus';

const app = createApp(App);


app.directive('click-outside', clickOutside);
app.directive('focus', vFocus);

app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  });
