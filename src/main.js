// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/**
 * 方法一：全局引用vant（极力不推荐）
 * import Vant from 'vant';
 * import 'vant/lib/index.css';
 * Vue.use(Vant);
 * 
 */ 

/**
 * 方法二：按需引用：安装babel-plugin-import
 * 安装成功后在.babelrc中
 *     "plugins": [
        "transform-vue-jsx",
        "transform-runtime",
        [
            "import",{
                "libraryName":"vant",
                "style" : "true"
            }
        ]
    ]
 * 
 *  */
import { Button , Row , Col , Swipe , SwipeItem , Lazyload , List , Field , NavBar , Toast } from 'vant';
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Toast);

/**
 * vue-awesome-swiper   npm install vue-awesome-swiper --save
 * 全局引用 
 * 
 * import VueAwesomeSwiper from 'vue-awesome-swiper'
 * import 'swiper/dist/css/swiper.css'
 * Vue.use(VueAwesomeSwiper); 
 * 
 *  */

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
