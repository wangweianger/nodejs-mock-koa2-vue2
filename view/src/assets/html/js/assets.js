import util from 'common/js/util'
import config from 'common/js/config'
import popup from 'popup'
require('common/js/jquery.cookie.js')

// 设置背景色
var bg = require('common/images/bg.png')
$('#html').css({
    background: `url(${bg}`
})
var redirecturl = util.getQueryString('redirecturl');


var app = new Vue({
    el: '#login',
    data: {
        username: '',
        password: '',
    },
    mounted() {
        this.$nextTick(() => {
            document.onkeydown = (event => {
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode == 13) { // enter 键
                    this.logingoing();
                }
            });
        })
    },
    methods: {
        // 登录
        logingoing() {
            if (!util.regCombination('*').test(this.username)) {
                popup.alert({
                    title: '请填写用户名'
                });
                return false;
            }
            if (!util.regCombination('*').test(this.password)) {
                popup.alert({
                    title: '请填写密码'
                });
                return false;
            }
            util.ajax({
                url: config.baseApi + 'api/user/userLogin',
                data: {
                    username: this.username,
                    password: this.password
                },
                success: (data => {
                    if (data.data.token) {
                        $.cookie('zane:suid', data.data.token, {
                            path: '/',
                        })
                    };
                    let datas = data.data.datas[0]
                    util.setStorage('local', 'userLeaver', datas.type)
                    util.setStorage('local', 'userMsg', JSON.stringify(datas))

                    location.href = "/#/project/projectList";
                })
            })
        },
    }
})