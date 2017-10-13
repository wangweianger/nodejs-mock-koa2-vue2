<style lang="sass" scoped>
   .main{
        
   }
</style>

<template>
<div class="container-fluid">
    <nav-bar><li slot="nav_two">项目列表/ </li></nav-bar>
    <div class="main mt30">
        <div class="mb20">
            <input type="text" class="form-control w-300 inline_block" v-model="search.username" placeholder="输入用户名查询">
            <button class="btn btn-success" @click="getList">查询用户</button>
            <button class="btn btn-danger fr" @click="addUserShow">新增用户</button>
        </div>
        <table class="table">
            <tr>
                <th class="tc">用户名</th>
                <th class="tc">秘钥</th>
                <th class="tc">用户级别</th>
                <th class="tc">操作</th>
            </tr>
            <tr v-for="item in datas">
                <td class="tc">{{item.username}}</td>
                <td class="tc">{{item.secret}}</td>
                <td class="tc">{{item.type}}</td>
                <td class="tc">
                    <button class="btn btn-danger" @click="updateUserItem(item)">修改</button>
                    <button class="btn btn-info" @click="selectProject(item)">分配系统</button>
                </td>
            </tr>
        </table>
        <div class="tr">
            <page :isSearch="search.isSearch" :now-page="search.page" :page-size="search.pageSize" :total-count="search.totalCount" @onPropsChange="change"></page>
        </div>    
    </div>   
    
    <select-project :isshow="model.isshow" :projectids="selectUser.projectIds" :callback="submitSelectUser" @onPropsChange="change"></select-project>    

    <!-- 新增项目 -->
    <modal
        :show='model.show'
        :callback='callback'
        title='新增项目'
        :width="'500'"
        @onPropsChange="change">
        <div class="tc mt20 mb20" slot="modal-body" >
            <!--弹出层-->
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">用户名称</label>
                    <div class="col-sm-10">
                        <input type="text" v-model="edit.username" class="form-control w-450" >
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">用户密码</label>
                    <div class="col-sm-10">
                        <input type="password" v-model="edit.password" class="form-control w-450" >
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">用户级别</label>
                    <div class="col-sm-10">
                        <select v-model="edit.type" class="form-control w-450">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    </modal>

</div>
</template>

<script>
    import navBar from 'components/navBar'
    import modal from 'components/modal'
    import page from 'components/page'
    import selectProject from './item/selectProject'
    
    export default {
        components: {
           navBar,
           modal,
           page,
           selectProject
        },
        data(){
            return {
                search:{
                    pageSize:config.pageSize,
                    page:this.$route.query.page||1,
                    username:'',
                    totalCount:0,
                    isSearch:false,
                },
                model:{
                    show:false,
                    isshow:false,
                },
                edit:{
                    id:'',
                    username:'',
                    password:'',
                    type:'user'
                },
                datas:[],
                selectUser:{},
            }
        },
        beforeMount(){
            $('#nav-two').hide()
            let navlistW=$('#nav-two').width()
            let display = $('#nav-two').css('display')
            let leftW=$('#left').width()
            if(display=='none') navlistW=0;
            $('#content').css({'marginLeft':navlistW+leftW+'px'})
        },
        watch:{
            '$route'(to){
                this.search.page = to.query.page;
                this.getList();
            },
        },
        mounted() {
            this.$nextTick(()=>{
                this.getList();
            })
        },
        methods: {
            change(prop,val){
                this['model'][prop]=val;
                this.search[prop]=val;
            },
            callback(){
                util.ajax({
                    url:config.baseApi+'api/user/editUser',
                    data:this.edit,
                    success:data=>{
                        this.model.show=false
                        this.getList();
                        popup.miss({'title':'操作成功!'})
                    }

                })
            },
            getList(){
                util.ajax({
                    url:config.baseApi+'api/user/getUserList',
                    data:{
                        pageSize:this.search.pageSize,
                        pageNo:this.search.pageNo,
                        username:this.search.username,
                    },
                    success:data=>{
                        this.datas=data.data.datalist;
                        this.search.totalCount=data.data.totalNum
                    }
                })
            },
            addUserShow(){
                this.model.show=true
                this.edit.id=''
                this.edit.username=''
                this.edit.password=''
            },
            updateUserItem(item){
                this.model.show=true
                this.edit=item
            },
            selectProject(item){
                this.model.isshow=true
                this.selectUser=item
            },
            submitSelectUser(result){
                let projectIds=''
                if(result.length){
                    projectIds=util.getArrsItems(result,'id')
                }
                util.ajax({
                    url:config.baseApi+'api/user/choseProject',
                    data:{
                        userId:this.selectUser.id,
                        projectIds:projectIds,
                    },
                    success:data=>{
                        this.model.isshow=false
                        popup.miss({title:'操作成功！'})
                    }
                })

            },
        }
    }
</script>


