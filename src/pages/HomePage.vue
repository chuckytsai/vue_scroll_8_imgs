<template>
  <div
    v-on:scroll="scrollable"
    :style="{
      height: '100vh',
      overflowY: 'scroll',
    }"
  >
    <HomeBanner :message="searchWord" @search="search" @submit="submit" />
    <HomeCards :cardInformation="cardInformation" />
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from "vue";
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
    const data = reactive({
      searchWord: "", //搜尋關鍵字
      cardAmount: 8, //預設8個卡片
      cardInformation: [""], //8個卡片的api資訊儲存
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
      if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
        data.cardAmount = data.cardAmount + 8;
        getInformation();
      }
    };

    // 呼叫卡片資訊(以8個為基礎)
    const getInformation = async () => {
      const result = await getData();

      if (result.status === 200) {
        const Arry = result.data.result.results.filter((item) => {
          return item.stitle.includes(data.searchWord);
        });
        // loading 呼叫
        store.commit("loadingState", true);

        data.cardInformation = Arry.slice(0, data.cardAmount);
        // loading 取消
        store.commit("loadingState", false);
      } else {
        console.log("無法連線");
      }
    };

    onMounted(() => {
      getInformation();
    });

    return {
      ...toRefs(data),
      getInformation,
      search,
      submit,
      scrollable,
    };
  },
};
</script>

<style lang="scss"></style>
