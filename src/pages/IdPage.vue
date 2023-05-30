<template>
  <div class="idPage">idPage</div>
</template>

<script>
import { onMounted, toRefs, reactive } from "vue";

export default {
  components: {},
  setup() {
    const data = reactive({
   
    });

    onMounted(() => {
      console.log("Id", window.location.pathname);
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
