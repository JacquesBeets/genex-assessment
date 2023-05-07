<template>
  <v-row class="px-5 py-10 mt-5">
      <v-col cols="12" md="6" class="imageCol ">
        <div class="backgrounCircle">&nbsp;</div>
        <img
          :src="beerInfo.image_url"
          :alt="beerInfo.name"
          class="h-full drop-shadow-2xl"
        />
      </v-col>
      <v-col cols="12" md="6" class="px-10 infoCol">
        <div class="">
          <h1 class="mb-5 text-start">
            {{ beerInfo.name }}
            <small class="tagline text-xs">{{ beerInfo.tagline }}</small>
          </h1>
          <p>{{ beerInfo.description }}</p>

          <h5 class="mt-5 text-start">Food Pairings</h5>
          <ul class="ml-3">
            <li v-for="food in beerInfo.food_pairing">
              <small>{{ food }}</small>
            </li>
          </ul>
          <h5 class="mt-5 text-start">What do you think?</h5>
          <Rating :beer="beerInfo" :readOnly="false"/>
        </div>
      </v-col>
    </v-row>
  <v-sheet class="wrapper" v-if="beerInfo">

  </v-sheet>
</template>

<script setup>
import Rating from './Rating.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

defineProps({
  beerInfo: {
    type: Object,
  },
});

onMounted(() => {
  store.commit('SET_SEARCH_QUERY', "");
  store.commit('SET_SELECTED_SEARCH_QUERY', "");
});
</script>

<style scoped>
.wrapper {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1rem;
}
.v-row {
  position: relative;
  height: 70vh;
}
.backgrounCircle {
  position: absolute;
  background-color: #fff;
  height: 80%;
  width: 80%;
  border-radius: 50%;
  filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
  opacity: 0.6;
}
.v-col {
  position: relative;
  color: black;
  height: 100%;
  padding: 1rem;
}
.infoCol {
  color: black;
  z-index: 2;
}
.imageCol {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
}
img {
  position: relative;
  height: 70vh;
  z-index: 1;
}
.tagline {
  font-size: 0.8rem;
  color: black;
  display: block;
  font-family: 'Roboto', sans-serif;
  line-height: 1;
}
</style>
