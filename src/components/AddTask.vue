<template>
  <div v-if="store.modalAddTask" class="modal-add-task wrapper">
    <div class="add-task">
      <form>
        <ul class="buttons">
          <li class="button-item">
            <img
              src="@/assets/images/Cancel-btn.svg"
              alt=""
              @click="store.toggleModalAddTask"
            />
          </li>
          <li class="button-item">
            <img src="@/assets/images/Agree-btn.svg" alt="" />
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
            />
          </fieldset>
          <fieldset>
            <label class="label-title" for="description">Description</label>
            <input
              class="input-text"
              id="description"
              type="text"
              placeholder="Add description here"
            />
          </fieldset>
          <fieldset class="radio category">
            <span class="label-wrapper">
              <span class="label-title">Category</span>

              <template v-for="(item, index) in category" :key="index">
                <label class="label-item">
                  <input
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
              class="input-text"
              id="deadline"
              type="text"
              placeholder="Add DEADLINE here"
            />
          </fieldset>

          <fieldset class="radio estimation">
            <span class="label-wrapper">
              <span class="label-title">Estimation</span>

              <label
                v-for="(item, index) in estimation"
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

              <template v-for="(item, index) in priority" :key="index">
                <label class="label-item">
                  <input
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

const store = useCounterStore();

const category = [
  {
    name: "Work",
    class: "orange",
  },
  { name: "Education", class: "blue" },
  { name: "Hobby", class: "pink" },
  { name: "Sport", class: "red" },
  { name: "Other", class: "aqua" },
];

const priority = [
  { name: "Urgent", class: "red" },
  { name: "High", class: "orange" },
  { name: "Middle", class: "yellow" },
  { name: "Low", class: "green" },
];

const estimation = [
  { name: 0, checked: true },
  { name: 1, checked: true },
  { name: 2, checked: true },
  { name: 3, checked: false },
  { name: 4, checked: false },
];
const handleClick = (index) => {
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
            color: #8da5b8;
          }
          :-moz-placeholder {
            color: #8da5b8;
            opacity: 1;
          }
          ::-moz-placeholder {
            color: #8da5b8;
            opacity: 1;
          }
          :-ms-input-placeholder {
            color: #8da5b8;
          }
          ::-ms-input-placeholder {
            color: #8da5b8;
          }

          ::placeholder {
            color: #8da5b8;
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
                  color: #82c7e0;
                }

                .fake.orange {
                  background-color: #ffb200;
                }

                .fake.blue {
                  background-color: #59abe3;
                }

                .fake.pink {
                  background-color: #b470d0;
                }

                .fake.red {
                  background-color: #e16c65;
                }

                .fake.aqua {
                  background-color: #00d4d9;
                }

                .fake.yellow {
                  background-color: #fddc43;
                }

                .fake.green {
                  background-color: #1abc9c;
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
                background-color: #8da5b8;
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
                background-color: #ffb202;
              }

              .radio:checked ~ .fake.blue {
                background-color: #59abe3;
              }

              .radio:checked ~ .fake.pink {
                background-color: #b470d0;
              }

              .radio:checked ~ .fake.red {
                background-color: #e16c65;
              }

              .radio:checked ~ .fake.aqua {
                background-color: #00d4d9;
              }

              .radio:checked ~ .fake.yellow {
                background-color: #fddc43;
              }

              .radio:checked ~ .fake.green {
                background-color: #1abc9c;
              }

              .text {
                margin-left: 8px;
                color: #8da5b8;
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
