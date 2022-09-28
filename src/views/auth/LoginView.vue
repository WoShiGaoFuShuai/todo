<template>
  <div class="auth">
    <form @submit.enter.prevent="handleSubmit">
      <h1>Login</h1>
      <input type="email" v-model="email" placeholder="email" required />
      <input
        type="password"
        v-model="password"
        placeholder="password"
        required
      />
      <button v-if="!isPending">Log in</button>
      <button v-else>Loading...</button>
      <div v-if="error" class="error">{{ error }}</div>
      <p class="text">
        Don't have an account yet?
        <router-link class="link" :to="{ name: 'signup' }">Signup</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import useLogin from "@/composables/useLogin.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

//COMPOSABLES
const { login, error, isPending } = useLogin();
const router = useRouter();

//REFS
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  await login(email.value, password.value);
  if (!error.value) {
    router.push({ name: "home" });
  }
};
</script>

<style></style>
