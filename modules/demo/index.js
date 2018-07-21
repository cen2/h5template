import 'normalize.css'
import Vue from 'vue'
import app from './app'

Vue.config.productionTip = false
new Vue({
    el: '#app',
    components: {app},
    template: '<app/>'
})