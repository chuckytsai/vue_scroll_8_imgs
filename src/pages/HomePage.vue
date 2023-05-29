<template>
  <TemplateNav />
  <HomeBanner :message="searchWord" @search="search" @submit="submit" />
  <HomeCards :cardInformation="cardInformation" />
  <div class="homePage"></div>
</template>

<script>
import { onMounted, toRefs, reactive } from "vue";

import TemplateNav from "../components/TemplateNav.vue";
import HomeBanner from "../components/Home/HomeBanner.vue";
import HomeCards from "../components/Home/HomeCards.vue";

import { getData } from "../api/PicData.js";

export default {
  components: {
    TemplateNav,
    HomeBanner,
    HomeCards,
  },
  setup() {
    const data = reactive({
      searchWord: "",
      cardAmount: 8,
      cardInformation: [""],
    });

    const search = (value) => {
      data.cardAmount = 8;
      data.searchWord = value;
    };

    const submit = () => {
      data.cardAmount = 8;
      getInformation();
    };

    window.addEventListener("scroll", () => {
      // const scrollable =
      //   document.documentElement.scrollHeight - window.innerHeight;
      // const scrolled = window.scrollY;
      // if (scrollable - scrolled < 20) {
      //   data.cardAmount = data.cardAmount + 8;
      // }
      getInformation();
    });

    const getInformation = async () => {
      const result = await getData();

      if (result.status === 200) {
        const Arry = result.data.result.results.filter((item) => {
          return item.stitle.includes(data.searchWord);
        });
        data.cardInformation = Arry.slice(0, 8);
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
    };
  },
};
</script>

<style lang="scss"></style>
