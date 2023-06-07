<template>
  <div class="header">
    <div class="logo">
      <img src="../../assets/imgas/head/logo.png" alt="" draggable="false" />
      <span>音视频格式转换</span>
    </div>
    <div class="header_btn">
      <div class="header_small" @click="min"></div>
      <div class="header_big" @click="max" v-show="!maxHide"></div>
      <div class="header_big2" @click="max" v-show="maxHide"></div>
      <div class="header_close" @click="close"></div>
    </div>
  </div>
</template>
<script>
const { ipcRenderer } = window.require("electron");
import { mapMutations, mapState } from "vuex";
import { getItem, removeItem } from "../../assets/js/local";
export default {
  data() {
    return {
      maxHide: false,
      number: "",
      coreHide: false,
      cleanTimer: null,
      hangHide: false,
      hangTimer: null,
    };
  },
  computed: {
    ...mapState(["logins", "vipTime", "vips","loginHide"]),
  },
  methods: {
    ...mapMutations([
      "setShowhide",
      "setTips",
      "setFeedback",
      "setLoginHide",
      "setLogin",
      "setVips",
      "setvipTime",
      "setAbout",
      "setCustomer",
      "setUser"
    ]),
    onAbout(e) {
      switch (e.id) {
        case 1:
          this.setCustomer(true);
          break;
        case 2:
          this.setCustomer(true);
          break;
        case 3:
          this.setAbout(true);
          break;
      }
    },
    overHang() {
      clearTimeout(this.hangTimer);
      this.hangTimer = null;
      this.hangHide = true;
    },
    outHang() {
      this.hangTimer = setTimeout(() => {
        this.hangHide = false;
      }, 300);
    },
    close() {
      this.setShowhide(true);
      this.setTips("软件关闭后将结束当前工作进程，确定要退出吗？");
    },
    login() {
      this.setLoginHide(true);
    },
    max() {
      ipcRenderer.send("max");
    },
    min() {
      ipcRenderer.send("min");
    },
    feedback() {
      this.setFeedback(true);
    },
    ouput() {
      removeItem("login");
      this.setLogin(false);
      this.setVips(false);
      this.setvipTime("");
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      ipcRenderer.on("win-max", (e, value) => {
        this.maxHide = value;
      });
    });
  },
  watch: {
    logins() {
      this.number = getItem("login");
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-app-region: drag;
  .logo {
    display: flex;
    align-items: center;
    width: 180px;
    height: 100%;
    background: #fff;
    -webkit-app-region: no-drag;
    img {
      margin-left: 10px;
      width: 30px;
    }
    span {
      margin-left: 8px;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
.header_btn {
  margin-right: 10px;
  display: flex;
  flex-direction: row;
}
.header_login {
  margin-right: 50px;
  font-size: 12px;
  line-height: 20px;
  cursor: pointer;
  -webkit-app-region: no-drag;
  display: flex;
  flex-direction: row;
  span {
    margin-left: 3px;
  }
  div {
    height: 20px;
    width: 20px;
    background: url("../../assets/imgas/head/login.png");
    background-size: 20px 20px;
  }
  &:hover {
    color: #1296db;
    div {
      background: url("../../assets/imgas/head/login2.png");
      background-size: 20px 20px;
    }
  }
}
.header_about {
  margin-right: 20px;
  height: 20px;
  width: 20px;
  font-size: 20px;
  color: rgb(58, 57, 57);
  cursor: pointer;
  -webkit-app-region: no-drag;
  position: relative;
  .hang {
    position: absolute;
    left: -35px;
    top: 25px;
    height: 100px;
    width: 90px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 2px rgb(218, 216, 216);
    z-index: 999;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    cursor: auto;
    div {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:first-child {
        margin-top: 5px;
      }
      span {
        &:hover {
          color: #1296db;
          cursor: pointer;
        }
      }
    }
  }
}
.header_small {
  margin-right: 20px;
  height: 20px;
  width: 20px;
  background: url("../../assets/imgas/head/minimize.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
  -webkit-app-region: no-drag;
}
.header_small:hover {
  background: url("../../assets/imgas/head/minimize2.png") no-repeat center;
  background-size: 100% 100%;
}
.header_big {
  margin-right: 20px;
  height: 20px;
  width: 20px;
  background: url("../../assets/imgas/head/big.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
  -webkit-app-region: no-drag;
}
.header_big:hover {
  background: url("../../assets/imgas/head/big2.png") no-repeat center;
  background-size: 100% 100%;
}
.header_big2 {
  margin-right: 20px;
  height: 20px;
  width: 20px;
  background: url("../../assets/imgas/head/maximize.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
  -webkit-app-region: no-drag;
}
.header_big2:hover {
  background: url("../../assets/imgas/head/maximize2.png") no-repeat center;
  background-size: 100% 100%;
}
.header_close {
  height: 20px;
  width: 20px;
  background: url("../../assets/imgas/head/close.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
  -webkit-app-region: no-drag;
}
.header_close:hover {
  background: url("../../assets/imgas/head/close2.png") no-repeat center;
  background-size: 100% 100%;
}
.header_vip {
  cursor: pointer;
  -webkit-app-region: no-drag;
  img {
    margin-top: 2px;
    height: 30px;
  }
}
.taoxiang {
  margin-right: 50px;
  height: 25px;
  cursor: pointer;
  -webkit-app-region: no-drag;
}
.loginFixed {
  position: relative;
  .core {
    position: absolute;
    left: -75px;
    top: 30px;
    height: 150px;
    width: 180px;
    background: #fff;
    border-radius: 14px;
    z-index: 9999;
    div {
      display: flex;
      flex-direction: row;
      div {
        margin: 30px 0 0 5px;
        display: flex;
        flex-direction: column;
        span {
          margin-left: 5px;
          font-size: 10px;
          text-align: left;
        }
        .size {
          margin-top: 3px;
          font-size: 8px;
          .time {
            margin-left: 10px;
            color: #1296db;
          }
        }
      }
      img {
        margin: 30px 0 0 20px;
        height: 30px;
      }
    }
    .btn {
      margin: 30px auto;
      width: 80px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      border: 1px solid #409eff;
      background: #409eff;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
    .tuichu {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 10px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
