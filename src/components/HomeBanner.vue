<template>
  <div :class="$style.banner">
    <div>
      <input />
    </div>
    <div>
      <img alt="hamburg" src="../../public/imgs/welcome.jpg" />
    </div>
  </div>
</template>

<script></script>

<style lang="scss" module>
.banner {
  width: 100%;
  background-color: rgb(195, 219, 235);
  height: 300px;
  display: flex;
  div {
    width: 50%;
    height: 100%;
    img {
      height: 80%;
    }
  }
}
</style>
