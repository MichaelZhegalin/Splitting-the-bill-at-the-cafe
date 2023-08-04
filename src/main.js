import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import './assets/style.scss'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(bootstrap)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')


