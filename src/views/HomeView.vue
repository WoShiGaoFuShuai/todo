<template>
  <div class="home">
    <nav class="nav">
      <ul class="nav-ul">
        <li><img src="@/assets/images/Delete.svg" alt="" /></li>
        <li>
          <router-link :to="{ name: 'home' }">
            <img src="@/assets/images/Global List.svg" alt="" />
          </router-link>
        </li>
        <li><img src="@/assets/images/Statistics.svg" alt="" /></li>
        <li><img src="@/assets/images/Settings.svg" alt="" /></li>
      </ul>
    </nav>
    <div class="main-title">
      <h1>Daily Task List</h1>
      <img src="@/assets/images/Plus.svg" alt="" />
    </div>

    <div class="content">
      <ul class="content-nav">
        <li>To Do</li>
        <li class="passive">|</li>
        <li>Done</li>
      </ul>
      <div class="content-tasks">
        <div class="content-task">
          <div class="category"></div>
          <div class="deadline">
            <span>Deadline</span>
          </div>
          <div class="text">
            <p class="text-title">Lorem ipsum sit amet</p>
            <p class="text-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </p>
          </div>
          <div class="buttons">
            <img src="@/assets/images/Edit.svg" alt="" />
            <img src="@/assets/images/Delete.svg" alt="" />
          </div>
          <div class="priority">
            <div class="img">
              <img src="@/assets/images/Apple.svg" alt="" />
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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

  .content {
    margin-top: 34px;

    .content-nav {
      display: flex;
      justify-content: flex-end;

      li {
        font-family: "PT Sans", sans-serif;
        margin-left: 8px;
        color: #8da5b8;
        font-size: 16px;
        font-weight: 400px;
        transition: all 0.5s ease;

        &:hover {
          cursor: pointer;
          color: #fff;
          transform: scale(1.1);
        }

        &:hover.passive {
          color: #8da5b8;
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

        .category {
          min-width: 8px;
          background-color: pink;
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
}
</style>
