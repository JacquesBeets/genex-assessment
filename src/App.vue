<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper" v-if="store.state.user.auth">
      <nav >
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <a @click="logout">Sign Out</a>
      </nav>
    </div>
  </header>

  <!-- show routed views -->
  <RouterView class="overflow-hidden h-full"/>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from 'vuex';
import { onBeforeMount } from 'vue';
import HelloWorld from './components/HelloWorld.vue'

  export default {
    name:"app",
    components: {
      HelloWorld,
      RouterLink,
      RouterView
    },
    setup(){
      const store = useStore();

      const logout = async () => {
        try {
          await store.dispatch("logout");
        }catch(e){
          console.log(e);
        }
      }


      onBeforeMount(()=>{
        store.dispatch("fetchUser");
      })


      return {store, logout}
    },
  }
</script>


