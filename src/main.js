import Vue from 'vue'
import app from './app.vue'
import moment from 'moment'
//mint-ui
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
Vue.use(MintUI)

//图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//过滤器
Vue.filter('dataFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

//resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
Vue.http.options.emulateJSON = true

//路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

//vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state: {
        car: car,
    },
    mutations: {
        addToCar(state, goodsinfo) {
            var flag = false;
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = !flag;
                    return true;
                }

            })
            if (!flag) {
                state.car.push(goodsinfo)
            }
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            state.car.some((item, i) => {
                if (item.id = id) {
                    state.car.splice(i, 1)
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        }
    },
    getters: {
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o;
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o;
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.count * item.price
                }
            })
            return o
        }
    }
})

//导入mui
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router,
    store
})