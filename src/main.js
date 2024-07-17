// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// import './assets/main.css'

// const app = createApp(App)

// app.use(router)

// app.mount('#app')

// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';

// const app = createApp(App);

// app.use(router);
// app.use(Vuetify);

// app.mount('#app');

// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App)
  .use(router)
  .mount('#app');

