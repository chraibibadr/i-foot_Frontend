import { boot } from 'quasar/wrappers'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9090/';

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
})

export { axios }
