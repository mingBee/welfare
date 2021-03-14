import axios from 'axios'
import { Notify } from 'vant';
// import { Message, MessageBox } from 'element-ui'
// import store from '../store'
// 创建axios实例
const service = axios.create({
  baseURL: '', // api的base_url  https://boc.u-cup.cn/bofc/
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['authorization'] = store.getters.token// 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
 console.log(response,'接口返回参数')
    const res = response.data
    if (res.code !== 20000) {
      // Message({
      //   message: res.msg,
      //   type: 'error',
      //   duration: 1500
      // })
      Notify({ type: 'danger', message: '服务器错误，业务码错误', duration: 1500, });
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload()// 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    // Message({
    //   message: error.msg,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    Notify({ type: 'danger', message: error.msg, duration: 2000, });
    return Promise.reject(error)
  }
)

export default service
