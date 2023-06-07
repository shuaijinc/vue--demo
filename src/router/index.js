import Vue from 'vue'
import Router from 'vue-router'
import VideoFormat from '../views/VideoFormat'
import AudioFormat from '../views/AudioFormat'
import VideoAudio from '../views/VideoAudio'
import VideoReduce from '../views/VideoReduce'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: '视频格式转换',
      component: VideoFormat
    },
    {
      path: '/audioformat',
      name: '音频格式转换',
      component: AudioFormat
    },
    {
      path: '/videoaudio',
      name: '视频转音频',
      component: VideoAudio
    },
    {
      path: '/videoreduce',
      name: '视频压缩',
      component: VideoReduce
    }
  ]
})
