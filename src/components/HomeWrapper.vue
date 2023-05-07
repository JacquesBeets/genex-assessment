<template>
  <v-row class="px-5 py-5">
    <BeerCard v-for="beer in beers" :beer="beer" />
  </v-row>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, onBeforeMount, ref } from 'vue';
import BeerCard from './BeerCard.vue';

const store = useStore();
const beers = computed(() => store.getters.getBeers);

const fetchBeers = async () => {
  try {
    await store.dispatch('fetchBeers');
  } catch (e) {
    console.error(e);
  }
};

onBeforeMount(() => {
  if (store.state.beers.length === 0) {
    fetchBeers();
  }
});
</script>

<style scoped>
.mainLayoutRight {
  position: relative;
}
.searchBar {
  position: sticky;
  top: 1%;
  z-index: 100;
}
.mainLayout {
  background-color: rgb(197, 162, 119);
}
</style>
