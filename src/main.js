import vue from 'vue'
import App from './app.vue'
import store from './store/store'

vue.config.productionTip = false // 将vue的提示功能关闭
vue.prototype.$store = store

App.myType = 'app' // 声明组件类型为应用

const app = new vue(App)
app.$mount() // 挂载当前应用