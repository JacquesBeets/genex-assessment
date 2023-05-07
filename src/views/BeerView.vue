<template>
  <BeerInfo :beerInfo="beer" />
</template>

<script setup>
import BeerInfo from '../components/BeerInfo.vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
import { computed, onBeforeMount } from 'vue';

const store = useStore();
const route = useRoute();

const beerId = computed(() => route.params.id);
const beer = computed(() => store.state.beerInfo);

const fetchBeerById = () => {
  store.dispatch("fetchBeerById", beerId.value);
}

store.commit("SET_BEER_INFO", {})

onBeforeMount(()=>{
    fetchBeerById();
})

</script>