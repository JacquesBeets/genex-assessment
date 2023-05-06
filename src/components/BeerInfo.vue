<template>
    <div class="wrapper overflow-auto bg-slate-900" v-if="beerInfo">
        <div class="beerImageContainer h-64 w-64 relative flex justify-center items-center" >
            <div class="circle bg-white w-1/2 h-1/2 absolute rounded-full mt-10">&nbsp;</div>
            <img :src="beerInfo.image_url" :alt="beerInfo.name" class="h-full drop-shadow-2xl"/>
        </div>
        <div class="col-span-4">
            <h1 class="text-4 ">{{ beerInfo.name }}</h1>
            <p>{{ beerInfo.description }}</p>
        </div>        
    </div>
</template>

<script setup>
    defineProps({
        beerInfo: {
            type: Object
        }
    })
</script>