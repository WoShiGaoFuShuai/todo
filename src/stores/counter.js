import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  //STORE
  const user = ref(null);
  const modalAddTask = ref(false);

  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  //FUNCTIONS
  const currentUser = (payload) => {
    user.value = payload;
  };

  const toggleModalAddTask = () => {
    modalAddTask.value = !modalAddTask.value;
  };

  return {
    count,
    user,
    doubleCount,
    modalAddTask,
    increment,
    currentUser,
    toggleModalAddTask,
  };
});
