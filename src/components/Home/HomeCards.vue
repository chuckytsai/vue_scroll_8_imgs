<template>
  <div class="homeCard">
    <div class="cardBook">
      <li v-for="(item, i) in cardInformation" :key="i">123</li>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cardInformation"],
  setup(props) {

    console.log(props);
    return {
      props,
    };
  },
};
</script>

<style lang="scss">
.homeCard {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
