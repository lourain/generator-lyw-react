import * as alert from './alert'
import resource from './resource'
// import login from './login';
import scene from './scene'
const api = {
  ...alert,
  ...resource,
  // ...login,
  ...scene,
}
export default api
