// 模块路由设置
module.exports = [{
	path: '/user/userList',
	name: 'userList',
	meta: {
		title: '项目列表',
	},
	component: resolve => require(['./userList.vue'], resolve)
}, {
	path: '/user/userUpdatePass',
	name: 'userUpdatePass',
	meta: {
		title: '密码修改',
	},
	component: resolve => require(['./userUpdatePass.vue'], resolve)
}, ]