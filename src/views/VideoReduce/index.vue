<template>
  <div
    class="vider-reduce"
    @drop.prevent="handleDrop($event)"
    @dragover.prevent="handleDragover"
    @dragenter.prevent="handleDragover"
  >
    <Commonality v-show="!rhide" @btnFile="btnFile" @btnFolder="btnFolder" />
    <CommonFormat v-show="rhide" @btnFile="btnFile" @btnFolder="btnFolder" />
    <Footer v-show="rhide" />
  </div>
</template>
<script>
import Commonality from "../../components/commonality";
import CommonFormat from "../../components/CommonFormat";
import Footer from "../../components/footer";
import gather from "../../assets/js/gather";
import { selectFile, selecFolder } from "../../assets/js/choice";
import { files } from "../../assets/js/file";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["video_reduce"]),
    rhide() {
      if (this.video_reduce.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  components: {
    Commonality,
    CommonFormat,
    Footer,
  },
  methods: {
    btnFile() {
      selectFile(gather.video_accept, this.video_reduce, "reduce");
    },
    btnFolder() {
      selecFolder(gather.video_accept, this.video_reduce, "reduce");
    },
    handleDrop() {},
    handleDragover() {},
    handleDragover() {},
  },
};
</script>
<style lang="scss" scoped>
.vider-reduce {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
</style>