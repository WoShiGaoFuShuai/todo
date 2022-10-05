<template>
  <div class="content">
    <ul class="content-nav">
      <li>To Do</li>
      <li class="passive">|</li>
      <li>Done</li>
    </ul>
    <div class="content-tasks">
      <div
        v-for="todo in store.todos.value"
        :key="todo.id"
        class="content-task"
      >
        <div :class="['category', todo.category]"></div>
        <div class="deadline">
          <span>{{ todo.deadline }}</span>
        </div>
        <div class="text">
          <p class="text-title">{{ todo.title }}</p>
          <p class="text-description">
            {{ todo.description }}
          </p>
        </div>
        <div class="buttons">
          <img
            @click="handleEdit(todo)"
            src="@/assets/images/Edit.svg"
            alt=""
          />
          <img
            @click="handleDelete(todo)"
            src="@/assets/images/Delete.svg"
            alt=""
          />
        </div>
        <div :class="['priority', todo.priority]">
          <div class="img">
            <img src="@/assets/images/Apple.svg" alt="" />
            <span>{{ todo.estimation }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { db } from "@/firebase/config";
import { deleteDoc, doc } from "@firebase/firestore";

//COMPOSABLES & REFS
const store = useCounterStore();

const handleDelete = (todo) => {
  const todoRef = doc(db, "todos", todo.id);

  deleteDoc(todoRef);
};

const handleEdit = (todo) => {
  console.log(todo);
  console.log(todo.deadline);

  store.toggleModalEditTask();
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 34px;

  .content-nav {
    display: flex;
    justify-content: flex-end;

    li {
      font-family: "PT Sans", sans-serif;
      margin-left: 8px;
      color: var(--grey);
      font-size: 16px;
      font-weight: 400px;
      transition: all 0.5s ease;

      &:hover {
        cursor: pointer;
        color: #fff;
        transform: scale(1.1);
      }

      &:hover.passive {
        color: var(--grey);
        cursor: default;
        transform: none;
      }
    }
  }

  .content-tasks {
    .content-task {
      margin-top: 16px;
      display: flex;
      background-color: #fff;
      transition: all 0.4s ease;

      &:last-child {
        margin-bottom: 32px;
      }

      &:hover {
        transform: scale(1.006);
      }

      .category {
        min-width: 8px;
        background-color: var(--red);
      }

      .deadline {
        align-self: center;
        span {
          color: #9f9f9f;
          font-weight: 700;
          font-size: 11px;
          margin: 0 16px;
          text-transform: uppercase;
        }
      }

      .text {
        flex-grow: 1;
        padding: 14px 0;
        align-self: center;

        .text-title {
          font-size: 18px;
          color: #e74c3c;
          margin-bottom: 4px;
        }

        .text-description {
          font-size: 16px;
          color: #7f7f7f;
          font-weight: 400;
        }
      }

      .buttons {
        align-self: center;
        margin-right: 20px;
        min-width: 80px;

        img {
          margin-left: 20px;
          filter: brightness(0) saturate(100%) invert(95%) sepia(0%)
            saturate(107%) hue-rotate(161deg) brightness(86%) contrast(92%);
          transition: all 0.4s ease;

          &:hover {
            cursor: pointer;
            transform: scale(1.1);
            filter: brightness(0) saturate(100%) invert(67%) sepia(25%)
              saturate(288%) hue-rotate(164deg) brightness(93%) contrast(87%);
          }
        }
      }

      .priority {
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;

        .img {
          position: relative;

          img {
            margin: 20px;
          }

          span {
            font-family: "PT Sans", sans-serif;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 24px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
