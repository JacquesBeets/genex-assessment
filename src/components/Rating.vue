<template>
  <v-rating
    v-if="beer"
    v-model="calculatedRating"
    class="ma-2"
    density="compact"
    :readonly="readOnly"
  ></v-rating>
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="#f5f5f5"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  beer: {
    type: Object,
    required: true,
  },
  readOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const store = useStore();
const rating = ref(0);

const snackbar = ref(false);
const timeout = ref(2000);
const text = ref('');

const calculatedRating = computed({
  get: () => {
    if (props.readOnly) {
      return store.getters.getRatings[props.beer.id] || 0;
    } else {
      return rating.value;
    }
  },
  set: (value) => {
    rating.value = value;
    store.dispatch('createRating', { rating: value, id: props.beer.id });
  },
});

const timeoutWatcher = setTimeout(() => {
  watch(calculatedRating, (value) => {
    if (!props.readOnly) return;
    text.value = `${props.beer.name} now has ${Number(value).toFixed(1)} stars!`
    snackbar.value = true;
  });
}, 5000);


onBeforeUnmount(() => {
  clearTimeout(timeoutWatcher);
});
</script>
