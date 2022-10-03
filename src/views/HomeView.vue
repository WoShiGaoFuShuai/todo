<template>
  <AddTask :title="textAdd" />
  <div class="home">
    <nav class="nav">
      <ul class="nav-ul">
        <template v-if="store.user">
          <li class="nav-username">Welcome, {{ store.user.displayName }}!</li>
          <li @click="handleClick">
            <img src="@/assets/images/Logout.svg" alt="" />
          </li>
          <li><img src="@/assets/images/Delete.svg" alt="" /></li>
          <li>
            <router-link :to="{ name: 'home' }">
              <img src="@/assets/images/Global List.svg" alt="" />
            </router-link>
          </li>
          <li><img src="@/assets/images/Statistics.svg" alt="" /></li>
          <li><img src="@/assets/images/Settings.svg" alt="" /></li>
        </template>
        <template v-if="!store.user">
          <router-link :to="{ name: 'login' }"
            ><li class="link">Login</li></router-link
          >
          <router-link :to="{ name: 'signup' }"
            ><li class="link">Signup</li></router-link
          >
        </template>
      </ul>
    </nav>
    <div class="main-title">
      <h1>Daily Task List</h1>
      <img src="@/assets/images/Plus.svg" alt="" @click="openAddTask" />
    </div>

    <TodoItems />

    <div class="global-list">
      <h2>Global list</h2>
      <img src="@/assets/images/Arrow-right.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { auth } from "@/firebase/config.js";
import { signOut } from "firebase/auth";
import getUser from "@/composables/getUser.js";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import AddTask from "@/components/AddTask.vue";
import TodoItems from "@/components/TodoItems.vue";
import getCollection from "@/composables/getCollection.js";

const textAdd = "AI SFASFA";

//COMPOSABLES
const store = useCounterStore();
const { user } = getUser();
const router = useRouter();
const { documents } = getCollection("todos");

store.pushTodos(documents);

//REFS

//FUNCTIONS
const handleClick = async () => {
  await signOut(auth);
  store.currentUser(user.value);
  router.push({ name: "login" });
};

const openAddTask = () => {
  store.toggleModalAddTask();
};

//HOOKS
onMounted(async () => {
  store.currentUser(auth.currentUser);
});
</script>

<style lang="scss" scoped>
.home {
  .router-link-exact-active {
    img {
      filter: brightness(0) saturate(100%) invert(100%) sepia(5%) saturate(1%)
        hue-rotate(37deg) brightness(105%) contrast(100%);
    }
  }

  .nav-ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    li {
      margin-left: 32px;

      img {
        transition: all 0.2s ease-in;
      }

      &:hover {
        img {
          cursor: pointer;
          transform: scale(1.05);
          filter: brightness(0) saturate(100%) invert(100%) sepia(5%)
            saturate(1%) hue-rotate(37deg) brightness(105%) contrast(100%);
        }
      }
    }

    .nav-username {
      margin-left: 0;
      margin-right: auto;
      color: var(--grey);
    }

    .link,
    .btn {
      background-color: var(--grey);
      padding: 8px 10px;
      border-radius: 10px 0px 10px 0px;
      transition: all 0.3s ease;

      &:hover {
        cursor: pointer;
        background-color: var(--grey-light);
        border-radius: 0px 10px 0px 10px;
      }
    }

    .btn {
      padding: 5px 8px;
    }
  }

  .main-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;

    h1 {
      cursor: pointer;
      letter-spacing: 0.7px;
      font-size: 28px;
      margin-right: 16px;
    }

    img {
      cursor: pointer;
      transition: all 0.5s ease-in-out;
      &:hover {
        transform: scale(1.3) rotate(90deg);
      }
    }
  }

  .global-list {
    display: inline-flex;
    align-items: center;

    &:hover {
      cursor: pointer;

      h2 {
        color: var(--grey-light);
      }

      img {
        filter: brightness(0) saturate(100%) invert(69%) sepia(82%)
          saturate(195%) hue-rotate(153deg) brightness(94%) contrast(86%);
      }
    }

    h2 {
      font-family: "PT Sans", sans-serif;
      color: var(--grey);
      font-weight: 700;
      font-size: 20px;
      margin-right: 16px;
    }
  }
}
</style>
