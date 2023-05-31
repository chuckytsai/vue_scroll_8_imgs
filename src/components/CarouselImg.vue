<template>
  <div class="carouselImg">
    <div class="bannerImg">
      <ul
        class="carousel-banner"
        :style="{
          left: distance,
        }"
      >
        <li v-for="(item, i) in carouselArry" :key="i" class="imgs">
          <img :src="item" alt="景色圖片" />
        </li>
      </ul>
    </div>
    <div>
      <!-- 根據dot的index值 改變active點亮狀態 -->
      <ul class="dots">
        <li
          v-for="(item, i) in carouselArry"
          :key="item"
          class="dot"
          @click="clickMe(i)"
          :class="{ active: i === index }"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive } from "vue";

export default {
  props: ["carouselArry"], // 決定圖片數量清單
  setup() {
    const data = reactive({
      index: 0, // 顯示第幾個圖 預設為 0
      distance: "375px", //預設第一章圖片位置
    });

    // 點選dot 變化圖片
    const clickMe = (index) => {
      data.index = index;
      data.distance = (index - (index * 2 - 1)) * 375 + "px";
    };

    return {
      ...toRefs(data),
      clickMe,
    };
  },
};
</script>

<style lang="scss">
.bannerImg {
  width: 375px;
  height: 300px;
  position: relative;
  overflow: hidden;
  .carousel-banner {
    display: flex;
    position: absolute;
    width: 100vw;
    transform: translateX(-375px);
    transition: all 0s ease 0s, all 0s linear 0s, all  1s ease 0s;
    .imgs {
      list-style: none;
    }
    img {
      width: 375px;
      border-radius: 10px;
    }
  }
}

.dots {
  display: flex;
  justify-content: flex-start;
  padding-left: 3%;
  li {
    cursor: pointer;
    list-style: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(47, 77, 109);
    margin: 0 2%;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
}
</style>
