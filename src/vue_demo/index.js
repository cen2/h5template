import 'normalize.css'
import Vue from 'vue'
import demo from './demo'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: {demo},
  template: '<demo/>'
})
