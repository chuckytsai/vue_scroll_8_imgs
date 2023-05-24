<template>
  <TemplateNav />
  <HomeBanner />
</template>

<script>
import TemplateNav from "./components/TemplateNav.vue";
import HomeBanner from "./components/HomeBanner.vue";

export default {
  name: "App",
  components: {
    TemplateNav,
    HomeBanner,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
