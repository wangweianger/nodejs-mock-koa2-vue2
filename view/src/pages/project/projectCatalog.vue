<style lang="sass" scoped>
   .main{
        .title{
            font-size:20px;
            margin-bottom:30px;
        }
        .block{
            overflow:hidden;
            margin-bottom:20px;
            .left{
                width:80px;
                float:left;
                line-height:35px;
            }
            button.btn-primary{
                margin-left:80px;
            }
            button.btn-danger{
                padding:0 10px;
                .iconfont{
                    font-size: 23px;
                }
            }
        }
        .content{
            .list{
                overflow:hidden;
                li{
                    display:inline-block;
                    padding:0px 8px;
                    background:#6684f1;
                    color:#fff;
                    border-radius:15px;
                    font-size:14px;
                    margin-right:10px;
                    margin-bottom:10px;
                    span{
                        font-size:20px;
                        
                    }
                    span.red{
                        margin-left:0px;
                    }
                }
            }
        }
   }
</style>

<template>
<div class="container-fluid">
    <nav-bar><li slot="nav_two">目录管理/ </li></nav-bar>
    <div class="main mt50">
        <h1 class="title">编辑目录</h1>
        <div class="block">
            <div class="left">目录名称：</div>
            <div class="right"><input class="form-control w-300" v-model.trim="edit.name" type="text"></div>
        </div>
        <div class="block">
            <div class="left">上级目录：</div>
            <div class="right">
                <select class="form-control w-300" v-model="edit.parentId">
                    <option value="">无</option>
                    <option :value="item.id" v-for="item in navCatalogList">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="block">
            <button class="btn btn-primary" @click="editCatalog">保存</button>
        </div>
        <hr class="mt30">
        <div class="content mt20">
            <h1 class="title">目录列表</h1>
            <div class="list">
                <li v-for="item in datas">{{item.name}}
                    <span @click="editItem(item)" class="iconfont cursor">&#xe62b;</span>
                    <span class="iconfont cursor red" @click="deleteCatalog(item)">&#xe605;</span>
                </li>
            </div>
        </div>

    </div>   
</div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import navBar from 'components/navBar'
    
    export default {
        components: {
           navBar,
        },
        data(){
            return {
                model:{
                    show:false,
                },
                edit:{
                    id:'',
                    name:'',
                    parentId:'',
                    projectId:this.$route.params.projectId,
                },
                datas:[],
            }
        },
        computed: {
            ...mapState({
                navCatalogList: state => state.catalog.navCatalogList,
            })
        },
        beforeMount(){
            let navlistW=$('#nav-two').width()
            let display = $('#nav-two').css('display')
            let leftW=$('#left').width()
            if(display=='none') navlistW=0;
            $('#content').css({'marginLeft':navlistW+leftW+'px'})
        },
        mounted() {
            this.$nextTick(()=>{
                this.getCatalogList()
                this.getNavCatalogList({ projectId:this.edit.projectId ,datatype:2});
            })
        },
        methods: {
            ...mapActions([
                'getNavCatalogList',
            ]),
            change(prop,val){
                this['model'][prop]=val;
            },
            callback(){

            },
            deleteItem(){

            },
            getCatalogList(){
                util.ajax({
                    url:config.baseApi+'api/catalog/getCatalogList',
                    data:{
                        projectId:this.$route.params.projectId,
                    },
                    success:data=>{
                        this.datas=data.data
                    }
                })
            },
            editCatalog(){
                if(!this.edit.name){
                    popup.alert({title:'请填写目录名称!'});
                    return false;
                }

                util.ajax({
                    url:config.baseApi+'api/catalog/editCatalog',
                    data:this.edit,
                    success:data=>{
                        this.edit.name=''
                        this.edit.parentId=''
                        
                        this.getCatalogList();
                        this.getNavCatalogList({ projectId:this.edit.projectId ,datatype:2});
                        this.$store.dispatch(
                            'getNavCommonTwoCatalog' , { 
                            projectId:this.$route.params.projectId,
                            type:1, 
                        })
                        popup.miss({title:'操作成功!'})
                    }
                })
            },
            editItem(item){
                this.edit.id=item.id
                this.edit.name=item.name
                this.edit.parentId=item.parentId||''
            },
            deleteCatalog(item){
                popup.confirm({title:'确定删除吗？',yes:()=>{
                    util.ajax({
                        url:config.baseApi+'api/catalog/deleteCatalog',
                        data:{
                            id:item.id
                        },
                        success:data=>{
                            this.getCatalogList();
                            this.getNavCatalogList({ projectId:this.edit.projectId ,datatype:2});
                            this.$store.dispatch(
                                'getNavCommonTwoCatalog' , { 
                                projectId:this.$route.params.projectId,
                                type:1, 
                            })
                            popup.miss({title:'操作成功!'})
                        }
                    })
                }})
            },
        }
    }
</script>


