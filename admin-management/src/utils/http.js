import axios from 'axios';
import router from '../router';
axios.defaults.timeout = 5000; //请求超时5秒
axios.defaults.baseURL ='http://127.0.0.1:3000';  //请求base url
// axios.defaults.headers["Content-type"] = "application/json";
//设置post请求是的header信息
// axios.defaults.withCredentials = true 如果你要用到session验证码功能，让请求携带cookie
axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token')
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers = {
        'X-token': token
      }
    }
    
    return config
  }, 
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    if (response.data.code === 403) {
      Toast({
        mes: '您没有权限操作！',
        timeout: 1500,
        callback: () => {
          router.go(-1);
        }
      });
      
      return false;
    }
    if (response.data.code === -1) {
      localStorage.removeItem('token')
      router.push({
        path:"/login",
        querry:{redirect: router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response
  }, 
  err => {
    if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
      Toast({
          mes: '网络异常，连接超时...',
          timeout: 1500
      });
    }
    return Promise.reject(err)
  }
)
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params={}, headers={}){
  return new Promise((resolve, reject) => {
    axios.get(url,{
      params: params,
      headers: headers
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
 export function post(url, data = {}){
   return new Promise((resolve, reject) => {
      axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
   })
 }