import http from './http'

export const getAlertConfigDetailApi = (data: any) => {
  return http({
    method: 'get',
    url: '/api/station/alarmResource/base/v1/alarmDetail',
    params: data,
  })
}

export const getPersonListApi = (params: { nameOrPhone: string }) => {
  return http({
    method: 'get',
    url: '/api/station/alarmResourcePerson/base/v1/searchAllPerson',
    params,
  })
}
export const getPersonListByIdsApi = (data: any) => {
  return http({
    method: 'post',
    url: '/api/station/alarmResourcePerson/base/v1/searchPerson',
    data,
  })
}
