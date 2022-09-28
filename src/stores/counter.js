import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  //STORE
  const count = ref(0);
  const user = ref(null);

  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  //FUNCTIONS
  const currentUser = (payload) => {
    user.value = payload;
  };

  return { count, user, doubleCount, increment, currentUser };
});
