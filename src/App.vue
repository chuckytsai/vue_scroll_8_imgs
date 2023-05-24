<template>
  <TemplateNav />
</template>

<script>
import TemplateNav from "./components/TemplateNav.vue";

export default {
  name: "App",
  components: {
    TemplateNav,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  background-color: black;
}
</style>
