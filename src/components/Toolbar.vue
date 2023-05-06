<template>
  <v-toolbar rounded elevation="5">
    <v-toolbar-title
      ><h4 class="text-start text-white opacity-80">
        Search for your favourite food ~<small class="d-block"
          >And we will pair beers with it ~</small
        >
      </h4></v-toolbar-title
    >

    <v-autocomplete
      clearable
      v-model="select"
      v-model:search="search"
      :loading="loading"
      :items="foodItems"
      class="mx-4"
      variant="solo-filled"
      density="compact"
      hide-no-data
      hide-details
      label="Your Favourite Food?"
      style="max-width: 500px"
    ></v-autocomplete>

    <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
  </v-toolbar>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const search = ref('');
const select = ref(null);
const loading = ref(false);

const foodItems = computed(() => {
  let foodItemsArray = [];
  let foodItemsUnique = [];
  store.getters.getBeers.forEach((beer) => {
    beer.food_pairing.forEach((food) => {
      foodItemsArray.push(food);
    });
  });

  new Set(foodItemsArray).forEach(item => {
    foodItemsUnique.push(item)
  });

return foodItemsUnique;
});

const searchForBeers = async (searchVal) => {
  try {
    loading.value = true;
    await store.dispatch(
      'fetchBeersByFoodPairing',
      searchVal
    );
    loading.value = false;
  } catch (e) {
    console.error(e);
    loading.value = false;
  }
};

watch(search, (value) => {
    if(value !== ''){
        searchForBeers(value)
    }

    // value && value !== select.value && searchForBeers(value);
    // if( && (select.value === null || select.value === "")) return store.dispatch('fetchBeers');
    // searchForBeers(value);
});
</script>
