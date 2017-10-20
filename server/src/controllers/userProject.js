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