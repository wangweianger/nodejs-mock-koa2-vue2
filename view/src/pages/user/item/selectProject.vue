<style lang="sass" scoped>
   .main{
        width: 100%;
        height: 10000px;
        left: 0;
        top: -100px;
        position:fixed;
        background:rgba(0,0,0,.5);
        z-index:100000;
        .fixed{
            width:750px;
            height:500px;
            background:#fff;
            position:fixed;
            left:50%;
            top:50%;
            margin:-300px 0 0 -300px;
            box-shadow:0 0 5px 3px rgba(0,0,0,.5);
            h1{
                font-size:16px;
                border-bottom:solid 1px #ddd;
                line-height:45px;
                padding:0 20px;
            }
            .content{
                padding:20px;
                height:360px;
                overflow:auto;
                ul{
                    overflow:auto;
                    li{
                        display:inline-block;
                        margin-right:20px;
                        label{
                            font-size:16px;
                            font-weight:300;
                        }
                    }
                }
            }
         }
   }
</style>

<template>
<div class="container-fluid">
    <div class="main mt30" v-show="p_isshow">
        <div class="fixed">
            <h1>分配系统</h1>
            <div class='content'>
                <div class="tc">
                    <input type="text" class="form-control w-300 inline_block" v-model="search.projectName" placeholder="输入用系统编码查询">
                    <button class="btn btn-success mr20" @click="getList">查询</button>
                    <label><input type="checkbox" v-model="isAllSelect">全选</label>
                </div>
                <hr>
                <ul class="mt20">
                    <li v-for="item in projectList">
                        <label><input v-model="item.isSelect" type="checkbox">{{item.projectName+'-'+item.projectEnName}}</label>
                    </li>
                </ul>
            </div>
            <div class="tc">
                <button class="btn btn-primary mr20" @click="submit">确定</button>
                <button class="btn btn-default" @click="p_isshow=false">取消</button>
            </div>
        </div>
    </div>   
</div>
</template>

<script>
    import propsync from 'common/lib/mixin/propsync' 
    export default {
        components: {
        },
        props:{
            isshow:{
                type:null,
                default:false,
            },
            projectids:{
                type:String,
                default:'',
            },
            callback: {
                type: Function,
                default () {}
            },
        },
        data(){
            return {
                search:{
                    projectName:''
                },
                projectList:[],
                isAllSelect:false,
            }
        },
        mixins: [propsync],
        watch:{
            'isAllSelect'(){
                this.selectAll()
            },
            'p_projectids'(){
                for(let i=0,len=this.projectList.length;i<len;i++){
                    if(this.p_projectids.indexOf(this.projectList[i].id)!=-1){
                        this.projectList[i].isSelect=true
                    }else{
                        this.projectList[i].isSelect=false
                    }
                }
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.getProjectList()
            })
        },
        methods: {
            getList(){

            },
            getProjectList(){
                util.ajax({
                    url:config.baseApi+'api/project/getAllProject',
                    data:{
                        projectName:this.search.projectName
                    },
                    success:data=>{
                        util.pushKeVaInArr({
                            arr:data.data,
                            pushps:[{key:'isSelect',val:false}]
                        })
                        this.projectList=data.data
                    }
                })
            },
            selectAll(){
                if(this.isAllSelect){
                    for(let i=0,len=this.projectList.length;i<len;i++){
                        this.projectList[i].isSelect=true;
                    }
                }else{
                    for(let i=0,len=this.projectList.length;i<len;i++){
                        this.projectList[i].isSelect=false;
                    }
                }
                
            },
            submit(){
                let result=[];
                for(let i=0,len=this.projectList.length;i<len;i++){
                    if(this.projectList[i].isSelect){
                        result.push(this.projectList[i])
                    }
                }
                this.p_callback(result)
            },
        }
    }
</script>


