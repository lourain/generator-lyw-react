import { AxiosPromise, AxiosResponse } from 'axios'
import http, { responseType } from './http'

/**
 * 我的厂站列表
 * @param {{pageNum,pageSize}} param0
 * @returns
 */
const reqSceneList = ({ pageNum, pageSize } = { pageNum: 1, pageSize: 10 }) => {
  return http.post<responseType>('/api/platform/v1/MyScenes/get', {
    pageNum,
    pageSize,
  })
}

export default {
  reqSceneList,
}
