
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';


// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia()
const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(pinia)

app.mount('#app')


