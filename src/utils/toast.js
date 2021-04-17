import { Message } from 'element-ui';
import { Loading } from 'element-ui';

export default {
  loadingInstance: null,
  loading() {
    this.loadingInstance = Loading.service({ fullscreen: true, background: 'rgba(255, 255, 255, 0.8)', text: "加载中..." });
  },

  warn(msg) {
    Message({
      message: msg,
      showClose: true,
      duration: 2000,
      type: 'info'
    })
  },

  success(msg) {
    Message({
      message: msg,
      showClose: true,
      duration: 2000,
      type: 'success'
    })
  },

  hide() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close();
    }
  }
}