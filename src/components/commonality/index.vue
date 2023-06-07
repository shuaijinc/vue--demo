<template>
  <div class="video-prepare">
    <img :src="difference.url" alt="" draggable="false" class="video-img" />
    <p>
      将<span>{{ difference.name }}</span
      >文件拖拽至此区域，或者点击添加
    </p>
    <div class="btn">
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
    </div>
    <span class="nots">最多可批量上传10个文件</span>
    <div class="format">
      支持<span v-if="difference.vhide"
        >mp4、avi、mov、mkv、vob、wmv、m4v、<br />mpg、webm、ogv、3gp、flv、f4v、mtv、swf</span
      >
      <span v-if="difference.ahide"
        >mp3、m4a、wma、aac、flac、ac3、m4r、ape、ogg、<br />wav、amr</span
      >
      <span v-if="difference.rhide"
        >mp4、avi、mov、mkv、vob、wmv、m4v、<br />mpg、webm、ogv、3gp、flv、f4v、mtv</span
      >格式转换
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    difference() {
      let list;
      if (this.$route.path === "/") {
        list = {
          url: require("../../assets/imgas/format/videoFomat.png"),
          name: "视频",
          vhide: true,
          ahide: false,
        };
        return list;
      } else if (this.$route.path === "/audioformat") {
        list = {
          url: require("../../assets/imgas/format/audioFormat.png"),
          name: "音频",
          vhide: false,
          ahide: true,
        };
        return list;
      } else if (this.$route.path === "/videoaudio") {
        list = {
          url: require("../../assets/imgas/format/yinpin0.png"),
          name: "视频",
          vhide: true,
          ahide: false,
        };
        return list;
      } else if (this.$route.path === "/videoreduce") {
        list = {
          url: require("../../assets/imgas/format/compress.png"),
          name: "视频",
          vhide: false,
          ahide: false,
          rhide: true,
        };
        return list;
      }
    },
  },
  methods: {
    btnFile() {
      this.$emit("btnFile");
    },
    btnFolder() {
      this.$emit("btnFolder");
    },
  },
};
</script>
<style lang="scss" scoped>
.video-prepare {
  height: 100%;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #1a88f9;
  background: #f3f5f8;
  .video-img {
    margin-top: -50px;
  }
  p {
    font-size: 14px;
  }
  .btn {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    img {
      width: 24px;
      margin-right: 10px;
    }
    .btn-file {
      height: 40px;
      width: 150px;
      background: #1a88f9;
      color: #fff;
      font-size: 15px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #87aaca;
      }
    }
    .btn-folder {
      margin-left: 50px;
      height: 40px;
      width: 150px;
      background: #fff;
      color: #1a88f9;
      font-size: 15px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #1a88f9;
      cursor: pointer;
      &:hover {
        background: #ebeef1;
      }
    }
  }
  .nots {
    margin-top: 30px;
    font-size: 12px;
    color: #989a9b;
  }
  .format {
    margin-top: 30px;
    font-size: 13px;
    span {
      color: #1a88f9;
    }
  }
}
</style>