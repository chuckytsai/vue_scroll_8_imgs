<template>
  <div class="homeCard">
    <div class="cardBook" :id="i" v-for="i in boxMath" :key="i">
      <li v-for="(item, j) in arry[i - 1]" :key="j">
        <div @click="goPage(item.RowNumber)">
          <img
            v-if="item.file"
            :src="'http://' + item.file.split('http://')[1]"
            alt="景點圖片"
            loading="lazy"
          />
        </div>
        <p>{{ item.stitle }}</p>
      </li>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { toRefs, reactive, watch, onMounted } from "vue";

export default {
  props: ["cardInformation", "boxMath"],
  setup(props) {
    const router = useRouter();
    const data = reactive({
      arry: [],
    });

    // 獲取最多8個為一組的圖片與資訊
    const getBoxsInfo = () => {
      const itemsArr = []; // 個別卡片資訊
      const cardInformation = props.cardInformation; // api全部的卡片資訊
      const boxMath = props.boxMath; // 錨點區域
      const itemAmount = Math.floor(cardInformation.length / boxMath); // 計算每組顯示幾張卡片

      // 分別有錨點或是無錨點計算卡片顯示
      for (let i = 0; i < itemAmount; i++) {
        itemsArr.push(cardInformation[(boxMath - 1) * 8 + i]);
      }
      data.arry.push(itemsArr);
    };

    // 點入該地點的個別網址
    const goPage = (val) => {
      router.push("/attraction/" + val);
    };

    watch(
      () => props.cardInformation,
      () => {
        getBoxsInfo();
      }
    );

    // 開啟網頁先重置卡片資訊
    onMounted(() => {
      data.arry = [];
    });

    return {
      ...toRefs(data),
      getBoxsInfo,
      goPage,
    };
  },
};
</script>

<style lang="scss">
.homeCard {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2.5% 0;

  .cardBook {
    width: 80%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    li {
      width: 20%;
      list-style: none;
      margin: 5px 2.5%;

      div {
        width: 280px;
        height: 200px;
        overflow: hidden;
        border-radius: 10px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: flex-end;

        img {
          opacity: 0.9;
          height: 120%;
          width: 120%;
        }
      }

      p {
        width: 100%;
        color: rgb(100, 20, 20);
        font-size: 14px;
        font-weight: bold;
        word-wrap: break-word;
        padding-left: 5px;
        letter-spacing: 1px;
        margin-block-start: 0;
        margin-block-end: 0;
      }
    }

    li:hover img {
      opacity: 1;
    }

    li:hover p {
      color: black;
      padding-left: 5.5px;
    }
  }
}

@media (max-width: 820px) {
  .homeCard {
    .cardBook {
      width: 100%;
      justify-content: space-around;

      li {
        width: 40%;

        div {
          width: 100%;
          height: 80%;
          margin-bottom: 1px;
        }
      }
    }
  }
}
</style>
