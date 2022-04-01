import http from './http'

export const reqLogin = (data: any) => {
  return http({
    method: 'post',
    timeout: 10000,
    url: '/api/platform/v1/login',
    data,
  })
}
export const reqLogout = (data: { token: string }) => {
  return http({
    method: 'post',
    url: '/api/platform/v1/logout',
    data,
  })
}
