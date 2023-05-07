<template>
  <v-col cols="12" xs="12" sm="6" md="4" lg="4">
    <v-card class="card">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div class="titleContainer">
          <v-card-title class="text-h5 pb-0 title">
            {{ beer.name }}
          </v-card-title>

          <v-card-subtitle>{{ beer.tagline }}</v-card-subtitle>
          <Rating :beer="beer" :readOnly="true" />
          <v-card-actions>
            <v-btn variant="text" @click="routeToBeer(beer.id)">VIEW</v-btn>
          </v-card-actions>
        </div>

        <v-avatar class="avatar ma-3" size="125">
          <div class="circle">&nbsp;</div>
          <v-img :src="beer.image_url" :alt="beer.name"></v-img>
        </v-avatar>
      </div>
    </v-card>
  </v-col>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Rating from './Rating.vue';

defineProps({
  beer: {
    type: Object,
    required: true,
  },
});

const route = useRouter();
const store = useStore();

// route to beer details page
const routeToBeer = (beerID) => {
  route.push(`/beer/${beerID}`);
  store.commit('SET_BEERS', []);
};
</script>

<style scoped>
.card {
  background: rgb(4, 20, 20);
  background: linear-gradient(
    52deg,
    rgba(4, 20, 20, 0.5746673669467788) 57%,
    rgba(255, 112, 67, 1) 100%
  );
}

.titleContainer {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
}

.avatar {
  position: relative;
}

.circle {
  clip-path: circle(50% at 50% 50%);
  background-color: white;
  position: absolute;
  width: 75%;
  height: 75%;
}
</style>
