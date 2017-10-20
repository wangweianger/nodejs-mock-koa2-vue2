import KoaRouter from 'koa-router'
import controllers from '../controllers'
import url from 'url'
import {
	util
} from '../tool'


const router = new KoaRouter()

// 请求接口校验中间件
const checkfn = controllers.common.checkRequestUrl;
const userLogin = controllers.common.checkIsUserLogin;


/*---------------------------------------项目相关---------------------------------------------*/

// 获得用户项目列表
router.post('/api/project/getProjectList', checkfn, controllers.project.getProjectList)

// 获得所有项目列表
router.post('/api/project/getAllProject', checkfn, controllers.project.getAllProject)

// 新增|修改 项目
router.post('/api/project/editProject', checkfn, controllers.project.editProject)

// 项目详情
router.post('/api/project/getProjectDetail', checkfn, controllers.project.getProjectDetail)


/*---------------------------------------目录相关---------------------------------------------*/

//获得所有目录
router.post('/api/catalog/getCatalogList', checkfn, controllers.catalog.getCatalogList)

//新建 | 编辑 目录 
router.post('/api/catalog/editCatalog', checkfn, controllers.catalog.editCatalog)

//删除目录 
router.post('/api/catalog/deleteCatalog', checkfn, controllers.catalog.deleteCatalog)

// 查询项目下所有的一级类目
router.post('/api/catalog/getNavCatalogList', checkfn, controllers.catalog.getNavCatalogList)


/*---------------------------------------API相关---------------------------------------------*/

// 获得接口nav列表
router.post('/api/api/apiNavPojectList', checkfn, controllers.api.apiNavPojectList)

// 编辑api详情
router.post('/api/api/editApiDetail', checkfn, controllers.api.editApiDetail)

// 获得api详情
router.post('/api/api/getApiDetails', checkfn, controllers.api.getApiDetails)

// 删除api
router.post('/api/api/deleteItemApi', checkfn, controllers.api.deleteItemApi)

// 搜索api
router.post('/api/api/searchApi', checkfn, controllers.api.searchApi)

/*---------------------------------------common 相关---------------------------------------------*/

// 获得左侧列表
router.post('/api/common/getNavCommonTwoCatalog', checkfn, controllers.common.getNavCommonTwoCatalog)


/*---------------------------------------用户 相关---------------------------------------------*/
// 获得左侧列表
router.post('/api/user/getUserList', checkfn, controllers.user.getUserList)

// 新增｜修改 用户
router.post('/api/user/editUser', checkfn, controllers.user.editUser)

// 用户登录
router.post('/api/user/userLogin', userLogin, controllers.user.userLogin)

// 修改密码
router.post('/api/user/updatePassword', checkfn, controllers.user.updatePassword)


/*---------------------------------------用户关联项目---------------------------------------------*/
// 用户绑定的系统
router.post('/api/user/choseProject', checkfn, controllers.user.choseProject)


/*---------------------------------------用户模板---------------------------------------------*/

// 查询所有模板
router.post('/api/temp/getTempList', checkfn, controllers.temp.getTempList)

// 新增模板
router.post('/api/temp/addTemp', checkfn, controllers.temp.addTemp)


/*---------------------------------------处理所有接口---------------------------------------------*/
// 所有请求返回
router.all('*', async function(ctx) {
	let arr = ctx.request.url.split('/');
	let projectName = arr[1];
	let apiUrl 		= arr.slice(2).join('/');
		apiUrl 		= apiUrl.split('?')[0];

	let result 		= await controllers.api.getAllApiForProName(ctx, projectName,apiUrl);
		result 		= result[0]
	let resultStr 	= result.restype===1?JSON.parse(result.response):result.response

	ctx.body = util.result({
		data: resultStr
	});
})

module.exports = router