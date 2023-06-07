<template>
  <div class="sidebar">
    <div
      class="menu"
      v-for="(item, index) in menu"
      :key="index"
      :class="seletId === item.id ? 'meno-selet' : ''"
      @mouseover="mouseover(item.id)"
      @mouseleave="mouseleave"
      @click="Jump(item)"
    >
      <img
        :src="
          seletId === item.id
            ? item.icon
            : hoverId === item.id
            ? item.icon
            : item.icon2
        "
        alt=""
        draggable="false"
      />
      <span :class="seletId === item.id ? 'selet-css' : 'selet-no'">{{
        item.name
      }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seletId: 1,
      hoverId: "",
      menu: [
        {
          id: 1,
          name: "视频转换",
          icon: require("../../assets/imgas/head/video.png"),
          icon2: require("../../assets/imgas/head/video2.png"),
          path: "/",
        },
        {
          id: 2,
          name: "音频转换",
          icon: require("../../assets/imgas/head/audio.png"),
          icon2: require("../../assets/imgas/head/audio2.png"),
          path: "/audioformat",
        },
        {
          id: 3,
          name: "视频转音频",
          icon: require("../../assets/imgas/head/yinpin2.png"),
          icon2: require("../../assets/imgas/head/yinpin.png"),
          path: "/videoaudio",
        },
        {
          id: 4,
          name: "视频压缩",
          icon: require("../../assets/imgas/head/vr2.png"),
          icon2: require("../../assets/imgas/head/vr.png"),
          path: "/videoreduce",
        },
      ],
    };
  },
  mounted() {
    let path = this.$route.path;
    this.menu.forEach(item =>{
      if (item.path === path) {
        return this.seletId = item.id;
      }
    })
  },
  methods: {
    mouseover(e) {
      this.hoverId = e;
    },
    mouseleave() {
      this.hoverId = "";
    },
    Jump(e) {
      this.seletId = e.id;
      this.$router.push({ path: e.path });
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  height: calc(100vh - 50px);
  width: 180px;
  background: #fff;
  .menu {
    margin: 10px auto;
    width: 160px;
    height: 46px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    img {
      width: 30px;
      margin-right: 10px;
    }
    .selet-css {
      color: #1296db;
      font-weight: 700;
    }
    .selet-no {
      color: #cdcdcd;
    }
    &:hover {
      background: linear-gradient(
        90deg,
        rgba(36, 124, 255, 0.2),
        rgba(36, 124, 255, 0.05)
      );
      span {
        color: #1296db;
        font-weight: 700;
      }
    }
  }
  .meno-selet {
    background: linear-gradient(
      90deg,
      rgba(36, 124, 255, 0.2),
      rgba(36, 124, 255, 0.05)
    );
  }
}
</style>