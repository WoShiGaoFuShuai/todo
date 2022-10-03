<template>
  <div
    v-if="store.modalAddTask"
    class="modal-add-task wrapper"
    @click="handleCancel"
  >
    <div class="add-task" @click.stop="">
      <form @submit="handleSubmit">
        <ul class="buttons">
          <li class="button-item">
            <img
              src="@/assets/images/Cancel-btn.svg"
              alt=""
              @click.stop="handleCancel"
            />
          </li>
          <li class="button-item">
            <img
              @click="handleSubmit"
              src="@/assets/images/Agree-btn.svg"
              alt=""
            />
          </li>
        </ul>
        <h2>Add Task</h2>
        <div class="content">
          <fieldset>
            <label class="label-title" for="title">Title</label>
            <input
              class="input-text"
              id="title"
              type="text"
              placeholder="Add title here"
              v-model="title"
              required
            />
          </fieldset>
          <fieldset>
            <label class="label-title" for="description">Description</label>
            <input
              class="input-text"
              id="description"
              type="text"
              placeholder="Add description here"
              v-model="description"
              required
            />
          </fieldset>
          <fieldset class="radio category">
            <span class="label-wrapper">
              <span class="label-title">Category</span>

              <template v-for="(item, index) in categoryArray" :key="index">
                <label class="label-item">
                  <input
                    v-model="category"
                    :value="item.value"
                    class="radio"
                    type="radio"
                    name="category"
                    :checked="index === 2"
                  />
                  <span :class="['fake', item.class]"></span>
                  <span class="text">{{ item.name }}</span>
                </label>
              </template>
            </span>
          </fieldset>
          <fieldset>
            <label class="label-title" for="deadline"> Deadline </label>
            <input
              v-model="deadline"
              class="input-text"
              id="deadline"
              type="text"
              placeholder="Add DEADLINE here"
              required
            />
          </fieldset>

          <fieldset class="radio estimation">
            <span class="label-wrapper">
              <span class="label-title">Estimation</span>

              <label
                v-for="(item, index) in estimationArray"
                :key="index"
                class="label-item estimation"
              >
                <input
                  @click="handleClick(index)"
                  class="radio"
                  type="checkbox"
                  :checked="item.checked"
                />
                <span class="fake estimation"></span>
              </label>
            </span>
          </fieldset>

          <fieldset class="radio priority">
            <span class="label-wrapper">
              <span class="label-title">Priority</span>

              <template v-for="(item, index) in priorityArray" :key="index">
                <label class="label-item">
                  <input
                    v-model="priority"
                    :value="item.value"
                    class="radio"
                    type="radio"
                    name="priority"
                    :checked="index === 1"
                  />
                  <span :class="['fake', item.class]"></span>
                  <span class="text">{{ item.name }}</span>
                </label>
              </template>
            </span>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { ref } from "vue";

const props = defineProps({
  title: String,
});

console.log(props.title);

const store = useCounterStore();

// REFS
const title = ref("");
const description = ref("");
const category = ref("hobby");
const deadline = ref("");
const estimation = ref(3);
const priority = ref("high");

const categoryArray = [
  {
    name: "Work",
    class: "orange",
    value: "work",
  },
  { name: "Education", class: "blue", value: "education" },
  { name: "Hobby", class: "pink", value: "hobby" },
  { name: "Sport", class: "red", value: "sport" },
  { name: "Other", class: "aqua", value: "other" },
];

const priorityArray = [
  { name: "Urgent", class: "red", value: "urgent" },
  { name: "High", class: "orange", value: "high" },
  { name: "Middle", class: "yellow", value: "middle" },
  { name: "Low", class: "green", value: "low" },
];

const estimationArray = [
  { name: 0, checked: true },
  { name: 1, checked: true },
  { name: 2, checked: true },
  { name: 3, checked: false },
  { name: 4, checked: false },
];

//FUNCTIONS

const handleClick = (index) => {
  estimation.value = index + 1;
  console.log(estimation.value);
  const allCheckboxes = document.querySelectorAll(
    ".label-item.estimation input"
  );

  for (let i = 0; i < allCheckboxes.length; i++) {
    if (i <= index) {
      allCheckboxes[i].checked = true;
    } else {
      allCheckboxes[i].checked = false;
    }
  }
};

const handleSubmit = async () => {
  const colRef = collection(db, "todos");

  store.toggleModalAddTask();

  await addDoc(colRef, {
    title: title.value,
    description: description.value,
    category: category.value,
    deadline: deadline.value,
    estimation: estimation.value,
    priority: priority.value,
  });

  clearInputs();
};

const handleCancel = () => {
  console.log("123");
  store.toggleModalAddTask();
  clearInputs();
};

const clearInputs = () => {
  title.value = "";
  description.value = "";
  category.value = "hobby";
  deadline.value = "";
  estimation.value = 3;
  priority.value = "high";
};
</script>

<style lang="scss" scoped>
* {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #fff;
  font-size: 14px;
}

.modal-add-task {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .add-task {
    background-color: #2a3f50;
    z-index: 101;
    padding: 20px;
    max-width: 520px;
    margin: 0 auto;
    border-radius: 0px 15px 0px 15px;

    box-shadow: 0px 0px 20px 20px rgba(141, 165, 184, 0.3);
    transition: all 0.3s ease-out;

    &:hover {
      border-radius: 15px 0px 15px 0px;
      transform: scale(1.01);
      box-shadow: 0px 0px 20px 20px rgba(130, 199, 224, 0.3);
    }

    form {
      .buttons {
        display: flex;
        justify-content: flex-end;

        .button-item {
          margin-left: 16px;

          &:hover {
            cursor: pointer;
            filter: brightness(0) saturate(100%) invert(81%) sepia(29%)
              saturate(806%) hue-rotate(165deg) brightness(93%) contrast(87%);
          }
        }
      }

      h2 {
        text-align: center;
        margin-bottom: 24px;
        font-weight: 700;
        font-size: 28px;
        letter-spacing: 1.5px;
      }

      .content {
        padding: 0 28px;

        fieldset {
          border: none;
          border-bottom: 1px solid #425869;
          margin-bottom: 32px;

          .label-title {
            text-transform: uppercase;
            margin-bottom: 12px;
            display: block;
            line-height: 16px;
          }

          .input-text {
            font-size: 16px;
            width: 100%;
            line-height: 20px;
            background: transparent;
            border: none;
            line-height: 20px;
            outline: none;
            margin-bottom: 8px;
          }

          ::-webkit-input-placeholder {
            color: var(--grey);
          }
          :-moz-placeholder {
            color: var(--grey);
            opacity: 1;
          }
          ::-moz-placeholder {
            color: var(--grey);
            opacity: 1;
          }
          :-ms-input-placeholder {
            color: var(--grey);
          }
          ::-ms-input-placeholder {
            color: var(--grey);
          }

          ::placeholder {
            color: var(--grey);
          }
        }

        .radio {
          .label-wrapper {
            display: inline-block;
            margin-bottom: 8px;

            .label-item {
              margin-left: 16px;

              &.estimation {
                margin-left: 8px;
              }

              &:hover {
                cursor: pointer;

                .text {
                  color: var(--grey-light);
                }

                .fake.orange {
                  background-color: var(--orange);
                }

                .fake.blue {
                  background-color: var(--blue);
                }

                .fake.pink {
                  background-color: var(--purple);
                }

                .fake.red {
                  background-color: var(--red);
                }

                .fake.aqua {
                  background-color: var(--aqua);
                }

                .fake.yellow {
                  background-color: var(--yellow);
                }

                .fake.green {
                  background-color: var(--green);
                }
              }

              &:nth-of-type(1) {
                margin-left: 0;
              }

              .radio {
                display: none;
              }

              .fake {
                display: inline-block;
                width: 16px;
                height: 16px;
                position: relative;
                background-color: var(--grey);
                border-radius: 50%;

                &.estimation {
                  background: url("@/assets/images/Estimation-null.svg")
                    no-repeat;
                  width: 20px;
                  height: 20px;
                }

                &::before,
                &.estimation::before {
                  content: "";
                  position: absolute;
                  display: block;
                  width: 10px;
                  height: 10px;
                  background-color: inherit;
                  width: 3px;
                  height: 3px;
                  border-radius: 50%;
                  border: 2.6px solid #2a3f50;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  opacity: 0;
                  transition: 0.2s ease;
                }

                &.estimation::before {
                  background: url("@/assets/images/Estimation-full.svg")
                    no-repeat;
                  width: 20px;
                  height: 20px;
                  border-radius: none;
                  border: none;
                  transition: 0.5s ease;
                }
              }

              .radio:checked + .fake::before,
              .radio:checked + .fake.estimation::before {
                opacity: 1;
              }

              .radio:checked ~ .text {
                color: #fff;
              }

              .radio:checked ~ .fake.orange {
                background-color: var(--orange);
              }

              .radio:checked ~ .fake.blue {
                background-color: var(--blue);
              }

              .radio:checked ~ .fake.pink {
                background-color: var(--purple);
              }

              .radio:checked ~ .fake.red {
                background-color: var(--red);
              }

              .radio:checked ~ .fake.aqua {
                background-color: var(--aqua);
              }

              .radio:checked ~ .fake.yellow {
                background-color: var(--yellow);
              }

              .radio:checked ~ .fake.green {
                background-color: var(--green);
              }

              .text {
                margin-left: 8px;
                color: var(--grey);
                font-weight: 400px;
                line-height: 20px;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
