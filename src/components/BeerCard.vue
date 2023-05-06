<template>
    <RouterLink :to="`/beer/${beer.id}`" class="card mb-5 h-32 flex shadow-lg bg-black  overflow-hidden cursor-pointer rounded-md" >
        <div class="h-full  p-2 w-1/4  flex justify-center items-center bg-white boxShadow">
            <img :src="beer.image_url" :alt="beer.name" class="h-full"/>
        </div>

        <div class="text-white p-3 w-3/4 self-end  pointer-events-none">
            <h4 class="leading-3">{{ beer.name }}</h4>
            <small class="opacity-70 italic">{{ beer.tagline }}</small>
        </div>
    </RouterLink>
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    defineProps({
        beer: {
            type: Object,
            required: true
        }
    })
</script>