<template>
  <div class="about" v-if="about || customer">
    <div class="content" v-if="about">
      <i class="el-icon-close" @click="close"></i>
      <img src="../../assets/imgas/head/logo.png" alt="" />
      <span>{{ common.name }}</span>
      <span class="version">版本号:{{ common.version }}</span>
    </div>
    <div class="content" v-if="customer">
      <i class="el-icon-close" @click="close"></i>
      <div>
          <span><span class="size">客服(问题反馈)QQ:</span> {{ common.QQ }}</span>
          <!-- <span><span class="size">客服微信(问题反馈):</span> {{ common.vx }}</span> -->
      </div>
    </div>
  </div>
</template>
<script>
import common from "../../assets/js/common";
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["about", "customer"]),
    common() {
      return common;
    },
  },
  methods: {
    ...mapMutations(["setAbout", "setCustomer"]),
    close() {
      this.setAbout(false);
      this.setCustomer(false);
    },
  },
};
</script>
<style lang="scss" scoped>
.about {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    height: 200px;
    width: 300px;
    background: #fff;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
    img {
      height: 60px;
      width: auto;
    }
    span {
      margin: 10px 0 0 0;
      font-size: 18px;
    }
    .version {
      font-size: 12px;
    }
    div {
      height: 50%;
      width: 69%;
      display: flex;
      flex-direction: column;
      text-align: left;
      .size {
          font-size: 12px;
      }
    }
  }
}
</style>