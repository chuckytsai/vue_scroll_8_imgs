<template>
  <div class="homeCard">
    <div class="cardBook">
      <li v-for="(item, i) in cardInformation" :key="i">
        <div>
          <img
            v-if="item.file"
            :src="'http://' + item.file.split('http://')[1]"
            alt="景點圖片"
          />
        </div>
        <p>{{ item.stitle }}</p>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cardInformation"],
};
</script>

<style lang="scss">
.homeCard {
  width: 100%;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    to bottom,
    rgb(198, 201, 243, 0.5) 0%,
    rgb(105, 185, 243, 0.3) 100%
  );
  .cardBook {
    width: 80%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 50px;
    padding-bottom: 50px;
    li {
      width: 20%;
      list-style: none;
      margin: 5px 2.5%;
      cursor: pointer;
      opacity: 0.9;
      div {
        height: 220px;
        overflow: hidden;
        border-radius: 10px;
        margin-bottom: 5px;
        img {
          height: 100%;
        }
      }
      p {
        width: 100%;
        color: black;
        font-size: 16px;
        font-weight: bold;
        word-wrap: break-word;
        padding-left: 5px;
        letter-spacing: 1.5px;
        margin-block-start: 0;
        margin-block-end: 0;
      }
    }
    li:hover {
      opacity: 1;
    }
  }
}
</style>
