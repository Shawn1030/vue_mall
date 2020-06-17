import axios from 'axios'

export function request(config){
    const instance1 = axios.create({
      baseURL:'http://152.136.185.210:8000/api/h8',
      timeout:'5000'
    })
    // axios的请求拦截器 
    instance1.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    // axios的响应拦截器
    instance1.interceptors.response.use(function (response) {
      return response.data;
    }, function (error) {

      return Promise.reject(error);
    });
    // 真正的网络请求
    return instance1(config)
}

