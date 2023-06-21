<template>
  <div
    v-on:scroll="scrollable"
    :style="{
      height: '100vh',
      overflowY: 'scroll',
    }"
  >
    <HomeBanner :message="searchWord" @search="search" @submit="submit" />
    <HomeCards :cardInformation="cardInformation" :boxMath="boxMath" />
  </div>
</template>

<script>
import { onMounted, toRefs, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import HomeBanner from "../components/Home/HomeBanner.vue";
import HomeCards from "../components/Home/HomeCards.vue";

import { getData } from "../api/PicData.js";

export default {
  components: {
    HomeBanner,
    HomeCards,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      searchWord: "", //搜尋關鍵字
      cardAmount: 8, //預設8個卡片
      cardInformation: [], //8個卡片的api資訊儲存
    });

    // 8個圖片為一組,作為錨點使用
    const boxMath = computed(() => {
      return Math.ceil(data.cardInformation.length / 8);
    });

    // 搜尋ICON按下  關鍵字送出
    const search = (value) => {
      data.cardAmount = 8;
      data.searchWord = value;
    };

    // 搜尋關鍵字送出
    const submit = () => {
      data.cardAmount = 8;
      getInformation();
    };

    // 計算視窗卷軸快拉到底 再呼叫8個卡片
    const scrollable = (even) => {
      const el = even.target;
      // const Amount = data.cardAmount / 8;
      // const log = (el.scrollHeight - el.scrollTop) / el.clientHeight;
      if (
        Math.ceil(el.scrollTop) + el.clientHeight >= el.scrollHeight &&
        store.state.loading === false
      ) {
        router.replace("/#" + data.cardAmount / 8);
        store.commit("loadingState", true);
        data.cardAmount = data.cardAmount + 8;
        getInformation();
      }
      // else{
      //   console.log( Math.ceil(el.scrollTop) , el.clientHeight , el.scrollHeight);
      // }

      // else if (Amount - log > 0 && Amount - log < 0.5) {
      //   router.replace("/#1");
      // } else if (Amount - log > 0) {
      //   router.replace("/#" + Math.round(Amount - log));
      // }
    };

    // 呼叫卡片資訊(以8個為基礎)
    const getInformation = async () => {
      const result = await getData();
      if (result.status === 200) {
        const Arry = result.data.result.results.filter((item) => {
          return item.stitle.includes(data.searchWord);
        });
        data.cardInformation = Arry.slice(0, data.cardAmount);
        store.commit("loadingState", false);
      } else {
        console.log("無法連線");
        store.commit("loadingState", false);
      }
    };

    onMounted(() => {
      store.commit("loadingState", true);
      getInformation();
    });

    return {
      ...toRefs(data),
      boxMath,
      getInformation,
      search,
      submit,
      scrollable,
    };
  },
};
</script>

<style lang="scss"></style>
