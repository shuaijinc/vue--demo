<template>
  <div
    class="vider-format"
    @drop.prevent="handleDrop($event)"
    @dragover.prevent="handleDragover"
    @dragenter.prevent="handleDragover"
  >
    <Commonality v-show="!vhide" @btnFile="btnFile" @btnFolder="btnFolder" />
    <CommonFormat v-show="vhide" @btnFile="btnFile" @btnFolder="btnFolder" />
    <Footer v-show="vhide" />
  </div>
</template>
<script>
import Commonality from "../../components/commonality";
import CommonFormat from "../../components/CommonFormat";
import Footer from "../../components/footer";
import gather from "../../assets/js/gather";
import { selectFile, selecFolder } from "../../assets/js/choice";
import { files }  from "../../assets/js/file";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["video_format", "formatVideo"]),
    vhide() {
      if (this.video_format.length > 0) {
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
    ...mapMutations(["setVideo"]),
    btnFile() {
      selectFile(gather.video_accept, this.video_format, "video");
    },
    btnFolder() {
      selecFolder(gather.video_accept, this.video_format, "video");
    },
    handleDrop(e) {
      files(e,gather.video_accept,this.video_format,"video")
    },
    handleDragover() {},
    handleDragover() {},
  },
};
</script>
<style lang="scss" scoped>
.vider-format {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
</style>
