// import customMessage from 'components/customMessage'
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { localStorageKey } from '@/context/auth-context'
import { message } from 'antd'

// type userKeys = 'loginName' | 'token' | 'userId' | 'tokenSSO';
export interface responseType {
  resultCode: number
  // data: Record<userKeys, unknown>;
  data: Record<string, any>
  resultMessage: string
}
const { APP_URL } = window

Axios.defaults.headers.post['Content-Type'] = 'application/json'
Axios.defaults.timeout = 3000

// ---------------------------------
const instance = Axios.create({
  baseURL: APP_URL,
  timeout: 3000,
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig & { requestBase?: string }) => {
    // requestBase为Report,则更换baseURL
    // if (config.requestBase == 'REPORT') {
    //     config.baseURL = APP_REPORT_URL;
    // }
    // 若请求地址不是login则携带token
    if (!config.url?.includes('login')) {
      localStorage[localStorageKey] && config.headers && (config.headers['auth'] = JSON.parse(localStorage[localStorageKey]).token)
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse<responseType>) => {
    const { data } = response
    const { resultCode, resultMessage } = data
    if (resultCode !== 0) {
      message.error(resultMessage)
    }
    return data
  },
  (err) => {
    const { status } = err.response
    message.error(err.message)
    if (status === 401 || status === 403) {
      localStorage.clear()
      setTimeout(() => {
        window.location.hash = '#/login'
      }, 2000)
      return
    }
    return Promise.reject(err)
  }
)

export default instance
