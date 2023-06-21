<template>
  <div class="homeBanner">
    <!-- 介紹與搜尋框 -->
    <div class="group introduce">
      <span>
        <p>輕鬆享受台北一日悠閒</p>
        <p>探索每個角落，體驗城市的深度旅遊行程</p>
        <form @submit.prevent="submit">
          <img
            alt="search"
            @click="submit"
            src="/imgs/search.jpg"
          />
          <input
            :value="message"
            @change="search"
            type="text"
            placeholder="請輸入"
          />
        </form>
      </span>
    </div>

    <!-- 中正紀念堂圖片 -->
    <div class="group background">
      <img alt="hamburg" src="/imgs/welcome.jpg" />
    </div>
  </div>
</template>

<script>
import { toRefs, reactive } from "vue";
export default {
  props: ["message"],
  emits: ["search", "submit"],
  setup(props, { emit }) {
    const data = reactive({
      msg: "",
    });

    const search = (e) => {
      emit("search", e.target.value);
    };

    const submit = () => {
      emit("submit");
    };

    return {
      props,
      ...toRefs(data),
      search,
      submit,
    };
  },
};
</script>

<style lang="scss">
.homeBanner {
  background: linear-gradient(135deg, #aaddee 0%, #66aabb 100%);
  height: 300px;
  display: flex;
  overflow: hidden;

  .group {
    width: 50%;
    height: 300px;
    display: flex;
    justify-content: center;

    span p {
      color: white;
      margin: 20px 0;
      user-select: none;
    }

    span {
      :nth-child(1) {
        font-size: 24px;
      }

      :nth-child(2) {
        font-size: 16px;
      }

      :nth-child(3) {
        margin-top: 10px;
        height: 30px;
        display: flex;

        img {
          cursor: pointer;
          user-select: none;
        }

        input {
          padding-left: 5px;
          outline: none;
          border: 1px solid rgb(128, 128, 128, 0.5);
        }
      }
    }
  }
  .introduce {
    align-items: center;
  }

  .background {
    align-items: flex-end;

    img {
      height: 120%;
    }
  }
}

@media (max-width: 800px) {
  .homeBanner {
    display: block;
    
    .group {
      width: 100%;
      z-index: 2;
      height: auto;
    }

    .introduce {
      align-items: baseline;
    }
    
    .background {
      z-index: 1;

      img {
        height: 180px;
      }
    }
  }
}
</style>
