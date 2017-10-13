import {
    util,
    mysql,
    getsql
} from '../tool'
import API from './api'
import catalog from './catalog'

class common {

    constructor() {

    }

    // 验证用户是否登录 && 验证签名
    async checkRequestUrl(ctx, next) {
        // let verSource = util.verSource(ctx)

        let checkSigin = util.checkSiginHttp(ctx);
        let token = ctx.request.header.token

        if (!checkSigin) {
            ctx.body = util.result({
                code: 1003,
                desc: "签名有误!"
            });
            return
        }

        if (!token) {
            ctx.body = util.result({
                code: 1003,
                desc: "用户未登录!"
            });
            return
        }
        let username = token.split('-')[1]
        let secret = token.split('-')[0]
        let sqluser = getsql.SELECT({
            table: 'user',
            wheres: [{
                username
            }, ]
        })
        let userDatas = await mysql(sqluser)
        if (!userDatas.length) {
            ctx.body = util.result({
                code: 1003,
                desc: "用户不存在!"
            });
            return
        }
        if (userDatas[0].secret != secret) {
            ctx.body = util.result({
                code: 1003,
                desc: "用户未登录!"
            });
            return
        }

        return next();
    };

    // 验证签名 
    async checkIsUserLogin(ctx, next) {
        let checkSigin = util.checkSiginHttp(ctx);
        if (checkSigin) {
            return next();
        } else {
            console.log('签名有误')
        }
    }

    // 获得nav list 
    async getNavCommonTwoCatalog(ctx) {
        try {
            let twoCatalogId = ctx.request.body.twoCatalogId ? ctx.request.body.twoCatalogId : 0;
            let threeCatalogId = ctx.request.body.threeCatalogId ? ctx.request.body.threeCatalogId : 0;
            let parentId = ctx.request.body.parentId ? ctx.request.body.parentId : 0
            let projectId = ctx.request.body.projectId


            if (!projectId) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let catalogDataList = await API.apiNavPojectList(ctx, projectId, 2, twoCatalogId, threeCatalogId) || []; // 获得页面
            let pageDataList = await catalog.getNavCatalogList(ctx, projectId, 2, parentId) || []; // 获得目录 

            for (let i = 0, len = pageDataList.length; i < len; i++) {
                let item = pageDataList[i]
                let catalogDataList1 = await API.apiNavPojectList(ctx, projectId, 2, item.id, threeCatalogId) || [];
                let pageDataList1 = await catalog.getNavCatalogList(ctx, projectId, 2, item.id) || [];

                item['child'] = catalogDataList1.concat(pageDataList1)
                item['isOpen'] = false
                item['type'] = 'mulu'

                for (let j = 0, lenj = pageDataList1.length; j < lenj; j++) {
                    let item1 = pageDataList1[j]
                    if (!item1) continue;
                    let catalogDataList2 = await API.apiNavPojectList(ctx, projectId, 2, item1.parentId, item1.id) || [];
                    item1['child'] = catalogDataList2
                    item1['isOpen'] = false
                    item1['type'] = 'mulu'
                }

            };

            let result = catalogDataList.concat(pageDataList)

            ctx.body = util.result({
                data: result
            });

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
            return;
        }
    };

    // 一级类目下面的二级类目
    async getThreeCatalog(ctx) {
        try {
            let parentId = ctx.request.body.parentId
            if (!parentId.trim()) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = getsql.SELECT({
                table: 'catalog',
                wheres: [{
                    parentId
                }, ]
            })

            let result = await mysql(sql)
            ctx.body = util.result({
                data: result
            });

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
            return;
        }
    };

}

module.exports = new common();