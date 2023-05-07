<template>
  <v-toolbar rounded elevation="5">
    <v-btn icon @click="router.push('/')" v-if="showBackButton">
      <v-icon>mdi-arrow-left-bold</v-icon>
    </v-btn>
    <v-toolbar-title class="desktopView">
      <h4 class="text-start">
        Beer Meets Food
        <small class="d-block text-white">Pair Food with Beer!</small>
      </h4>
    </v-toolbar-title>
    <v-toolbar-title class="mobileView">
      <h4 class="text-start">
        BMF
      </h4>
    </v-toolbar-title>

    <v-autocomplete
      clearable
      v-model="select"
      v-model:search="search"
      :loading="loading"
      :items="foodItems"
      @click:clear="clearSearch"
      class="mx-4"
      variant="solo-filled"
      density="compact"
      hide-no-data
      hide-details
      label="Your Favourite Food?"
      style="max-width: 500px"
      v-if="!showBackButton"
    ></v-autocomplete>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const loading = ref(false);


const search = computed({
  get: () => store.state.searchQuery,
  set: (value) => {
    store.commit('SET_SEARCH_QUERY', value);
    if(value === '') {
      store.dispatch('fetchBeers');
    }
    if(value !== "") {
      searchForBeers(value)
    }
  },
})

const select = computed({
  get: () => store.state.selectedSearchQuery,
  set: (value) => {
    store.commit('SET_SELECTED_SEARCH_QUERY', value);
  },
})

const showBackButton = computed(
  () => router.currentRoute.value.name !== 'home'
);

const foodItems = computed(() => {
  let foodItemsArray = [];
  let foodItemsUnique = [];
  store.getters.getBeers.forEach((beer) => {
    beer.food_pairing.forEach((food) => {
      foodItemsArray.push(food);
    });
  });

  new Set(foodItemsArray).forEach((item) => {
    foodItemsUnique.push(item);
  });

  return foodItemsUnique;
});

const searchForBeers = async (searchVal) => {
  try {
    loading.value = true;
    await store.dispatch('fetchBeersByFoodPairing', searchVal);
    loading.value = false;
  } catch (e) {
    console.error(e);
    loading.value = false;
  }
};

const clearSearch = () => {
  console.log("clearing search")
  store.commit('SET_SEARCH_QUERY', "");
  store.commit('SET_SELECTED_SEARCH_QUERY', "");
  select.value = null;
};

const logout = async () => {
  try {
    await store.dispatch('logout');
  } catch (e) {
    console.log(e);
  }
};

// watch(search, (value) => {
//   if (value !== '') {
//     searchForBeers(value);
//   }
// });
</script>

<style scoped>
.desktopView {
  display: none;
}

.mobileView {
  display: block;
}

@media (min-width: 768px) {
  .desktopView {
    display: block;
  }
  .mobileView {
    display: none;
  }
}

@media (min-width: 768px) {
  .desktopView {
    display: block;
  }
}
</style>
