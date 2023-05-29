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
  .cardBook {
    width: 80%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 50px;
    padding-bottom: 50px;
    li {
      width: 20%;
      list-style: none;
      margin: 5px 2.5%;
      cursor: pointer;
      div {
        width: 280px;
        height: 200px;
        overflow: hidden;
        border-radius: 10px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img {
          opacity: 0.9;
          height: 120%;
          width: 120%;
        }
      }
      p {
        width: 100%;
        color: rgb(100, 20, 20);
        font-size: 16px;
        font-weight: bold;
        word-wrap: break-word;
        padding-left: 5px;
        letter-spacing: 1.5px;
        margin-block-start: 0;
        margin-block-end: 0;
      }
    }
    li:hover img {
      opacity: 1;
    }
    li:hover p {
      color: black;
      padding-left: 5.5px;
    }
  }
}
</style>
