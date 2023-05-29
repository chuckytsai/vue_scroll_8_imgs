<template>
  <TemplateNav />
  <HomeBanner :message="searchWord" @search="search" @submit="submit" />
  <div class="homePage"></div>
</template>

<script>
import { onMounted, toRefs, reactive } from "vue";

import TemplateNav from "../../components/TemplateNav.vue";
import HomeBanner from "./HomeBanner.vue";

import { getData } from "../../api/PicData.js";

export default {
  components: {
    TemplateNav,
    HomeBanner,
  },
  setup() {
    const data = reactive({
      searchWord: "",
      cardAmount: 8,
      cardInformation: [],
    });

    const search = (value) => {
      data.searchWord = value;
    };

    const submit = () => {
      getInformation();
    };

    const getInformation = async () => {
      const result = await getData();

      if (result.status === 200) {
        const Arry = result.data.result.results.filter((item) => {
          return item.stitle.includes(data.searchWord);
        });
        data.cardInformation === Arry.slice(0, data.cardAmount);
        console.log(Arry.slice(0, data.cardAmount));
      } else console.log("無法連線");
    };

    onMounted(() => {
      getInformation();
    });

    return {
      ...toRefs(data),
      getInformation,
      search,
      submit,
    };
  },
};
</script>

<style lang="scss"></style>
