import {
    util,
    mysql,
    getsql
} from '../tool'

class common {

    constructor() {

    }

    // 获得列表
    async getCatalogList(ctx) {
        try {
            let projectId = ctx.request.body.projectId

            if (!projectId) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = getsql.SELECT({
                table: 'catalog',
                wheres: [{
                    projectId
                }]
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

    // 获得项目目录列表
    async getNavCatalogList(ctx, projectId = 0, type = 1, parentId = 0) {
        try {
            if (type == 1) {
                projectId = ctx.request.body.projectId
                parentId = ctx.request.body.parentId ? ctx.request.body.parentId : 0
            } else if (type == 2) {
                projectId = projectId
                parentId = parentId
            }

            if (!projectId) {
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
                }, {
                    projectId
                }]
            })

            let result = await mysql(sql)

            if (type == 1) {
                ctx.body = util.result({
                    data: result
                });
            } else if (type == 2) {
                return result
            }

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
            return;
        }
    };

    // 新增 ｜ 修改
    async editCatalog(ctx) {
        try {
            let id = ctx.request.body.id
            let name = ctx.request.body.name
            let parentId = ctx.request.body.parentId
            let projectId = ctx.request.body.projectId

            if (!name.trim()) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let arr = [{
                name
            }, {
                projectId
            }]
            if (parentId + '') {
                arr.push({
                    parentId
                })
            }

            let sql = ""
            if (id) {
                // 表示修改
                sql = getsql.UPDATE({
                    table: 'catalog',
                    fields: arr,
                    wheres: [{
                        id
                    }]
                })
            } else {
                // 表示新增
                sql = getsql.INSERT({
                    table: 'catalog',
                    fields: arr
                })
            }

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
    }

    // 删除
    async deleteCatalog(ctx) {
        try {
            let id = ctx.request.body.id

            if (!id) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = getsql.DELETE({
                table: 'catalog',
                wheres: [{
                    id
                }]
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
    }


}

module.exports = new common();