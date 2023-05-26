<template>
  <TemplateNav />
  <HomeBanner />
  <div class="homePage">
    
  </div>
</template>

<script>
import { onMounted } from "vue";
import TemplateNav from "../../components/TemplateNav.vue";
import HomeBanner from "./HomeBanner.vue";

import { getData } from "../../api/PicData.js";

export default {
  components: {
    TemplateNav,
    HomeBanner,
  },
  setup() {
    const getInformation = () => {
      getData();
    };

    onMounted(() => {
      getInformation();
    });

    return {
      getInformation,
    };
  },
};
</script>

<style lang="scss"></style>
