<template>
  <div class="idPage">idPage</div>
</template>

<script>
import router from "@/router";
import { onMounted, toRefs, reactive } from "vue";

import { getData } from "../api/PicData.js";

export default {
  setup() {
    const PageId = window.location.pathname.split("/")[2];
    const data = reactive({
      id: PageId,
      information: {},
    });

    const getInformation = async () => {
      const result = await getData();

      if (result.status === 200 && result.data.result.results.length > PageId) {
        data.information = result.data.result.results[PageId - 1];
        console.log("num" + PageId, data.information);
      } else {
        router.push("/");
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
