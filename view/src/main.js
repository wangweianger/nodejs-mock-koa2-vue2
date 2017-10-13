import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import routes from './router'
import filter from './filter'
import $ from 'jquery'
import moment from 'moment'
import config from 'common/js/config'
import common from 'common/js/common'
import util from 'common/js/util'
import popup from 'popup'
require('common/js/jquery.cookie.js')

//分页
require('common/lib/page/page.css');
require('page');
//表单验证
import validform from 'common/js/validform'
//bootstrap
require('common/lib/bootstrap/css/bootstrap.css');
require('common/lib/bootstrap/js/bootstrap.js');

//时间选择
require('common/lib/laydate/need/laydate.css');
require('common/lib/laydate/skins/default/laydate.css');
require('common/lib/laydate/laydate.js');

//公用样式文件
require('common/css/base.scss');

//jsonFormater
require('common/lib/jsonFormater/jsonFormater.css')
import JsonFormater from 'common/lib/jsonFormater/jsonFormater'

// 路由模块和HTTP模块
Vue.use(VueRouter);
// 使用filter
for (var k in filter) {
	Vue.filter(k, filter[k]);
};

window["validform"] = validform
window["common"] = common
window["util"] = util
window["config"] = config
window["popup"] = popup
window["moment"] = moment
window["JsonFormater"] = JsonFormater

/*--------------------------------------------dom操作 相关 -------------------------------------------------------*/
/*  new Date().date('y-m-d h:i:s'); => 2015-11-02 17:11:55
	new Date(115165165165).date('y-m-d') => 2015-11-02
*/
Date.prototype.date = function(format) {
	var
		year = this.getFullYear(),
		month = util.getZero(this.getMonth() + 1),
		day = util.getZero(this.getDate()),
		hour = util.getZero(this.getHours()),
		minute = util.getZero(this.getMinutes()),
		second = util.getZero(this.getSeconds()),
		json = {
			'y': year,
			'm': month,
			'd': day,
			'h': hour,
			'i': minute,
			's': second
		};
	return !format ? year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second : format.replace(/y|m|d|h|i|s/g, function(str) {
		return json[str];
	});
};

/*---------- start 布局写入  ------------*/
window == window.top && document.write('<div id="loading"></div>');
/*---------- end 布局写入    ------------*/

/*--------------------------------------------dom操作 相关 end -------------------------------------------------------*/

window.router = new VueRouter({
	routes: routes
})

//设置title
router.beforeEach((to, from, next) => {
	$("#content").hide()
	document.title = to.meta.title || '启明星'
	window.scrollTo(0, 0)
	next()
})
router.afterEach((to, from, next) => {
	$("#content").fadeIn()
})

const app = new Vue(Vue.util.extend({
	router,
}, App))

// 从而让整个应用都有路由功能
app.$mount('#app')