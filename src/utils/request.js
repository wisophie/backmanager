import axios from "axios"


const request = axios.create({
  // baseURL: "http://192.168.2.2:8082"
  baseURL: "http://127.0.0.1:8888/api/private/v1/"
})

//axios请求拦截器加入token
request.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')

  return config;
}, error => {
  return Promise.reject(error);
})

//
request.interceptors.response.use(response => {
  // console.log(response, "response")
  if (response.data.code === 200) { }
  return response;
}, error => {
  return Promise.reject(error);
}
)

export default request