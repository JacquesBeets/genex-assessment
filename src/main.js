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
        colors: {
            // background: "#272727",
            // surface: "#000000",
            // primary: "#000000",
            // "primary-darken-1": "#000000",
            // secondary: "#000000",
            // "secondary-darken-1": "#000000",
            // error: "#000000",
            // info: "#000000",
            // success: "#000000",
            // warning: "#000000",
          },
    },
    components,
    directives,
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)


app.mount('#app')
