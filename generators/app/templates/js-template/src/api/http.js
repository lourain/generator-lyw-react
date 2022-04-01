// import customMessage from 'components/customMessage';
import Axios from 'axios'
import { message } from 'antd'
import { localStorageKey } from '../context/auth-context'

const { APP_URL } = window

Axios.defaults.headers.post['Content-Type'] = 'application/json'
Axios.defaults.timeout = 3000

// ---------------------------------
const instance = Axios.create({
  baseURL: APP_URL,
  timeout: 3000,
})

instance.interceptors.request.use(
  (config) => {
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
  (response) => {
    const { data } = response
    const { resultCode, resultMessage } = data
    if (resultCode !== 0) {
      message({
        content: resultMessage,
        type: 'error',
      })
    }
    return data
  },
  (err) => {
    const { status } = err.response
    message({
      content: err.message,
      type: 'error',
    })
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
