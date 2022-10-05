import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  //STORE
  const user = ref(null);
  const modalAddTask = ref(false);
  const todos = ref(null);

  const modalTitle = ref("Add Task");

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

  const toggleModalEditTask = () => {
    modalAddTask.value = !modalAddTask.value;
    changeModalTitle("Edit Task");
  };

  const changeModalTitle = (value) => {
    modalTitle.value = value;
  };

  const pushTodos = (data) => {
    todos.value = data;
  };

  return {
    count,
    user,
    doubleCount,
    modalAddTask,
    todos,
    modalTitle,
    increment,
    currentUser,
    toggleModalAddTask,
    toggleModalEditTask,
    changeModalTitle,
    pushTodos,
  };
});
