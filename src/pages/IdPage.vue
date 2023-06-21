<template>
  <div class="idPage">
    <p v-text="information.stitle" class="title"></p>
    <p class="information">地點 : {{ information.address }}</p>
    <p class="information">交通資訊 : {{ information.info }}</p>
    <p class="information">介紹 :</p>
    <p v-text="information.xbody" class="information story"></p>
    <div class="carousel">
      <CarouselImg :carouselArry="carouselArry" />
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from "vue";
import { useRouter } from "vue-router";

import CarouselImg from "../components/CarouselImg.vue";

import { getData } from "../api/PicData.js";

export default {
  components: {
    CarouselImg,
  },
  // window.location.pathname的最後一個數字判斷是否有這個資料
  setup() {
    const router = useRouter();
    const PageId = window.location.pathname.split("/")[2];
    const data = reactive({
      id: PageId,
      information: {},
      carouselArry: [],
    });

    const getInformation = async () => {
      const result = await getData();
      const results = result.data.result.results.filter((item) => {
          return item.RowNumber === PageId;
        });

      // 如果沒有則返回前一頁
      if (result.status === 200 && results.length > 0) {
        const ImgUrl = results[0].file.split("http://");
        data.information = results[0];

        for (let x = 0; x < ImgUrl.length; x++) {
          // 切割出來空白&非圖片格式剃除
          if (
            ImgUrl[x].length > 0 &&
            (ImgUrl[x].split(".jpg").length === 2 ||
              ImgUrl[x].split(".JPG").length === 2 ||
              ImgUrl[x].split(".png").length === 2 ||
              ImgUrl[x].split(".PNG").length === 2)
          ) {
            data.carouselArry.push("http://" + ImgUrl[x]);
          }
        }
      } else {
        router.go(-1);
      }
    };

    onMounted(() => {
      getInformation();
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss">
.idPage {
  .title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #66aabb;
  }

  .information {
    width: 75%;
    margin: 10px auto;
    font-size: 14px;
  }

  .story {
    height: 75px;
    overflow-y: auto;
    text-indent: 2em;
    letter-spacing: 1px;
    padding: 5px 3px;
  }
  .story::-webkit-scrollbar {
    width: 7px;
  }

  .story::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
  }

  .story::-webkit-scrollbar-thumb {
    background-color: rgb(31, 37, 71);
    border: 1px solid rgb(47, 77, 109);
  }
  .carousel {
    margin-top: 70px;
    display: flex;
    justify-content: center;
  }
}
</style>
