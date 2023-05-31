<template>
  <div class="carouselImg">
    <div class="bannerControl">
      <button type="button" @click="directionControl(false)">
        <img
          src="../../public/imgs/arrow.png"
          alt="左按鈕"
          style="transform: rotate(180deg)"
        />
      </button>
      <div class="bannerImg">
        <ul
          class="carouselBanner"
          :style="{
            left: distance,
            transition: speed,
          }"
        >
          <li v-for="(item, i) in imgAmt" :key="i" class="imgs">
            <img :src="item" alt="景色圖片" />
          </li>
        </ul>
      </div>
      <button type="button" @click="directionControl(true)">
        <img src="../../public/imgs/arrow.png" alt="右按鈕" />
      </button>
    </div>
    <div>
      <!-- 根據dot的index值 改變active點亮狀態 -->
      <ul class="dots">
        <li v-for="(item, i) in carouselArry" :key="item">
          <button
            class="dot"
            @click="clickMe(i)"
            :class="{ active: i === index }"
          ></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive } from "vue";

export default {
  props: ["carouselArry"], // 決定圖片數量清單
  setup(props) {
    const data = reactive({
      imgAmt: props.carouselArry,
      index: 0, // 顯示第幾個圖 預設為 0
      distance: "375px", //預設第一章圖片位置
      speed: "all 0s linear 0s, all 1s ease 0s",
    });

    // 點選dot 變化圖片
    const clickMe = (index) => {
      data.index = index;
      data.distance = (index - (index * 2 - 1)) * 375 + "px";
    };

    // 點選左右邊按鈕 變化圖片以及dot
    const directionControl = (direction) => {
      // direction布林值(左邊:false, 右邊:true)
      data.speed = "all 0s linear 0s, all 1s ease 0s";
      if (direction === true && data.index < data.imgAmt.length - 1) {
        clickMe(data.index + 1);
      } else if (direction === true && data.index === data.imgAmt.length - 1) {
        data.imgAmt = [];
        data.imgAmt.push(...props.carouselArry, props.carouselArry[0]);
        data.index = 0;
        data.distance =
          (data.imgAmt.length - 1 - ((data.imgAmt.length - 1) * 2 - 1)) * 375 +
          "px";
        setTimeout(() => {
          data.speed = "all 0s linear 0s, all 0s ease 0s";
          data.distance = "375px";
          data.imgAmt = props.carouselArry;
        }, 1000);
      } else if (direction === false && data.index !== 0) {
        clickMe(data.index - 1);
      } else if (direction === false && data.index === 0) {
        clickMe(props.carouselArry.length - 1);
      }
    };

    return {
      props,
      ...toRefs(data),
      clickMe,
      directionControl,
    };
  },
};
</script>

<style lang="scss">
.carouselImg {
  .bannerControl {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: 45px;
      height: 30px;
      border-radius: 10px;
      border: none;
      z-index: 1;
      margin: 0 -22.5px;
      background-color: transparent;
      img {
        opacity: 0.9;
      }
    }
    button:active img {
      opacity: 1;
    }
  }
  .bannerImg {
    width: 375px;
    height: 280px;
    position: relative;
    overflow: hidden;
    .carouselBanner {
      display: flex;
      position: absolute;
      width: 100vw;
      transform: translateX(-375px);
      .imgs {
        list-style: none;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      img {
        width: 375px;
        height: 280px;
        border-radius: 10px;
      }
    }
  }

  .dots {
    display: flex;
    justify-content: flex-start;
    padding-left: 1%;
    li {
      list-style: none;
      margin: 10px 2%;
    }
    button {
      width: 20px;
      height: 20px;
      background-color: rgb(47, 77, 109);
      opacity: 0.5;
      border-radius: 50%;
      color: white;
    }
    .active {
      opacity: 1;
    }
  }
}
</style>
