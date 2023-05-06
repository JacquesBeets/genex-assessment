<template>
  <v-layout class="mainLayout">
    <v-navigation-drawer permanent theme="dark">
      <h2 class="pt-2 pb-2">Beer Meets Food</h2>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-city"
          size="x-small"
          title="Home"
          value="home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          size="x-small"
          title="My Account"
          value="account"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="Users"
          value="users"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main theme="dark" class="mainLayoutRight">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { useStore } from 'vuex';
import { onBeforeMount, computed, ref } from 'vue';

export default {
  name: 'app',
  components: {
    RouterLink,
    RouterView,
  },
  setup() {
    const store = useStore();

    const logout = async () => {
      try {
        await store.dispatch('logout');
      } catch (e) {
        console.log(e);
      }
    };

    const search = ref('');

    const searchQuery = computed({
      get: () => store.state.searchQuery,
      set: (value) => store.commit('SET_SEARCH_QUERY', value),
    });

    const beers = computed(() =>
      store.getters.getBeers.map((beer) => beer.name)
    );

    onBeforeMount(() => {
      store.dispatch('fetchUser');
    });

    return { store, logout, searchQuery, beers, search };
  },
};
</script>

<style scoped>
.mainLayoutRight {
  position: relative;
}

.mainLayout {
  background-color: rgb(197, 162, 119);
}
</style>
