import 'normalize.css'
import Vue from 'vue'
import demo from './demo'

import axios from 'axios'

const API_PATH = process.env.SERVER_URL

axios.get(`${API_PATH}/users/cen2`).then(res => {
  console.log(res.data)
})

Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: {demo},
  template: '<demo/>'
})
