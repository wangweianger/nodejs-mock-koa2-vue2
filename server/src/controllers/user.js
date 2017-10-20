import {
    SYSTEM
} from '../config'
import {
    util,
    mysql,
    getsql
} from '../tool'

class common {

    constructor() {

    }

    // 用户登录获得cookie
    async userLogin(ctx) {
        try {
            let username = ctx.request.body.username
            let password = ctx.request.body.password
            let cookies = ctx.cookie;

            ctx.cookies.set('koa:sess', '000', {
                path: '/',
                domain: '127.0.0.1',
            })


            if (!username.trim() || !password.trim()) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            // 检测用户是否存在
            let sql = getsql.SELECT({
                table: 'user',
                wheres: [{
                    username
                }],
            })
            let result = await mysql(sql)
            if (!result.length) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "用户名不存在"
                });
                return;
            }

            //存在 检测密码是否正确
            if (result[0].password != password) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "登录密码有误"
                });
                return;
            }

            let suid = result[0].secret
            ctx.body = util.result({
                data: {
                    datas: result,
                    token: suid
                }
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

    // 获得用户列表
    async getUserList(ctx) {
        try {
            let pageSize = ctx.request.body.pageSize || SYSTEM.PAGESIZE
            let pageNo = ctx.request.body.pageNo || 1
            let username = ctx.request.body.username
            let arr = [];

            if (username) {
                arr.push({
                    username
                })
            }

            // ----------------   查询总条数 sql   -------------------------
            let totalSql = getsql.SELECT({
                table: 'user',
                wheres: arr,
                iscount: true,
            })
            let totalNum = (await mysql(totalSql))[0]['COUNT(*)']

            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'user',
                wheres: arr,
                limit: {
                    pageNo,
                    pageSize
                },
                sort: 'id',
                isdesc: true,
            })

            let result = await mysql(sql)

            ctx.body = util.result({
                data: {
                    pageSize: pageSize,
                    pageNo: pageNo,
                    totalNum: totalNum,
                    datalist: result,
                }
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

    // 修改｜新增 用户
    async editUser(ctx) {
        try {
            let id = ctx.request.body.id
            let username = ctx.request.body.username
            let password = ctx.request.body.password

            if (!username.trim() || !password.trim()) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let secret = util.signwx({
                username: username,
                password: password
            }).paySign

            let sql = ""
            if (id) {
                // 表示修改
                sql = getsql.UPDATE({
                    table: 'user',
                    fields: [{
                        username
                    }, {
                        password
                    }, {
                        secret
                    }],
                    wheres: [{
                        id
                    }]
                })
            } else {
                // 表示新增
                sql = getsql.INSERT({
                    table: 'user',
                    fields: [{
                        username
                    }, {
                        password
                    }, {
                        secret
                    }]
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

    // 修改用户密码
    async updatePassword(ctx) {
        try {
            let username = ctx.request.body.username
            let oldPassword = ctx.request.body.oldPassword
            let newPassword = ctx.request.body.newPassword

            // 检测用户是否存在
            let sql = getsql.SELECT({
                table: 'user',
                wheres: [{
                    username
                }],
            })
            let result = await mysql(sql)
            if (!result.length) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "用户名不存在"
                });
                return;
            }
            if (result[0].password != oldPassword) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "原始密码有误"
                });
                return;
            }

            let upsql = getsql.UPDATE({
                table: 'user',
                fields: [{
                    password: newPassword
                }],
                wheres: [{
                    username
                }]
            })
            let upresult = await mysql(upsql)
            ctx.body = util.result({
                data: upresult
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

    // 用户绑定的系统
    async choseProject(ctx) {
        try {
            let userId = ctx.request.body.userId
            let projectIds = ctx.request.body.projectIds

            if (!userId) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = getsql.UPDATE({
                table: 'user',
                fields: [{
                    projectIds
                }],
                wheres: [{
                    id: userId
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