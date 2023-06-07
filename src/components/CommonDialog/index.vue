<template>
  <div class="dialog" v-show="showhide">
    <el-dialog
      title="温馨提示"
      :visible.sync="showhide"
      :before-close="handleClose"
      :close-on-click-modal="false"
      top="35vh"
    >
      <span>{{ tips }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click.stop="handleClose"
          v-if="
            tips.indexOf('清空列表') > -1 ||
            tips.indexOf('结束当前工作进程') > -1
          "
          >取 消</el-button
        >
        <el-button type="primary" @click.stop="empty(tips)">
          <span v-if="tips.indexOf('清空列表') > -1">清 空</span>
          <span v-else>确 定</span>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
const { ipcRenderer } = window.require("electron");
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["video_format", "audio_format", "showhide", "tips"]),
    routePath() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapMutations(["setVideo", "setAudio", "setShowhide", "setFeedback","setDouble","setReduce"]),
    empty(e) {
      this.handleClose();
      if (e.indexOf("清空列表") > -1) {
        if (this.routePath === "/") {
          this.setVideo([]);
        } else if (this.routePath === "/audioformat") {
          this.setAudio([]);
        } else if (this.routePath === "/videoaudio") {
          this.setDouble([])
        } else if (this.routePath === "/videoreduce") {
          this.setReduce([])
        }
      } else if (e.indexOf("结束当前工作进程") > -1) {
        ipcRenderer.send("close");
      } else if (e.indexOf("会员") > -1) {
        this.setFeedback(true);
      }
    },
    enlarge() {
      this.hide = true;
    },
    handleClose() {
      this.setShowhide(false);
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  /deep/ .el-dialog {
    width: 350px;
    height: 160px;
    border-radius: 10px;
    .el-dialog__header {
      padding: 10px 20px;
      text-align: left;
      .el-dialog__title {
        font-size: 14px !important;
        color: #1a88f9;
      }
    }
    .el-dialog__body {
      padding: 20px 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .el-dialog__headerbtn {
      top: 10px;
      right: 10px;
    }
    .el-button {
      padding: 8px 15px;
    }
  }
}
</style>