<template>
  <div
    class="audio-format"
    @drop.prevent="handleDrop($event)"
    @dragover.prevent="handleDragover"
    @dragenter.prevent="handleDragover"
  >
    <Commonality v-show="!ahide" @btnFile="btnFile" @btnFolder="btnFolder" />
    <CommonFormat v-show="ahide" @btnFile="btnFile" @btnFolder="btnFolder" />
    <Footer v-show="ahide" />
  </div>
</template>
<script>
import Commonality from "../../components/commonality";
import CommonFormat from "../../components/CommonFormat";
import Footer from "../../components/footer";
import { mapState, mapMutations } from "vuex";
import { selectFile, selecFolder } from "../../assets/js/choice";
import gather from "../../assets/js/gather";
import { files }  from "../../assets/js/file";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["audio_format", "formatAudio"]),
    ahide() {
      if (this.audio_format.length > 0) {
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
      selectFile(gather.audio_accept, this.audio_format, "audio");
    },
    btnFolder() {
      selecFolder(gather.audio_accept, this.audio_format, "audio");
    },
    handleDrop(e) {
      files(e, gather.audio_accept, this.audio_format, "audio");
    },
    handleDragover() {},
    handleDragover() {},
  },
};
</script>
<style lang="scss" scoped>
.audio-format {
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 10px;
}
</style>