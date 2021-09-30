/*
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-02 12:47:51
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-12 22:40:16
 */
import Vue from 'vue'
import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { Message } from 'element-ui'
// import router from '@/router/index'
import { getToken } from "@/utils/auth";

let loading;

function startLoading() {
  loading = Vue.prototype.$loading({
    lock: true,
    text: "LOADING",
    spinner: 'qingmeng-icon icon-logo-icon',
    background: 'rgba(255, 255, 255, 1)',
    target: document.querySelector('.loading-area')//设置加载动画区域
  });
}

function endLoading() {
  Vue.nextTick(() => {
    // DOM 更新了
    loading && loading.close()
  })
}

const clearTimeoutByUrl = (requestList) => {
  for (let item in requestList) {
    clearTimeout(requestList[item]['timeId']);
  }
}
//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;
const requestTimeIdList = [];

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    const timeId = setTimeout(() => {
      startLoading();
    }, 300);
    requestTimeIdList.push({
      timeId: timeId
    });
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  clearTimeoutByUrl(requestTimeIdList);
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

axios.interceptors.request.use(
  config => {
    config.baseURL = process.env.VUE_APP_URL
    let tokenInfo = getToken();
    if (tokenInfo) {
      tokenInfo = JSON.parse(tokenInfo);
      config.headers.common['Authorization'] = `${tokenInfo.tokenHead} ${tokenInfo.token}`;
    }
    if (config.url != '/user/sendMessageCode') {
      showFullScreenLoading();
    }
    return config
  },
  error => {
    tryHideFullScreenLoading();
    Message.error({ message: '请求超时!' });
    return Promise.reject(error)
  }
)
// 在 response 拦截器实现
axios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    const res = response.data
    if (res.code == 2200) {
      return res.data
    } else if (res.code == 2201) {
      return res
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // if (res.code === 1401) {
      //   // to re-login
      //   MessageBox.confirm('您已经退出登录, 请重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     // Local.clear(); // 清除浏览器全部临时缓存
      //     router.push('/login'); // 去登录页面
      //     Message.warning('你已被登出，请重新登录')
      //   })
      // }
      return Promise.reject(res)
    }
  },
  error => {
    tryHideFullScreenLoading();
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    if (error.response.status == 504 || error.response.status == 404) {
      Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
    } else if (error.response.status == 403) {
      Message.error({ message: '权限不足,请联系管理员!' });
    } else {
      Message.error({ message: '未知错误' });
    }
    return Promise.reject(error)
  }
)

export default axios;
