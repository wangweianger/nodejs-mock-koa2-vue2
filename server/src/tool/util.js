import md5 from 'md5'
import {
    SYSTEM
} from '../config'

//config配置
class util {

    constructor() {

        }
        // 返回结果json
    result(jn = {}) {
        return {
            code: jn.code || 1000,
            desc: jn.desc || '成功',
            data: jn.data || ''
        }
    }

    // 检查接口来源权限
    checkReferer(cxt) {
        let begin = false;
        let url = SYSTEM.ORIGIN
        let header = cxt.request.header

        url = SYSTEM.ORIGIN

        if (header.referer == url) {
            begin = true;
        }
        return begin;
    }

    // 验证域名来源、
    verSource(ctx) {
        let referer = this.checkReferer(ctx);
        if (!referer) {
            ctx.body = this.result({
                code: 1001,
                desc: '域名来源未通过！'
            });
            return false;
        } else {
            return true;
        }
    };

    // http 签名验证验证参数
    checkSiginHttp(ctx) {
        let datas = ctx.request.body

        if (!datas) {
            ctx.body = this.result({
                code: 1001,
                desc: '缺少必要的验证签名参数！'
            });
            return false;
        }

        let getSign = null;

        if (typeof(data) == 'string') {
            getSign = JSON.parse(datas.getSign)
        } else {
            getSign = datas.getSign
        }

        if (!getSign || !getSign.time || !getSign.random || !getSign.paySign) {
            return false;
        };
        let sigin = this.signwx({
            name: 'wangwei',
            company: 'morning-star',
            time: getSign.time,
            random: getSign.random
        });
        if (sigin.paySign === getSign.paySign) {
            return true;
        } else {
            ctx.body = this.result({
                code: 1001,
                desc: '签名验证未通过！'
            });
            return false;
        }
    };

    /*本地加密算法*/
    signwx(json) {
        var wxkey = 'ZANEWANGWEI123456AGETEAMABmiliH';
        /*对json的key值排序 */
        var arr = [];
        var sortJson = {};
        var newJson = json;
        for (var key in json) {
            if (json[key]) {
                arr.push(key);
            }
        }
        arr.sort(function(a, b) {
            return a.localeCompare(b);
        });
        for (var i = 0, len = arr.length; i < len; i++) {
            sortJson[arr[i]] = json[arr[i]]
        }
        /*拼接json为key=val形式*/
        var str = "";
        for (var key in sortJson) {
            str += key + "=" + sortJson[key] + '&';
        }
        str += 'key=' + wxkey;
        /*md5*/
        var md5Str = md5(str);
        var signstr = md5Str.toUpperCase();
        /*获得有sign参数的json*/
        newJson['paySign'] = signstr;
        return newJson;
    }

    //返回备注
    returnBeiZhu(str) {
        return `
            --------------------------------------------------------------------------------------------------------------------
            --------------------------------------------------------------------------------------------------------------------
            --------------------------------------------------------------------------------------------------------------------
            --------------------------------------------------------------------------------------------------------------------
            --------------------------------------------------${str}---------------------------------------------
            --------------------------------------------------------------------------------------------------------------------
            --------------------------------------------------------------------------------------------------------------------
            --------------------------------------------------------------------------------------------------------------------
            --------------------------------------------------------------------------------------------------------------------
        `
    }

    // 处理JSON
    chuliJsonToBegin(needArr = []) {
        if (!needArr.length) return;
        let data = {}

        for (let i = 0, len = needArr.length; i < len; i++) {
            if (needArr[i].childList && needArr[i].childList.length) {
                if (needArr[i].type == 'array(object)') {
                    data[needArr[i].requestEnName] = []
                    data[needArr[i].requestEnName].push(this.chuliJsonToBegin(needArr[i].childList))

                } else if (needArr[i].type == 'object') {
                    data[needArr[i].requestEnName] = this.chuliJsonToBegin(needArr[i].childList)
                }
            } else {
                data[needArr[i].requestEnName] = needArr[i].defaultVal
            }

        }

        return data
    }

}

module.exports = new util();