import 'normalize.css'
import Vue from 'vue'
import vchat from './vchat'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: {vchat},
  template: '<vchat/>'
})
