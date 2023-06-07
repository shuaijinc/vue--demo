<template>
  <div class="footer-css">
    <div>
      <div class="output">
        <span>输出路径:</span>
        <div class="path-name">
          {{ DeskTop }}
        </div>
        <div class="change" @click="change">更改路径</div>
      </div>
      <div class="btn" @click="convet" :class="convetStatus ? '' : 'convet'">
        <img
          src="../../assets/imgas/format/convet.png"
          alt=""
          draggable="false"
        />
        <span v-if="convetStatus">开始转换</span>
        <span v-else>转换中</span>
      </div>
    </div>
    <div class="format" v-if="options">
      <span>输出格式:</span>
      <el-select v-model="value" @change="elOption" :disabled="!convetStatus">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import gather from "../../assets/js/gather";
const { dialog } = window.require("@electron/remote");
import { setItem } from "../../assets/js/local";
import { convetImageToCanvas } from "../../assets/js/generate"
export default {
  data() {
    return {
      value: "",
    };
  },
  computed: {
    ...mapState([
      "DeskTop",
      "formatVideo",
      "formatAudio",
      "video_format",
      "audio_format",
      "double_format",
      "video_reduce",
      "audioConvet",
      "videoConvet",
      "vaConvet",
      "vips",
      "reduceConvet",
    ]),
    options() {
      if (this.$route.path === "/") {
        return gather.video_list;
      } else if (this.routePath === "/audioformat") {
        return gather.audio_list;
      } else {
        return false;
      }
    },
    routePath() {
      return this.$route.path;
    },
    convetStatus() {
      if (this.routePath === "/") {
        if (this.videoConvet) {
          return true;
        } else {
          return false;
        }
      } else if (this.routePath === "/audioformat") {
        if (this.audioConvet) {
          return true;
        } else {
          return false;
        }
      } else if (this.routePath === "/videoaudio") {
        if (this.vaConvet) {
          return true;
        } else {
          return false;
        }
      } else if (this.routePath === "/videoreduce") {
        if (this.reduceConvet) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  created() {
    if (this.routePath === "/") {
      this.value = this.formatVideo;
    } else if (this.routePath === "/audioformat") {
      this.value = this.formatAudio;
    }
    this.$bus.$on("converting", () => {
      convetImageToCanvas();
      this.converting();
    });
  },
  methods: {
    ...mapMutations([
      "setFormatVideo",
      "setVideo",
      "setAudio",
      "setDesktop",
      "setAudioConvet",
      "setVideoConvet",
      "setShowhide",
      "setTips",
      "setVAConvet",
      "setReduceConvet",
      "setDouble",
      "setReduce",
    ]),
    elOption(e) {
      this.setFormatVideo(e);
      if (this.routePath === "/") {
        let list = this.video_format;
        list.forEach((item) => {
          item.layout = e;
          item.status = "default";
        });
        this.setVideo(list);
      } else {
        let list = this.audio_format;
        list.forEach((item) => {
          item.layout = e;
          item.status = "default";
        });
        this.setAudio(list);
      }
    },
    change() {
      //选择目录
      dialog
        .showOpenDialog({
          properties: ["openDirectory"],
          title: "请选择保存目录",
          buttonLabel: "选择",
        })
        .then((result) => {
          if (!result.canceled) {
            this.setDesktop(result.filePaths[0]);
            setItem("path", result.filePaths[0]);
          }
        });
    },
    convet() {
      convetImageToCanvas()
      if (this.routePath === "/") {
        this.setVideoConvet(false);
        let list = this.video_format;
        list.forEach((item) => {
          if (item.status === "default" || item.status === "fail") {
            item.status = "wait";
          }
        });
        this.setVideo(list);
        this.converting();
      } else if (this.routePath === "/audioformat") {
        this.setAudioConvet(false);
        let list = this.audio_format;
        list.forEach((item) => {
          if (item.status === "default" || item.status === "fail") {
            item.status = "wait";
          }
        });
        this.setAudio(list);
        this.converting();
      } else if (this.routePath === "/videoaudio") {
        this.setVAConvet(false);
        let list = this.double_format;
        list.forEach((item) => {
          if (item.status === "default" || item.status === "fail") {
            item.status = "wait";
          }
        });
        this.setDouble(list);
        this.converting();
      } else if (this.routePath === "/videoreduce") {
        this.setReduceConvet(false);
        let list = this.video_reduce;
        list.forEach((item) => {
          if (item.status === "default" || item.status === "fail") {
            item.status = "wait";
          }
        });
        this.setReduce(list);
        this.converting();
      }
    },
    converting() {
      if (this.routePath === "/") {
        let list = this.video_format;
        for (let i = 0; i < list.length; i++) {
          if (list[i].status === "wait") {
            list[i].status = "convet";
            this.setVideo(list);
            let outpath =
              this.DeskTop + "/" + list[i].title + "." + list[i].layout;
            window
              .videoContent(list[i].path, outpath,this.vips)
              .then((res) => {
                list[i].method = res;
                list[i].status = "success";
                this.setVideo(list);
                this.converting();
              })
              .catch((err) => {
                list[i].status = "fail";
                this.setVideo(list);
                this.converting();
              });
            return;
          }
        }
        this.setVideoConvet(true);
      } else if (this.routePath === "/audioformat") {
        let list = this.audio_format;
        for (let i = 0; i < list.length; i++) {
          if (list[i].status === "wait") {
            list[i].status = "convet";
            this.setAudio(list);
            let outpath =
              this.DeskTop + "/" + list[i].title + "." + list[i].layout;
            window
              .audioContent(list[i].path, outpath)
              .then((res) => {
                list[i].method = res;
                list[i].status = "success";
                this.setAudio(list);
                this.converting();
              })
              .catch((err) => {
                list[i].status = "fail";
                this.setAudio(list);
                this.converting();
              });
            return;
          }
        }
        this.setAudioConvet(true);
      } else if (this.routePath === "/videoaudio"){
        let list = this.double_format;
        for (let i = 0; i < list.length; i++) {
          if (list[i].status === "wait") {
            list[i].status = "convet";
            this.setDouble(list);
            let outpath =
              this.DeskTop + "/" + list[i].title + "." + list[i].layout;
            window
              .VideoAudioContent(list[i].path, outpath)
              .then((res) => {
                list[i].method = res;
                list[i].status = "success";
                this.setDouble(list);
                this.converting();
              })
              .catch((err) => {
                list[i].status = "fail";
                this.setDouble(list);
                this.converting();
              });
            return;
          }
          this.setVAConvet(true);
        }
      } else if (this.routePath === "/videoreduce") {
        let list = this.video_reduce;
        for (let i = 0; i < list.length; i++) {
          if (list[i].status === "wait") {
            list[i].status = "convet";
            this.setReduce(list);
            let outpath =
              this.DeskTop + "/" + list[i].title + "." + list[i].layout;
            window
              .videoCompress(list[i].path, outpath,this.vips)
              .then((res) => {
                list[i].method = res;
                list[i].status = "success";
                this.setReduce(list);
                this.converting();
              })
              .catch((err) => {
                list[i].status = "fail";
                this.setReduce(list);
                this.converting();
              });
            return;
          }
          this.setReduceConvet(true);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.footer-css {
  margin-top: 18px;
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .output {
      .path-name {
        margin-left: 10px;
        width: 250px;
        height: 28px;
        padding-left: 10px;
        padding-right: 10px;
        line-height: 28px;
        background: #fff;
        border: 1px solid #b4b4b4;
        border-right: none;
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*隐藏后添加省略号*/
        white-space: nowrap;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        font-size: 12px;
        color: #b4b4b4;
        cursor: not-allowed;
      }
      .change {
        width: 80px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        background: #b4b4b4;
        color: #fff;
        border: 1px solid #b4b4b4;
        border-left: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        cursor: pointer;
      }
    }
    .btn {
      height: 40px;
      width: 140px;
      background: #0479f6;
      border-radius: 4px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      cursor: pointer;
      img {
        margin: 2px 8px 0 0;
        width: 28px;
      }
    }
    .convet {
      background: #899baa;
      cursor: not-allowed;
    }
  }
  .format {
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-start;
    /deep/ .el-input__inner {
      margin-left: 10px;
      width: 150px;
      height: 28px !important;
      padding-left: 0;
      padding-right: 15px;
      overflow: hidden; /*超出隐藏*/
      text-overflow: ellipsis; /*隐藏后添加省略号*/
      white-space: nowrap;
      border: 1px solid #0075ff;
      color: #0075ff;
      text-align: center;
      font-size: 12px;
    }
    /deep/ .el-select .el-input .el-select__caret {
      line-height: 28px;
    }
    /deep/ .el-icon-arrow-up:before {
      color: #0075ff;
    }
  }
}
</style>