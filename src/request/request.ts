import axios from "axios";
import {showMessage} from "./status";
import {message} from "antd";

/**
 * 设置 Axios 统一配置信息
 */
const Request = axios.create({
  // 指定请求超时的毫秒数 默认：0 及永不超时
  timeout: 10000,
  // 基础Url：例如 http://10.16.2.1:8080/nts/
  baseURL: process.env.REACT_APP_BASE_URL
})

/**
 * http request 请求拦截器
 */
Request.interceptors.request.use(config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
    };
    return config;
  },
  error => Promise.reject(error)
);

/**
 * http response 响应拦截器
 */
Request.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  return response;
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  message.error(showMessage(error.response.status));
  return Promise.reject(error);
});

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
const AxiosGet = function AxiosGet(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    Request.get(url, {params: params})
    .then(response => {
      resolve(response.data);
    }, error => {
      reject(error);
    });
  });
};

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
const AxiosPost = function AxiosPost(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    Request.post(url, data)
    .then(response => {
      resolve(response.data);
    }, error => {
      reject(error);
    });
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
const AxiosPatch = function AxiosPatch(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    Request.patch(url, data)
    .then(response => {
      resolve(response.data);
    }, error => {
      reject(error);
    });
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
const AxiosPut = function (url: string, data = {}) {
  return new Promise((resolve, reject) => {
    Request.put(url, data)
    .then(response => {
      resolve(response.data);
    }, error => {
      reject(error);
    });
  });
};

export {Request, AxiosGet, AxiosPost, AxiosPut, AxiosPatch};