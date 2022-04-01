import http from './http'

export default {
  pageQueryTemplate: (data: any) => {
    return http({
      method: 'post',
      url: '/api/station/alarmResource/base/v1/pageQueryTemplate',
      data,
    })
  },
  operateAlarm: (data: any) => {
    return http({
      method: 'post',
      url: '/api/station/alarmResource/base/v1/operateAlarm',
      data,
    })
  },
}
