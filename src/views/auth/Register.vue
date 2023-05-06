<template>
    <main class="register">
        <div class="register__container">
            <h1 class="register__title">register</h1>
            <form class="register__form" @submit.prevent="register">
                <div class="register__form__group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="registerForm.email" required/>
                </div>
                <div class="register__form__group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="registerForm.password" required/>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span v-if="!loading">REGISTER</span>
                    <span v-else>REGISTERING...</span>
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

const register = async () => {
    try {
        loading.value = true;
        await store.dispatch("register", registerForm.value);
    }catch(e){
        console.error(e);
        loading.value = false;
    }
}
</script>