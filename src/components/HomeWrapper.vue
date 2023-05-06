<template>
    <div class="columns-3 h-full overflow-auto">
        <BeerCard v-for="beer in beers" :beer="beer" :key="beer.id" />
    </div>
</template>


<script setup>
import { useStore } from 'vuex';
import { computed, onBeforeMount } from 'vue';
import BeerCard from './BeerCard.vue';
const store = useStore();
const beers = computed(() => store.getters.getBeers);

const fetchBeers = async () => {
    try {
        await store.dispatch("fetchBeers");
    }catch(e){
        console.log(e);
    }
}

onBeforeMount(()=>{
    if(store.state.beers.length === 0){
        fetchBeers();
    }
})

</script>