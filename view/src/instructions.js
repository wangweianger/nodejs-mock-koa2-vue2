
import Vue from 'vue'

// 权限过滤指令  用法 v-jurdi='oms1000'
let jurisdnArrs = util.getStorage('session', 'jurisdnArrs') ? JSON.parse(util.getStorage('session', 'jurisdnArrs')) : []
Vue.directive('jurdi', {
    inserted(el,data) {
        //权限过滤器
        if(!data.value) {$(el).remove(); return;}
        let result = jurisdnArrs.includes(data.value);
        if(!result){
            $(el).remove()
        }     
    },
})