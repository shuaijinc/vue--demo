<template>
  <div class="common-format">
    <div class="frame-div">
      <div class="frame" v-for="(item, index) in tabulation" :key="index">
        <img
          src="../../assets/imgas/format/close1.png"
          alt=""
          draggable="false"
          class="close"
          @click="single(index)"
        />
        <div class="left">
          <div class="name">{{ item.name }}</div>
          <div class="content">
            <div>
              <span>时长:&nbsp</span>
              <span class="fixed">{{ item.time }}</span>
              <span>格式:&nbsp</span>
              <span>{{ item.format }}</span>
            </div>
            <div>
              <span>大小:&nbsp</span>
              <span class="fixed">{{ item.size }}</span>
              <span>质量:&nbsp</span>
              <span v-if="routePath === '/'"
                >{{ item.height }}*{{ item.width }}</span
              >
              <span v-else>{{ item.bit_rate }}kb/s</span>
            </div>
          </div>
        </div>
        <div class="mutual">
          <img
            src="../../assets/imgas/format/interactive.png"
            alt=""
            draggable="false"
          />
        </div>
        <div class="middle">
          <div class="name">{{ item.name }}</div>
          <div class="content">
            <div>
              <span>时长:&nbsp</span>
              <span class="fixed">{{ item.time }}</span>
              <span>格式:&nbsp</span>
              <span>{{ item.layout }}</span>
            </div>
            <div v-if="routePath === '/' || routePath === '/audioformat'">
              <span>大小:&nbsp</span>
              <span class="fixed">{{ item.size }}</span>
              <span>质量:&nbsp</span>
              <span v-if="routePath === '/'"
                >{{ item.height }}*{{ item.width }}</span
              >
              <span v-else>{{ item.bit_rate }}kb/s</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div
            class="btn"
            :class="
              item.status === 'wait' ||
              item.status === 'convet' ||
              item.status === 'fail'
                ? 'convet'
                : ''
            "
            @click="btnItem(item)"
          >
            <span v-if="item.status === 'default'">转换</span>
            <span v-if="item.status === 'wait' || item.status === 'convet'"
              >转换中</span
            >
            <span v-if="item.status === 'success'">打开文件</span>
            <span v-if="item.status === 'fail'" style="color: red">失败</span>
          </div>
          <div class="output" v-if="options">
            <span>输出格式:</span
            ><el-select
              v-model="item.layout"
              @change="elOption($event, item)"
              :disabled="item.status === 'wait' || item.status === 'convet'"
            >
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
      </div>
    </div>
    <div class="bottom">
      <div class="btn-file" @click="btnFile">
        <img
          src="../../assets/imgas/format/file.png"
          alt=""
          draggable="false"
        />
        添加文件
      </div>
      <div class="btn-folder" @click="btnFolder">
        <img
          src="../../assets/imgas/format/folder.png"
          alt=""
          draggable="false"
        />
        添加文件夹
      </div>
      <div class="btn-delete" @click="delectAll">清空文件</div>
    </div>
  </div>
</template>
<script>
import gather from "../../assets/js/gather";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState([
      "video_format",
      "audio_format",
      "formatVideo",
      "formatAudio",
      "audioConvet",
      "videoConvet",
      "double_format",
      "video_reduce",
      "vaConvet",
      "reduceConvet"
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
    tabulation() {
      if (this.routePath === "/") {
        return this.video_format;
      } else if (this.routePath === "/audioformat") {
        return this.audio_format;
      } else if (this.routePath === "/videoaudio") {
        return this.double_format;
      } else if (this.routePath === "/videoreduce") {
        return this.video_reduce;
      }
    },
    routePath() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapMutations([
      "setVideo",
      "setAudio",
      "setShowhide",
      "setTips",
      "setVideoConvet",
      "setAudioConvet",
      "setDouble",
      "setReduce",
      "setVAConvet",
      "setReduceConvet"
    ]),
    btnFile() {
      this.$emit("btnFile");
    },
    btnFolder() {
      this.$emit("btnFolder");
    },
    delectAll() {
      this.setShowhide(true);
      this.setTips("确定要清空列表中的全部任务吗？");
    },
    single(e) {
      if (this.routePath === "/") {
        let list = this.video_format;
        list.splice(e, 1);
        this.setVideo(list);
      } else if (this.routePath === "/audioformat") {
        let list = this.audio_format;
        list.splice(e, 1);
        this.setAudio(list);
      } else if (this.routePath === "/videoaudio") {
        let list = this.double_format;
        list.splice(e, 1);
        this.setDouble(list);
      } else if (this.routePath === "/videoreduce") {
        let list = this.video_reduce;
        list.splice(e, 1);
        this.setReduce(list);
      }
    },
    singleConvet(item) {
      if (this.routePath === "/") {
        let list = this.video_format;
        list.forEach((items) => {
          if (items.path === item.path) {
            items.status = "wait";
          }
        });
        this.setVideo(list);
        if (this.videoConvet) {
          this.$bus.$emit("converting");
          this.setVideoConvet(false);
        }
      } else if (this.routePath === "/audioformat") {
        let list = this.audio_format;
        list.forEach((items) => {
          if (items.path === item.path) {
            items.status = "wait";
          }
        });
        this.setAudio(list);
        if (this.videoConvet) {
          this.$bus.$emit("converting");
          this.setAudioConvet(false);
        }
      } else if (this.routePath === "/videoaudio") {
        let list = this.double_format;
        list.forEach((items) => {
          if (items.path === item.path) {
            items.status = "wait";
          }
        });
        this.setDouble(list);
        if (this.vaConvet) {
          this.$bus.$emit("converting");
          this.setVAConvet(false);
        }
      } else if (this.routePath === "/videoreduce") {
        let list = this.video_reduce;
        list.forEach((items) => {
          if (items.path === item.path) {
            items.status = "wait";
          }
        });
        this.setReduce(list);
        if (this.reduceConvet) {
          this.$bus.$emit("converting");
          this.setReduceConvet(false);
        }
      }
    },
    elOption(e, item) {
      if (this.routePath === "/") {
        let list = this.video_format;
        list.forEach((items) => {
          if (items.path === item.path) {
            items.layout = e;
            item.status = "default";
          }
        });
        this.setVideo(list);
      } else {
        let list = this.audio_format;
        list.forEach((items) => {
          if (items.path === item.path) {
            items.layout = e;
            item.status = "default";
          }
        });
        this.setAudio(list);
      }
    },
    btnItem(e) {
      if (e.status === "default") {
        return this.singleConvet(e);
      } else if (e.status === "success") {
        window.SelectFile(e.method);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.common-format {
  height: calc(100% - 100px);
  width: 100%;
  border: 1px solid #1a88f9;
  border-radius: 10px;
  position: relative;
  .frame-div {
    height: 100%;
    overflow-y: auto;
    .frame {
      margin: 10px;
      width: calc(100% - 20px);
      height: 92px;
      background: #e6eef7;
      border-radius: 8px;
      position: relative;
      display: flex;
      justify-content: space-between;
      &:last-child {
        margin-bottom: 60px;
      }
      .content {
        font-size: 11px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #808285;
        div {
          line-height: 25px;
          background: #e6eef7;
          display: flex;
          flex-direction: row;
        }
      }
      .close {
        position: absolute;
        right: -5px;
        top: -5px;
        height: 20px;
        cursor: pointer;
      }
      .fixed {
        display: inline-block;
        width: 35%;
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*隐藏后添加省略号*/
        white-space: nowrap;
      }
      .name {
        margin-top: 10px;
        line-height: 30px;
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        width: calc(100% - 20px);
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*隐藏后添加省略号*/
        white-space: nowrap;
      }
      .left {
        width: 28%;
        height: 100%;
        padding-left: 15px;
        display: flex;
        flex-direction: column;
        text-align: left;
        span {
          color: rgb(180, 176, 176);
        }
      }
      .mutual {
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 30px;
        }
      }
      .middle {
        padding-left: 15px;
        width: 28%;
        height: 100%;
        text-align: left;
      }
      .right {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .btn {
          margin: 15px 30px 0 0;
          width: 70px;
          height: 31px;
          background: #1096f8;
          border-radius: 4px 4px 4px 4px;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .convet {
          background: #899baa;
          cursor: not-allowed;
        }
        .output {
          margin: 10px 30px 0 0;
          font-size: 11px;
          line-height: 25px;
          font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
          font-weight: 400;
          color: #0075ff;
          display: flex;
          flex-direction: row;
          span {
            margin-right: 2px;
          }
          /deep/ .el-input__inner {
            width: 65px;
            height: 25px;
            line-height: 25px;
            padding-left: 0;
            padding-right: 15px;
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis; /*隐藏后添加省略号*/
            white-space: nowrap;
            border-radius: 0;
            border: 1px solid #0075ff;
            color: #0075ff;
            text-align: center;
            font-size: 12px;
          }
          /deep/ .el-input__suffix {
            right: -4px;
          }
          /deep/ .el-select .el-input .el-select__caret {
            line-height: 25px;
          }
          /deep/ .el-icon-arrow-up:before {
            color: #0075ff;
          }
        }
      }
    }
  }
  .bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 40px;
    width: calc(100% - 2px);
    z-index: 9;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #ffffff;
    .btn-file {
      margin-left: 15px;
      height: 30px;
      width: 80px;
      font-size: 12px;
      background: #1a88f9;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
      img {
        margin-right: 2px;
        height: 20px;
        width: 20px;
      }
    }
    .btn-folder {
      margin-left: 15px;
      height: 30px;
      width: 90px;
      font-size: 12px;
      border: 1px solid #1a88f9;
      color: #1a88f9;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
      img {
        margin-right: 2px;
        height: 20px;
        width: 20px;
      }
    }
    .btn-delete {
      margin-left: 15px;
      height: 30px;
      width: 80px;
      font-size: 12px;
      border: 1px solid #1a88f9;
      color: #1a88f9;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  /deep/ .el-dialog {
    width: 300px;
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
.frame-div::-webkit-scrollbar {
  display: none;
}
</style>