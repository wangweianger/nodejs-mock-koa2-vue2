//router.js 路由集合
import common from 'common/js/common'

//默认首页路由
const route = [{
	path: '/',
	name: 'home',
	meta: {
		title: '首页home',
	},
	component: resolve => require(['commonvue/index.vue'], resolve)
}, ]


//合并路由
var routes = route.concat(
	require('pages/index/router'),
	require('pages/project/router'),
	require('pages/user/router'),
)

module.exports = routes;