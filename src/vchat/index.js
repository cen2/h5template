import 'normalize.css'
import Vue from 'vue'
import gchat from './vchat'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: {gchat},
  template: '<gchat/>'
})
