import Vue from 'vue'
import App from './App'

import {
	myRequest
} from 'util/api.js'

//挂载到vue全局 这样全部页面都可以使用 
Vue.prototype.$myRequest = myRequest
Vue.filter('formaDate', (date) => {
	const newdate = new Date(date)
	const year = newdate.getFullYear()
	const month = (newdate.getMonth() + 1).toString().padStart(2, 0)
	const day = newdate.getDate().toString().padStart(2, 0)
	return year + '年' + month + '月' + day + '日'
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
