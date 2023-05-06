<template>
    <main class="login">
        <div class="login__container">
            <h1 class="login__title">Login</h1>
            <form class="login__form" @submit.prevent="login">
                <div class="login__form__group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="registerForm.email" />
                </div>
                <div class="login__form__group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="registerForm.password" />
                </div>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span v-if="!loading">LOGIN</span>
                    <span v-else>LOADING...</span>
                </button>
            </form>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const registerForm = ref({});
const loading = ref(false);


const login = async () => {
    try {
        loading.value = true;
        await store.dispatch("login", registerForm.value);
    }catch(e){
        console.error(e);
        loading.value = false;
    }
}

</script>