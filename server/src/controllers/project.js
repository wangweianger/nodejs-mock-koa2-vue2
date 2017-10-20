import {
    util,
    mysql,
    getsql
} from '../tool'

class common {

    constructor() {

    }

    // 获得项目列表
    async getProjectList(ctx, next) {
        try {
            let isDetele = 0
            let projectName = ctx.request.body.projectName
            let arr = [{
                isDetele
            }]

            let token = ctx.request.header.token
            let username = token.split('-')[1]

            // 获得用户信息 并获得用户所拥有的系统
            let projectIds = ''
            let usersql = getsql.SELECT({
                table: 'user',
                wheres: [{
                    username
                }],
            })
            let userResult = await mysql(usersql)
            if (userResult.length) {
                projectIds = userResult[0].projectIds
            }

            // 获得所有系统
            if (projectName) {
                arr.push({
                    projectName,
                    'like': true
                })
            }
            let sqlProject = getsql.SELECT({
                table: 'project',
                wheres: arr
            })

            let projectResult = await mysql(sqlProject);
            let result = []

            for (let i = 0, len = projectResult.length; i < len; i++) {
                if (projectIds.indexOf(projectResult[i].id) != -1) {
                    result.push(projectResult[i])
                }
            }

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

    // 获得所有项目列表
    async getAllProject(ctx, next) {
        try {
            let isDetele = 0
            let projectName = ctx.request.body.projectName
            let arr = [{
                isDetele
            }]

            // 获得所有系统
            if (projectName) {
                arr.push({
                    projectName,
                    'like': true
                })
            }
            let sql = getsql.SELECT({
                table: 'project',
                wheres: arr
            })

            let result = await mysql(sql);

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

    // 修改项目名称
    async editProject(ctx) {
        try {
            let id = ctx.request.body.id
            let projectName = ctx.request.body.projectName
            let projectDescribe = ctx.request.body.projectDescribe
            let projectEnName = ctx.request.body.projectEnName

            if (!projectName.trim()) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = ""
            if (id) {
                // 表示修改
                sql = getsql.UPDATE({
                    table: 'project',
                    fields: [{
                        projectName
                    }, {
                        projectDescribe
                    }, {
                        projectEnName
                    }],
                    wheres: [{
                        id
                    }]
                })
            } else {
                // 表示新增
                sql = getsql.INSERT({
                    table: 'project',
                    fields: [{
                        projectName
                    }, {
                        projectDescribe
                    }, {
                        projectEnName
                    }]
                })
            }

            let result = await mysql(sql)

            let insertId = result.insertId
            let token = ctx.request.header.token
            let username = token.split('-')[1]
            let sqluser = getsql.SELECT({
                table: 'user',
                wheres: [{
                    username
                }, ]
            })
            let userDatas = await mysql(sqluser)
            let projectIds = userDatas[0].projectIds
            projectIds = projectIds + ',' + insertId

            await mysql(getsql.UPDATE({
                table: 'user',
                fields: [{
                    projectIds
                }],
                wheres: [{
                    username
                }]
            }))

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

    // 获得项目详情
    async getProjectDetail(ctx) {
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
                table: 'project',
                fields: ['id', 'projectEnName'],
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