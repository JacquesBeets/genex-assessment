import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/global'

// Vuetify
import 'vuetify/styles'
import 'vuetify/dist/vuetify.css';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


// CSS
import './assets/main.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
    },
    components,
    directives,
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)


app.mount('#app')
