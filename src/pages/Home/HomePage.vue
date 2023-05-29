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
    });

    const search = (value) => {
        data.searchWord = value;
    };

    const submit = () => {
      console.log("data", data.searchWord);
    };

    const getInformation = () => {
      getData();
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
