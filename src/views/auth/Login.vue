<template>
  <div class="authContainer">
    <div class="formContainer">
      <h1>Beer Meets Food</h1>
      <v-sheet
        width="400"
        class="mx-auto px-5 py-5"
        theme="dark"
        rounded
        elevation="5"
      >
        <v-container>
          <v-form @submit.prevent="login">
            <h5 class="mb-5">LOGIN</h5>
            <v-text-field
              v-model="loginForm.email"
              label="Email"
              type="email"
              variant="solo-filled"
              density="compact"
              elevation="0"
              required
            ></v-text-field>
            <v-text-field
              v-model="loginForm.password"
              density="compact"
              label="Password"
              type="password"
              variant="solo-filled"
              elevation="0"
              required
            ></v-text-field>
            <v-btn
              type="submit"
              block
              class="mt-2"
              elevation="0"
              color="grey-darken-3"
              :loading="loading"
              :disabled="loading"
              >Submit</v-btn
            >
          </v-form>
          <p>
            Don't have an account?
            <RouterLink to="/register">Register here.</RouterLink>
          </p>
        </v-container>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';

const store = useStore();

const loginForm = ref({});
const loading = ref(false);

const login = async () => {
  try {
    loading.value = true;
    await store.dispatch('login', loginForm.value);
  } catch (e) {
    console.error(e);
    loading.value = false;
  }
};
</script>

<style scoped>
.authContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #272727;
  padding: 2rem;
}

p {
  text-align: center;
  margin-top: 1rem;
}
</style>
