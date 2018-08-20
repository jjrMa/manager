import axios from 'axios'

// const httpHelper = {}
// 配置Vue插件
// httpHelper.install = function fn (Vue) {
//   axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
//   Vue.prototype.$http = axios
// }
const httpAxios = {}
httpAxios.install = function (Vue) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1'
  })

  instance.interceptors.request.use(function (config) {
    if (config.url.toLowerCase() !== 'login') {
      const token = sessionStorage.getItem('token')
      config.headers.Authorization = token
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(function (response) {
    return response
  })
  Vue.prototype.$http = instance
}
// export default httpHelper
export default httpAxios
