import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { isAuthenticated } from './authentication/auth.js'
import { createPinia } from 'pinia'
import vClickOutside from "click-outside-vue3"

const pinia = createPinia()


router.beforeEach((to, from, next) => {
  if(to.meta.needsAuth){
    if(!isAuthenticated()){
      next('/')
    }
    else{
      next()
    }
  }
  else{
    if(isAuthenticated()){
      next('/home')
    }
    else{
      next()
    }
  }
  
})

createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .use(vClickOutside)
  .mount('#app')
