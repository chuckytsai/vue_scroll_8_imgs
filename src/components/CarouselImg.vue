<template>
  <div class="carouselImg">
    <div class="bannerControl">
      <button
        type="button"
        @click="directionControl(false)"
        :disabled="dotActive !== index"
      >
        <img
          src="/imgs/arrow.png"
          alt="左按鈕"
          style="transform: rotate(180deg)"
        />
      </button>
      <div class="bannerImg">
        <!-- 第一張要轉回 用假元素顯示倒數第二張畫面-->
        <ul
          v-if="index === -1"
          class="carouselBanner"
          :style="{ animation: 'shake ' + speed + 's' }"
        >
          <li class="imgs">
            <img :src="virtual" alt="虛擬圖片"/>
          </li>
        </ul>
        <ul
          v-on:transitionend="move"
          class="carouselBanner"
          :style="{
            left: distance,
            transition: speed + 's',
          }"
        >
          <li v-for="(item, i) in list" :key="i" class="imgs">
            <img :src="item" alt="景色圖片" loading="lazy"/>
          </li>
        </ul>
      </div>
      <button
        type="button"
        @click="directionControl(true)"
        :disabled="dotActive !== index"
      >
        <img src="/imgs/arrow.png" alt="右按鈕" />
      </button>
    </div>
    <div>
      <!-- 根據dot的index值 改變active點亮狀態 -->
      <ul class="dots">
        <li v-for="(item, i) in carouselArry" :key="item">
          <button
            class="dot"
            :disabled="dotActive !== index"
            @click="clickMe(i)"
            :class="{ active: i === dotActive }"
          ></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, computed } from "vue";

export default {
  props: ["carouselArry"], // 決定圖片數量清單
  setup(props) {
    const data = reactive({
      index: 0, // 顯示第幾個圖 預設為 0
      speed: 2, // 圖片轉動速度
    });

    // dot按鈕亮燈狀態
    const dotActive = computed(() => {
      if (data.index === props.carouselArry.length) {
        return 0;
      } else if (data.index === -1) {
        return props.carouselArry.length - 1;
      }
      return data.index;
    });

    // 計算整個圖片清單移動距離
    const distance = computed(() => {
      return data.index * -375 + "px";
    });

    // 圖片清單(起始為api資料最後一張 , 最後一張圖為api資料第一張)
    const list = computed(() => {
      if (props.carouselArry.length < 3) {
        return props.carouselArry;
      }
      return [
        props.carouselArry[props.carouselArry.length - 1],
        ...props.carouselArry,
        props.carouselArry[0],
        props.carouselArry[1],
      ];
    });

    // 倒數第二個用假元素塞圖片
    const virtual = computed(() => {
      return props.carouselArry[props.carouselArry.length - 2];
    });

    // 點選dot 變化圖片
    const clickMe = (index) => {
      const length = props.carouselArry.length;
      if (length > 3) {
        if (index === 0 && dotActive.value === length - 1) {
          data.index = length;
        } else if (index === length - 1 && dotActive.value === 0) {
          data.index = -1;
        } else {
          data.index = index;
        }
      }
    };

    // 點選左右邊按鈕 變化圖片以及dot
    // direction布林值(左邊:false, 右邊:true)
    const directionControl = (direction) => {
      const imgAmt = props.carouselArry;
      if (imgAmt.length > 3) {
        if (direction === true && data.index < imgAmt.length) {
          data.index = data.index + 1;
        } else if (direction === false && data.index >= 0) {
          data.index = data.index - 1;
        }
      }
    };

    // 頭尾圖片返回效果
    const move = (e) => {
      const length = props.carouselArry.length;
      if (data.index === length && dotActive.value === 0) {
        data.speed = 0;
        clickMe(0);
      } else if (data.index === -1 && dotActive.value === length - 1) {
        data.speed = 0;
        clickMe(length - 1);
      }

      setTimeout(() => {
        data.speed = e.elapsedTime;
      }, 0);
    };

    return {
      props,
      ...toRefs(data),
      dotActive,
      list,
      virtual,
      distance,
      move,
      clickMe,
      directionControl,
    };
  },
};
</script>

<style lang="scss">
.carouselImg {
  width: 1050px;
  overflow: hidden;

  button {
    cursor: pointer;
  }

  .bannerControl {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      width: 45px;
      height: 30px;
      border: none;
      z-index: 1;
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
    // overflow: hidden;

    .carouselBanner {
      display: flex;
      position: absolute;
      transform: translateX(-375px);

      .imgs {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(128, 128, 128, 0.1);
        width: 373px;
        height: 278px;
        overflow: hidden;
        border: 1px solid rgb(159, 192, 209);

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    @keyframes shake {
      0% {
        transform: translateX(-750px);
      }

      100% {
        transform: translateX(-375px);
      }
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    padding-top: 0.5rem;

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
