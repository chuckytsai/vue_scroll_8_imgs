<template>
  <div class="idPage">
    <p v-text="information.stitle"></p>
    <p v-text="information.address"></p>
    <p v-text="information.info"></p>
    <p v-text="information.xbody"></p>
    <div>
      <img
        v-for="(item, i) in carouselArry"
        :key="i"
        :src="item"
        alt="景色圖片"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from "vue";
import { useRouter } from "vue-router";

import { getData } from "../api/PicData.js";

export default {
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

      // window.location.pathname的最後一個數字判斷是否有這個資料
      // 如果沒有則返回前一頁
      if (result.status === 200 && result.data.result.results.length > PageId) {
        const results = result.data.result.results;
        const ImgUrl = results[PageId - 1].file.split("http://");
        data.information = results[PageId - 1];

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

<style>
.idPage {
}
</style>
