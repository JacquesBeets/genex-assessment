<template>
  <v-layout class="mainLayout">
    <v-main theme="dark" class="mainLayoutRight">
      <div class="px-5 py-5 searchBar" v-if="userLoggedIn">
        <SearchBar class="" />
      </div>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onBeforeMount, computed, ref } from 'vue';
import SearchBar from './components/SearchBar.vue';

export default {
  name: 'app',
  components: {
    RouterLink,
    RouterView,
    SearchBar
  },
  setup() {
    const store = useStore();
    const router = useRouter();


    const userLoggedIn = computed(() => store.getters.getUserLoggedIn);

    const beers = computed(() =>
      store.getters.getBeers.map((beer) => beer.name)
    );

    onBeforeMount(() => {
      store.dispatch('fetchUser');
      store.dispatch('fetchRatings');
    });

    return { store, beers, userLoggedIn, router };
  },
};
</script>

<style scoped>
.mainLayout {
  background-color: rgb(197, 162, 119);
  height: 100%;
  position: relative;
}

.searchBar {
  position: sticky;
  top: 1%;
  z-index: 100;
}
</style>
