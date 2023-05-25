<template>
  <nav :class="$style.title">
    <p v-text="title"></p>
    <!-- <img alt="hamburg" src="../../public/imgs/hamburg.png" /> -->
  </nav>
</template>

<script>
export default {
  data: function () {
    return {
      title: "My Web",
    };
  },
};
</script>

<style lang="scss" module>
.title {
  justify-content: space-between;
  display: flex;
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  background: linear-gradient(
    to right,
    rgb(198, 201, 243) 0%,
    rgb(105, 150, 201) 100%
  );
  p {
    font-size: 16px;
    font-family: "Noto Sans";
  }
}
</style>
