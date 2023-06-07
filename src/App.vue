<template>
  <div id="app">
    <Head />
    <div class="main">
      <Sidebar />
      <div class="main-view">
        <router-view />
      </div>
    </div>
    <commonDialog />
    <About />
  </div>
</template>

<script>
import Head from "./components/head";
import Sidebar from "./components/sidebar";
import commonDialog from "./components/CommonDialog";
import About from "./components/about"
import { getItem } from "./assets/js/local";
import { judgeDate } from "./assets/js/dataTime";
import { mapMutations, mapState } from "vuex";
const os = window.require("os");
export default {
  name: "App",
  components: {
    Head,
    Sidebar,
    commonDialog,
    About,
  },
  methods: {
    ...mapMutations(["setDesktop","setLogin","setVips","setvipTime"]),
  },
  mounted() {
    if (getItem("path") === null) {
      const homedir = os.homedir() + "\\Desktop";
      if (homedir) this.setDesktop(homedir);
    } else {
      this.setDesktop(getItem("path"));
    }
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fafafc;
}
.main {
  height: calc(100% - 50px);
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.main-view {
  margin: 0 20px 20px 20px;
  width: calc(100% - 220px);
  height: calc(100vh - 70px);
}
</style>
