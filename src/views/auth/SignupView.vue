<template>
  <div class="auth">
    <form @submit.enter.prevent="handleSubmit">
      <h1>Sign up</h1>
      <input v-model="nickname" type="text" placeholder="nickname" required />
      <input v-model="email" type="email" placeholder="email" required />
      <input
        v-model="password"
        type="password"
        pattern=".{8,}"
        title="8 characters minimum"
        placeholder="password"
        required
      />
      <button v-if="!isPending">Sign up</button>
      <button v-else>Loading...</button>
      <div class="error" v-if="error">{{ error }}</div>
      <p class="text">
        Already have an account?
        <router-link class="link" :to="{ name: 'login' }">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import useSignup from "@/composables/useSignup.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";

//REFS
const nickname = ref("");
const email = ref("");
const password = ref("");

//COMPOSABLES
const { signup, error, isPending } = useSignup();
const router = useRouter();
const store = useCounterStore();

const handleSubmit = async () => {
  const res = await signup(nickname.value, email.value, password.value);

  if (!error.value) {
    console.log("RES IN SIGNUP", res);
    store.currentUser(res.user);
    //  currentUser
    router.push({ name: "home" });
  }
};
</script>

<style lang="scss">
.auth {
  display: flex;
  justify-content: center;

  form {
    width: 700px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 0px 15px 0px 15px;

    box-shadow: 0px 0px 20px 20px rgba(141, 165, 184, 0.3);
    transition: all 0.3s ease-out;

    &:hover {
      border-radius: 15px 0px 15px 0px;
      transform: scale(1.05);
      box-shadow: 0px 0px 20px 20px rgba(130, 199, 224, 0.3);
    }

    h1,
    .text {
      margin: 10px 0 30px 0;
      color: var(--grey-light);
      font-family: "PT Sans", sans-serif;
      font-weight: 700;
      text-shadow: 2px 2px 2px rgba(141, 165, 184, 0.7);
    }

    .text {
      text-shadow: 1px 2px 2px rgb(141 165 184 / 70%);
      text-align: center;
      &:hover {
        .link {
          color: rgb(130, 199, 224);
          font-size: 20px;
          text-decoration: underline;
        }
      }
      .link {
        display: block;
        transition: all 1s ease-out;
      }
    }

    input {
      padding: 10px;
      border-radius: 15px 0px 15px 0px;
      width: 90%;
      margin-bottom: 30px;
      color: rgb(130, 199, 224);
      outline: green;
      border: 1px solid rgb(141, 165, 184);
      box-shadow: 2px 1px 2px 2px rgba(141, 165, 184, 0.3);
      transition: all 0.3s ease-out;

      &:hover {
        background-color: rgb(130, 199, 224);
        border-radius: 0px 15px 0px 15px;
        transform: scale(1.05);
        color: white;
      }
    }

    button {
      padding: 12px;
      font-family: "PT Sans", sans-serif;
      font-weight: 700;
      border: none;
      border-radius: 15px 0px 15px 0px;
      background-color: rgb(141, 165, 184);
      box-shadow: 2px 1px 2px 2px rgba(141, 165, 184, 0.3);
      transition: all 0.3s ease-out;

      &:hover {
        cursor: pointer;
        background-color: rgb(130, 199, 224);
        border-radius: 0px 15px 0px 15px;
        transform: scale(1.05);
      }
    }

    .error {
      margin: 15px 0 5px;
      font-family: "PT Sans", sans-serif;
      font-weight: 700;
      color: var(--red);
      text-shadow: 1px 2px 2px rgb(141 165 184 / 70%);
    }
  }
}
</style>
