import {
    util,
    mysql,
    getsql
} from '../tool'

class common {

    constructor() {}

    // 新增模板
    async addTemp(ctx) {
        try {
            let tempName = ctx.request.body.tempName
            let tempVal = ctx.request.body.tempVal

            if (!tempName || !tempVal) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });
                return
            }

            let sql = getsql.INSERT({
                table: 'temp',
                fields: [{
                    tempName
                }, {
                    tempVal
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


    // 查询所有模板
    async getTempList(ctx) {
        try {
            let sql = getsql.SELECT({
                table: 'temp',
                fields: ['tempName', 'tempVal']
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