// 模块路由设置
module.exports = [{
		path: '/project/projectList',
		name: 'projectList',
		meta: {
			title: '项目列表',
		},
		component: resolve => require(['./projectList.vue'], resolve)
	}, {
		path: '/project/projectdetail/:projectId/:apiId',
		name: 'projectdetail',
		meta: {
			title: '项目详情',
		},
		component: resolve => require(['./projectdetail.vue'], resolve)
	}, {
		path: '/project/projectEdit/:projectId',
		name: 'projectEdit',
		meta: {
			title: '项目编辑',
		},
		component: resolve => require(['./projectEdit.vue'], resolve)
	}, {
		path: '/project/projectCatalog/:projectId',
		name: 'projectCatalog',
		meta: {
			title: '目录编辑',
		},
		component: resolve => require(['./projectCatalog.vue'], resolve)
	}, {
		path: '/project/projectNav/:projectId',
		name: 'projectNav',
		meta: {
			title: '项目导航',
		},
		component: resolve => require(['./projectNav.vue'], resolve)
	},

]