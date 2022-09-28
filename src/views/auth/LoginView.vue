<template>
  <div class="auth">
    <form @submit.enter.prevent="handleSubmit">
      <h1>Login</h1>
      <input type="email" placeholder="email" required />
      <input type="password" placeholder="password" required />
      <button>Sign up</button>
      <p class="text">
        Don't have an account yet?
        <router-link class="link" :to="{ name: 'signup' }">Sign up</router-link>
      </p>
    </form>
  </div>
</template>

<script setup></script>

<style></style>
