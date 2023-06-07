import Vuex from 'vuex'

import Vue from 'vue'
import mutations from './mutations'

Vue.use(Vuex)
const state = {
    video_format: [], //视频格式
    audio_format: [], //音频格式
    double_format: [], //视频转音频
    video_reduce: [], //视频压缩
    DeskTop: '',
    formatVideo: 'mp4',
    formatAudio: 'mp3',
    formatDouble: 'mp3',
    audioConvet: true,
    videoConvet: true,
    vaConvet: true,
    reduceConvet: true,
    showhide: false, //关闭弹框
    tips: "",//弹框提示词
    feedback: false,
    loginHide: false,
}
export default new Vuex.Store({
    state,
    mutations
})