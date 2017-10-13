<style lang="sass" scoped>
   .main{
        .block{
            overflow:hidden;
            a{
                width:180px;
                height:180px;
                text-decoration: none;
                display:block;
                float:left;
                text-align:center;
                border:solid 1px #ddd;
                margin-right:20px;
                font-size:22px;
                color:#fff;
                position:relative;
                &:nth-child(odd){
                    background:orange;
                }
                &:nth-child(even){
                    background:#49eaa0;
                }
                span{
                    margin-top: 25px;
                    color:#757479;
                    font-size: 45px;
                    display:block;
                }
                .edit-icon{
                    position:absolute;
                    top:-20px;
                    font-size:22px;
                    color:#777;
                    &.edit-icon-1{
                        right:10px;
                    }
                }
                p{
                    font-size:12px;
                }
            }
            li{
                width:180px;
                height:180px;
                text-align:center;
                font-size:20px;
                color:#aaa;
                line-height:180px;
                display:inline-block;
                border:solid 1px #ddd;
                cursor:pointer;
                span{
                    font-weight:bold;
                }
            }
        }
   }
</style>

<template>
<div class="container-fluid">
    <nav-bar><li slot="nav_two">项目列表/ </li></nav-bar>
    <div class="main mt50">
        <div class="block mb30">
            <input type="text" v-model="searchName" class="form-control w-200 inline_block" placeholder="输入项目名搜索">
            <button class="btn btn-primary" @click="getProjectList">搜索</button>
        </div>
        <div class="block">
            <a href="javascript:" v-for="item in datas" @click="clearnavLlistData(item)">
                <span class="iconfont">&#xe625;</span>
                <span @click.stop="updateProject(item)" class="edit-icon edit-icon-1 iconfont">&#xe62b;</span>
                {{item.projectName}}
                <p>{{item.projectDescribe}}</p>
            </a>
            <li class="iconfont" @click="model.show=true">
                新建项目
                <span>+</span>
            </li>
        </div>
    </div>   

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
                    <label for="inputEmail3" class="col-sm-3 control-label">项目中文名</label>
                    <div class="col-sm-9">
                        <input type="text" v-model.trim="edit.projectName" class="form-control w-400" placeholder="OMS订单系统">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-3 control-label">项目英文名</label>
                    <div class="col-sm-9">
                        <input type="text" v-model.trim="edit.projectEnName" class="form-control w-400" placeholder="oms 项目名最好不要重复">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-3 control-label">项目描述</label>
                    <div class="col-sm-9">
                        <input type="text" v-model.trim="edit.projectDescribe" class="form-control w-400" placeholder="核心系统，推海关，推国检...">
                    </div>
                </div>
            </form>
        </div>
    </modal>

</div>
</template>

<script>
    import { mapState } from 'vuex'
    import navBar from 'components/navBar'
    import modal from 'components/modal'
    
    export default {
        components: {
           navBar,
           modal,
        },
        data(){
            return {
                model:{
                    show:false,
                },
                searchName:'',
                edit:{
                    projectName:'',
                    projectDescribe:'',
                    projectEnName:'',
                },
                datas:[],
            }
        },
        computed: {
            ...mapState({
                leftBarToggle: state => state.catalog.leftBarToggle,
            })
        },
        watch:{
            '$route'(){
                $('#nav-two').hide();
                $('#content').css({'marginLeft':'180px'});
            },
        },
        beforeMount(){
            $('#nav-two').hide()
            let navlistW=$('#nav-two').width()
            let display = $('#nav-two').css('display')
            let leftW=$('#left').width()
            if(display=='none') navlistW=0;
            $('#content').css({'marginLeft':navlistW+leftW+'px'})
        },
        mounted() {
            this.$nextTick(()=>{
                this.getProjectList()

                let navlistW=$('#nav-two').width()
                let display = $('#nav-two').css('display')
                if(display=='none') navlistW=0;
                $('#left-nav').find('ul.nav-box').removeClass('slideUl');
                $('#left').css({'width':'180px'})
                $('#content').css({'marginLeft':180+navlistW+'px'})
                this.$store.dispatch('setLeftBarToggle',{value:false})
                $('.left_color').removeClass('active')
                $('div.nav-two').css({left:'180px'})
            })
        },
        methods: {
            change(prop,val){
                this['model'][prop]=val;
            },
            // 获得项目列表
            getProjectList(){
                util.ajax({
                    url:config.baseApi+'api/project/getProjectList',
                    data:{
                        projectName:this.searchName
                    },
                    success:data=>{
                        this.datas=data.data
                    }
                })
            },
            callback(){
                if(!this.edit.projectName){
                    popup.alert({title:'请填写项目名称!'});
                    return false;
                }
                if(!this.edit.projectEnName){
                    popup.alert({title:'请填写项目英文名称!'});
                    return false;
                }

                util.ajax({
                    url:config.baseApi+'api/project/editProject',
                    data:this.edit,
                    success:data=>{
                        this.getProjectList();
                        this.model.show=false;
                        popup.miss({title:'操作成功!'})
                    }
                })
            },
            updateProject(item){
                this.edit=item;
                this.model.show=true;
            },
            clearnavLlistData(item){
                let navlistW=$('#nav-two').width()
                let display = $('#nav-two').css('display')
                if(display=='none') navlistW=0;
                if(this.leftBarToggle){
                    $('#left-nav').find('ul.nav-box').removeClass('slideUl');
                    $('#left').css({'width':'180px'})
                    $('#content').css({'marginLeft':180+navlistW+'px'})
                    this.$store.dispatch('setLeftBarToggle',{value:false})
                    $('.left_color').removeClass('active')
                    $('div.nav-two').css({left:'180px'})
                }else{
                    $('#left-nav').find('ul.nav-box').addClass('slideUl');
                    $('#left').css({'width':'45px'})
                    $('#content').css({'marginLeft':45+navlistW+'px'})
                    this.$store.dispatch('setLeftBarToggle',{value:true})
                    $('.left_color').addClass('active')
                    $('div.nav-two').css({left:'45px'})
                }

                util.setStorage('session','navLlistData','')
                this.$router.push({name:'projectNav',params:{projectId:item.id}})
            }
            
        }
    }
</script>


