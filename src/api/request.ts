import axios from "axios";
import {showMessage} from "./status";
import {message} from "antd";
import qs from "qs";

/**
 * 设置 Axios 统一配置信息
 */
const axiosInstance = axios.create({
  // 指定请求超时的毫秒数 默认：0 及永不超时
  timeout: 10000,
  // 基础Url：例如 http://10.16.2.1:8080/nts/
  baseURL: 'http://jsonplaceholder.typicode.com/',
  // 允许在向服务器发送前，修改请求数据
  // 只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  transformRequest: [
    data => {
      // 删除 token
      delete data.Authorization;
      data = qs.stringify(data);
      return data;
    }
  ]
})

// axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com/'

/**
 * http request 请求拦截
 */
axiosInstance.interceptors.request.use(request => {
    request.data = JSON.stringify(request.data);
    const token = localStorage.getItem('token');
    if (token) {
      request.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
    }
    return request;
  }, error => Promise.reject(error)
);

/**
 * http response 响应拦截
 */
axiosInstance.interceptors.response.use(response => {
    if (response.headers.authorization) {
      localStorage.setItem('token', response.headers.authorization);
    } else if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    if (response.status === 200) return response;
    showMessage(response.status);
    return response;
  }, error => {
    const {response} = error;
    if (response) {
      showMessage(response.status);
      return Promise.reject(response.data);
    }
    message.error('网络连接异常,请稍后再试!');
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function AxiosGet(url: string, params = {}) {
  // return new Promise((resolve, reject) => {
  //   axiosInstance.get(url)
  //     .then(response => {
  //       resolve(response.data);
  //     }, error => {
  //       reject(error);
  //       message.error(showMessage(error.request.status));
  //     });
  // });
  return axiosInstance.get(url)
    .then(response => {
      // resolve(response.data);
    }, error => {
      // reject(error);
      message.error(showMessage(error.request.status));
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function AxiosPost(url: string, data = {}) {
  // return new Promise((resolve, reject) => {
  //   axiosInstance.post(url, data)
  //     .then(response => {
  //       resolve(response.data);
  //     }, error => {
  //       reject(error);
  //       message.error(showMessage(error.request.status));
  //     });
  // });

  return axiosInstance.post(url, data)
    .then(response => {
      // resolve(response.data);
    }, error => {
      // reject(error);
      message.error(showMessage(error.request.status));
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axiosInstance.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, error => {
        reject(error);
        message.error(showMessage(error.request.status));
      });
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axiosInstance.put(url, data)
      .then(response => {
        resolve(response.data);
      }, error => {
        reject(error);
        message.error(showMessage(error.request.status));
      });
  });
}