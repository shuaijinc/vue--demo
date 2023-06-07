<template>
  <div
    class="video-Audio"
    @drop.prevent="handleDrop($event)"
    @dragover.prevent="handleDragover"
    @dragenter.prevent="handleDragover"
  >
    <Commonality v-show="!vahide" @btnFile="btnFile" @btnFolder="btnFolder" />
    <CommonFormat v-show="vahide" @btnFile="btnFile" @btnFolder="btnFolder" />
    <Footer v-show="vahide" />
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
    ...mapState(["double_format", "formatDouble"]),
    vahide() {
      if (this.double_format.length > 0) {
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
    ...mapMutations(["setDouble"]),
    btnFile() {
      selectFile(gather.video_accept, this.double_format, "double");
    },
    btnFolder() {
      selecFolder(gather.video_accept, this.double_format, "double");
    },
    handleDrop(e) {
      files(e, gather.video_accept, this.double_format, "double");
    },
    handleDragover() {},
    handleDragover() {},
  },
};
</script>
<style lang="scss" scoped>
.video-Audio {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
</style>
