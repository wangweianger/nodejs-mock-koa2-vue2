import {
    util,
    mysql,
    getsql
} from '../tool'

class common {

    constructor() {}

    // 获得接口nav列表
    async apiNavPojectList(ctx, projectId, type = 1, twoCatalogId = 0, threeCatalogId = 0) {
        try {

            if (!projectId) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = getsql.SELECT({
                table: 'api',
                fields: ['id', 'title', 'projectId', 'twoCatalogId', 'threeCatalogId'],
                wheres: [{
                    projectId
                }, {
                    twoCatalogId
                }, {
                    threeCatalogId
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
    }

    // 获得编辑API
    async editApiDetail(ctx) {
        try {
            let id = ctx.request.body.id
            let title = ctx.request.body.title
            let projectId = ctx.request.body.projectId
            let projectName = ctx.request.body.projectName
            let twoCatalogId = ctx.request.body.twoCatalogId
            let threeCatalogId = ctx.request.body.threeCatalogId
            let apiUrl = ctx.request.body.apiUrl
            let text = ctx.request.body.text
            let html = ctx.request.body.html
            let briefDesc = ctx.request.body.briefDesc
            let request = ctx.request.body.request
            let response = ctx.request.body.response
            let requestjson = ctx.request.body.requestjson
            let restype = ctx.request.body.restype

            if (!title || !apiUrl) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = ""
            let arr = [{
                title
            }, {
                apiUrl
            }]
            if (projectId) {
                arr.push({
                    projectId
                }, {
                    projectName
                })
            }
            if (twoCatalogId) {
                arr.push({
                    twoCatalogId
                })
            }
            if (threeCatalogId) {
                arr.push({
                    threeCatalogId
                })
            }
            if (text) {
                arr.push({
                    text
                }, {
                    html
                })
            }
            if (briefDesc) {
                arr.push({
                    briefDesc
                })
            }
            if (request) {
                arr.push({
                    request
                }, {
                    requestjson
                })
            }
            if (response) {
                arr.push({
                    response
                })
            }
            if(restype){
                arr.push({
                    restype
                })
            }

            if (id) {
                // 表示修改
                sql = getsql.UPDATE({
                    table: 'api',
                    fields: arr,
                    wheres: [{
                        id
                    }]
                })
            } else {
                // 表示新增
                sql = getsql.INSERT({
                    table: 'api',
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

    // 获得Api详情
    async getApiDetails(ctx) {
        try {
            let id = ctx.request.body.id
            if (!id) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = getsql.SELECT({
                table: 'api',
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

    // 通过项目名查询所有Api
    async getAllApiForProName(ctx, projectName,apiUrl) {
        try {
            if (!projectName) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = getsql.SELECT({
                table: 'api',
                fields: ['apiUrl', 'request', 'response','restype'],
                wheres: [ {projectName},{apiUrl} ]
            })

            let result = await mysql(sql)

            return result

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
            return;
        }
    }

    // 通过apiUrl查询所有Api
    async searchApi(ctx) {
        try {
            let apiUrl = ctx.request.body.apiUrl
            let projectId = ctx.request.body.projectId

            if (!apiUrl || !projectId) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = getsql.SELECT({
                table: 'api',
                fields: ['id', 'title', 'projectId'],
                wheres: [{
                    projectId
                }, {
                    apiUrl,
                    'like': true
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

    // 删除api
    async deleteItemApi(ctx) {
        try {
            let id = ctx.request.body.id

            let sql = getsql.DELETE({
                table: 'api',
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