<style lang="sass" scoped>
    .nav{
        width:240px;
        height:auto;
        padding:25px 0;
        background:#f5f5f5;
        position:fixed;
        left:180px;
        top:51px;
        border-right:solid 1px #ccc;
        color:#333;
        .search{
            width:210px;
            height:35px;
            border-radius:35px;
            overflow:hidden;
            margin-left:20px;
            border:solid 1px #ddd;
            position:relative;
            input{
                width:165px;
                height:35px;
                padding-left:10px;
                border:none;
                border-right:solid 1px #ddd;
            }
            .clear{
                position:absolute;
                left:138px;
                top:5px;
                font-size:18px;
                cursor:pointer;
            }
            span.search-icon{
                display:inline-block;
                width:38px;
                height:35px;
                text-align:center;
                line-height:32px;
                font-weight:bold;
                font-size:20px;
                overflow:hidden;
                cursor:pointer;
            }
        }
        a{
            text-decoration: none;
        }
        .nav-two-item{
            font-size:14px;
            line-height:35px;
            .nav-title{
                padding-left:25px;
                &.active{
                    color:#fff;
                    background:#08c;
                }
                span{
                    cursor: pointer;
                }
                span.iconfont{
                    margin-left:-20px;
                    font-size:15px;
                    font-weight:bold;
                }
            }
            .nav-two-box{
                line-height:30px;
                font-size:13px;
                margin-left:20px;
                // display:none;
                a{
                    color:#333;
                }
                .nav-list{
                    padding:2px 10px 2px 15px;
                    &.active{
                        a{color:#fff;}
                        background:#08c;
                    }
                    .nav-list-two{
                        margin-left:-15px;
                        .iconfont{
                            font-size:15px;
                            font-weight:bold;
                        }
                    }
                    .nav-two-box-two{
                        // display:none;
                    }
                }
                .nav-three{
                    line-height:20px;
                    padding:2px 5px;
                    &.active{
                        a{color:#fff;}
                        background:#08c;
                    }
                }
            }
        }
        .block{
            color:#50a1e8;
            cursor:pointer;
            text-align:center;
            span{
                font-size:18px;
            }
            a{color:#50a1e8;}
        }
        .isActive{
            background:#5974d9;
            color:#fff;
            a{
                color:#fff!important;
            }
        }
    }
</style>

<template>
<div id="nav-two" class="nav nav-two">
    <div class="search mb10">
        <input type="text" v-model.trim="apiUrl" placeholder="传空查询所有导航栏">
        <span v-if="apiUrl" class="clear iconfont" @click="apiUrl=''">&#xe608;</span>
        <span class="iconfont search-icon" @click="searchApiFn">&#xe615;</span>
    </div>
    <div v-for="item in navLlistData">
        <div class="nav-two-item" v-if="item.type!='mulu'">
            <div class="nav-title " :class="{'isActive':item.isActive?true:false}">
                <router-link 
                    :to="{name:'projectdetail',params:{projectId:projectId,apiId:item.id}}" tag='span'>
                    <span class="title" >{{item.title}}</span>
                </router-link>
            </div>
        </div>
        <div class="nav-two-item" v-if="item.type=='mulu'">
            <div class="nav-title" @click="slideSome(item)">
                <span class="iconfont">{{!item.isOpen?'&#xe61e;':'&#xe61c;'}}</span><span class="title">{{item.name}}</span>
            </div>
            <ul class="nav-two-box" v-show="item.isOpen" v-for="(item1,index) in item.child" :key="index">
                <li class="nav-list nav-two-list" v-if="item1.type!='mulu'" :class="{'isActive':item1.isActive?true:false}">
                    <router-link 
                        :to="{name:'projectdetail',params:{projectId:projectId,apiId:item1.id}}">{{item1.title}}</router-link>
                </li>
                <li class="nav-list nav-three-list" v-if="item1.type=='mulu'">
                    <p class="nav-list-two cursor" @click="slideSome(item1)">
                        <span class="iconfont" aria-hidden="true">{{!item1.isOpen?'&#xe61e;':'&#xe61c;'}}</span>
                        {{item1.name}}
                    </p>
                    <ul class="nav-two-box-two nav-two-box" v-show="item1.isOpen">
                        <li class="nav-list nav-three" v-for="item2 in item1.child" :class="{'isActive':item2.isActive?true:false}">
                            <router-link 
                                :to="{name:'projectdetail',params:{projectId:projectId,apiId:item2.id}}">{{item2.title}}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="block">
        <router-link :to="{name:'projectEdit',params:{projectId:projectId}}"><span class="iconfont">&#xe616;</span>新建页面</router-link>
    </div>
    <div class="block">
        <router-link :to="{name:'projectCatalog',params:{projectId:projectId}}"><span class="iconfont">&#xe607;</span>新建目录</router-link>
    </div>
</div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        components: {
        },
        data(){
            return {
                model:{
                    show:true,
                },
                projectId:'',
                location:location.href,
                apiUrl:'',
            }
        },
        computed: {
            ...mapState({
                navLlistData: state => {
                    let data = state.catalog.navLlistData
                    for(let i=0,len=data.length;i<len;i++){
                        if(data[i].child&&data[i].child.length){
                            for(let j=0,lenj=data[i].child.length;j<lenj;j++){
                                if(data[i].child[j].type=='mulu'){
                                    for(var k=0,lenk=data[i].child[j].child.length;k<lenk;k++){
                                        let href=`/#/project/projectdetail/${data[i].child[j].child[k].projectId}/${data[i].child[j].child[k].id}`
                                        if(location.href.indexOf(href) != -1){
                                            data[i].isOpen=true;
                                            data[i].child[j].isOpen=true;
                                            data[i].child[j].child[k].isActive=true;
                                        }
                                    }
                                }else{
                                    let href=`/#/project/projectdetail/${data[i].child[j].projectId}/${data[i].child[j].id}`
                                    if(location.href.indexOf(href) != -1){
                                        data[i].isOpen=true;
                                        data[i].child[j].isActive=true;
                                    }
                                }
                            }
                        }else{
                            let href=`/#/project/projectdetail/${data[i].projectId}/${data[i].id}`
                            console.log(href)
                            if(location.href.indexOf(href) != -1){
                                data[i].isActive=true;
                            }
                        }
                    };
                    return data
                },
            })
        },
        watch:{
            '$route'(){
                this.projectId=this.$router.history.current.params.projectId
                if(this.projectId){
                    this.getNavCommonTwoCatalog({ projectId:this.projectId});
                }
                setTimeout(()=>{
                    this.slideFn();
                },500);
            }
        },
        mounted() {
            this.$nextTick(()=>{
                let winHeight = $(window).height();
                $('#nav-two').css({height:winHeight-51+'px'})

            })
        },
        methods: {
            ...mapActions([
                'getNavCommonTwoCatalog',
            ]),
            slideFn(){
                // $('div.nav-two-item,li.nav-three-list').click(function(event){
                //     event.stopPropagation();
                //     let haveUl = $(this).find('ul')
                //     if(haveUl.length){
                //         $(this).children('.nav-two-box').slideToggle('fast');
                //     }else{
                //         $('.isActive').removeClass('active')
                //         $(this).children('.nav-title').addClass('active')
                //     }
                // })

                // $('div.nav-two-list,li.nav-three').click(function(event){
                //     event.stopPropagation();
                //     $('.isActive').removeClass('active')
                //     $(this).addClass('active')
                // })
            },
            slideSome(item){
                item.isOpen=!item.isOpen
            },
            searchApiFn(){
                if(!this.apiUrl){
                    this.getNavCommonTwoCatalog({ projectId:this.projectId,type:1});
                }else{
                    util.ajax({
                        url:config.baseApi+'api/api/searchApi',
                        data:{
                            apiUrl:this.apiUrl,
                            projectId:this.$router.history.current.params.projectId
                        },
                        success:data=>{
                            util.setStorage('session', 'navLlistData',JSON.stringify(data.data))
                            this.getNavCommonTwoCatalog({ projectId:this.projectId});
                            if(!data.data.length) return;
                            location.href=`/#/project/projectdetail/${this.projectId}/${data.data[0].id}`
                        }
                    })
                }
            },
        }
    }
</script>


