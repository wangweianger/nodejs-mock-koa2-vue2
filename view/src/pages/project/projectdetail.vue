<style lang="sass" scoped>
    .container-fluid{
        font-size:15px;
    }
    .title{
        font-size:30px;
        margin-top:50px;
        position:relative;
        .edit{
            position:absolute;
            right:20px;
            top:10px;
            span{
                font-size:35px;
                color:#aaa;
                cursor:pointer;
            }
        }
    }
    .block{
        margin-bottom:20px;
        overflow:auto;
        .top{
            font-size:22px;
            margin-bottom:8px;
        }
        .bottom{
            .api-address{
                padding:5px 30px 5px 20px;
                background:#eddff3;
                color:red;
            }
        }
    }
    div.table{
        ul{
            overflow:hidden;
            border-top:solid 1px #fff;
            border-left:solid 1px #fff;
            width:1181px;
            &.head{
                background:#808080;
                line-height:30px;
                li{
                    height:30px;
                    color:#fff;
                }
            }
            li{
                float:left;
                padding:2px 10px;
                height:40px;
                border-right:solid 1px #fff;
                border-bottom:solid 1px #fff;
                overflow: hidden;
                .form-control{
                    height:35px;
                    border:none;
                    box-shadow:none;
                }
                &.t1{
                    width:120px;
                    position:relative;
                    padding-left:40px;
                    .zhedie{
                        position:absolute;
                        left:5px;
                        top:5px;
                    }
                }
                &.t2{
                    width:200px;
                }
                &.t3{
                    width:150px;
                }
                &.t4{
                    width:60px;
                }
                &.t5{
                    width:300px;
                }
                &.t6{
                    width:200px;
                }
                &.t7{
                    width:150px;
                }
            }
            &.one{
                background:#b8def5;
                border-top:none;
                li{
                    .form-control{
                        background:#b8def5;
                        border:none;
                        border-radius:none;
                    }
                }
            }
            &.child{
                background:#eddff3;
                border-top:none;
                li{
                    height:35px;
                    .form-control{
                        height:30px;
                        padding: 4px 12px;
                        background:#eddff3;
                        &.english-name{
                            padding-left:30px;
                        }
                    }
                    &.t1{
                        .zhedie{
                            left:35px;
                        }
                    }
                }
            }
            &.three-child{
                background:#d0ebf2;
                border-top:none;
                li{
                    height:33px;
                    .form-control{
                        height:28px;
                        padding: 2px 12px;
                        background:#d0ebf2;
                        &.english-name{
                            padding-left:60px;
                        }
                    }
                    &.t1{
                        .zhedie{
                            left:70px;
                        }
                    }
                }
            }
            &.four-child{
                background:#cfd1f7;
                border-top:none;
                li{
                    height:33px;
                    .form-control{
                        height:28px;
                        padding: 2px 12px;
                        background:#cfd1f7;
                        &.english-name{
                            padding-left:94px;
                        }
                    }
                    &.t1{
                        .zhedie{
                            left:90px;
                        }
                    }
                }
            }
            &.five-child{
                background:#e4e4ab;
                border-top:none;
                li{
                    height:33px;
                    .form-control{
                        height:28px;
                        padding: 2px 12px;
                        background:#e4e4ab;
                        &.english-name{
                            padding-left:120px;
                        }
                    }
                    &.t1{
                        .zhedie{
                            left:110px;
                        }
                    }
                }
            }
        }
    }
    
</style>

<template>
<div class="container-fluid">
    <h1 class="title mb30">
        {{datas.title}}
        <div class="edit">
            <router-link tag="span" :to="{name:'projectEdit',query:{apiId:$route.params.apiId}}" class="iconfont">&#xe62b;</router-link>
            <span @click="deleteItem" class="iconfont">&#xe605;</span>
        </div>
    </h1>
    <div class="block">
        <div class="top">简要描述</div>
        <div class="bottom">{{datas.briefDesc||datas.title}}</div>
    </div>
    <div class="block">
        <div class="top">请求方式</div>
        <div class="bottom">{{datas.type}}</div>
    </div>
    <div class="block">
        <div class="top">请求API地址</div>
        <div class="bottom">
            <span class="api-address" target="_blank" >{{getApi}}</span>
            <a class="btn btn-success btn-sm ml20" :href="getApi" target="_blank">测试</a>
        </div>
    </div>
    <div class="block mt30">
        <div class="top">接口详情说明</div>
    </div>
    <div class="block mt30">
            <div class="top middlesize bold">请求参数</div>
            <div class="bottom mt20">
                <div class="table">
                    <ul class="head">
                        <li class="t1 tc bold">操作</li>
                        <li class="t2 tc bold">前端请求参数名</li>
                        <li class="t3 tc bold">中文名</li>
                        <li class="t4 tc bold">必填</li>
                        <li class="t5 tc bold">默认值</li>
                        <li class="t6 tc bold">说明</li>
                        <li class="t7 tc bold">类型</li>
                    </ul>
                    <div v-for="(item,i) in requestJson">
                        <ul class="one">
                            <li class="t1">
                                <span class="zhedie iconfont cursor"
                                    @click="item.isSlide=false"
                                    v-if="item.childList&&item.childList.length&&item.isSlide"
                                    >&#xe624;</span>
                                <span class="zhedie iconfont cursor"
                                    @click="item.isSlide=true"
                                    v-if="item.childList&&item.childList.length&&!item.isSlide" >&#xe616;</span>
                            </li>
                            <li class="t2"><input type="text" class="form-control english-name" v-model="item.requestEnName" placeholder="参数名"></li>
                            <li class="t3"><input type="text" class="form-control" v-model="item.requestCnName" placeholder="参数中文名"></li>
                            <li class="t4 tc"><input type="checkbox" v-model="item.isRequired"></li>
                            <li class="t5"><input type="text" class="form-control" v-model="item.defaultVal" placeholder="参数的默认值"></li>
                            <li class="t6">
                                <textarea class="form-control" v-model="item.explain" rows="1" placeholder="参数说明"></textarea>
                            </li>
                            <li class="t7">
                                <select class="form-control" v-model="item.type" >
                                    <option value="int">int</option>
                                    <option value="string">string</option>
                                    <option value="boolean">boolean</option>
                                    <option value="null">null</option>
                                    <option value="undefined">undefined</option>
                                    <option value="array">array</option>
                                    <option value="array(object)">array(object)</option>
                                    <option value="object">object</option>
                                </select>
                            </li>
                        </ul>
                        <div v-show="item.isSlide" v-if="item.childList&&item.childList.length" v-for="(item1,i1) in item.childList">
                            <ul class="child">
                                <li class="t1">
                                    <span class="zhedie iconfont cursor"
                                        @click="item1.isSlide=false"
                                        v-if="item1.childList&&item1.childList.length&&item1.isSlide"
                                        >&#xe624;</span>
                                    <span class="zhedie iconfont cursor"
                                        @click="item1.isSlide=true"
                                        v-if="item1.childList&&item1.childList.length&&!item1.isSlide" >&#xe616;</span>
                                </li>
                                <li class="t2"><input type="text" class="form-control english-name" v-model="item1.requestEnName" placeholder="参数名"></li>
                                <li class="t3"><input type="text" class="form-control" v-model="item1.requestCnName" placeholder="参数中文名"></li>
                                <li class="t4 tc"><input type="checkbox" v-model="item1.isRequired" ></li>
                                <li class="t5"><input type="text" class="form-control" v-model="item1.defaultVal" placeholder="参数的默认值"></li>
                                <li class="t6">
                                    <textarea class="form-control" v-model="item1.explain" rows="1" placeholder="参数说明"></textarea>
                                </li>
                                <li class="t7">
                                    <select class="form-control" v-model="item1.type">
                                        <option value="int">int</option>
                                        <option value="string">string</option>
                                        <option value="boolean">boolean</option>
                                        <option value="null">null</option>
                                        <option value="undefined">undefined</option>
                                        <option value="array">array</option>
                                        <option value="array(object)">array(object)</option>
                                        <option value="object">object</option>
                                    </select>
                                </li>
                            </ul>
                            <ul class="three-child" v-show="item1.isSlide" v-if="item1.childList&&item1.childList.length" v-for="(item2,i2) in item1.childList">
                                <li class="t1">
                                    
                                </li>
                                <li class="t2"><input type="text" class="form-control english-name" v-model="item2.requestEnName" placeholder="参数名"></li>
                                <li class="t3"><input type="text" class="form-control" v-model="item2.requestCnName" placeholder="参数中文名"></li>
                                <li class="t4 tc"><input type="checkbox" v-model="item2.isRequired" ></li>
                                <li class="t5"><input type="text" class="form-control" v-model="item2.defaultVal" placeholder="参数的默认值"></li>
                                <li class="t6">
                                    <textarea class="form-control" v-model="item2.explain" rows="1" placeholder="参数说明"></textarea>
                                </li>
                                <li class="t7">
                                    <select class="form-control" v-model="item2.type">
                                        <option value="int">int</option>
                                        <option value="string">string</option>
                                        <option value="boolean">boolean</option>
                                        <option value="null">null</option>
                                        <option value="undefined">undefined</option>
                                        <option value="array">array</option>
                                        <option value="array(object)">array(object)</option>
                                        <option value="object">object</option>
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="block">
        <div class="top middlesize mb10 bold">请求参数对应JSON</div>
        <div class="bottom" id="reqest">
        </div>
    </div>
    <hr style="margin-top:60px;">
    <div class="block mt30">
        <div class="top middlesize bold">返回参数配置</div>
        <div class="bottom mt20">
            <div class="table">
                <ul class="head">
                    <li class="t1 tc bold">折叠</li>
                    <li class="t2 tc bold">前端请求参数名</li>
                    <li class="t3 tc bold">中文名</li>
                    <li class="t5 tc bold">默认值</li>
                    <li class="t6 tc bold">说明</li>
                    <li class="t7 tc bold">类型</li>
                </ul>
                <div v-for="(item,i) in responseJson">
                    <ul class="one">
                        <li class="t1">
                            <span class="zhedie iconfont cursor"
                                @click="item.isSlide=false"
                                v-if="item.childList&&item.childList.length&&item.isSlide"
                                >&#xe624;</span>
                            <span class="zhedie iconfont cursor"
                                @click="item.isSlide=true"
                                v-if="item.childList&&item.childList.length&&!item.isSlide" >&#xe616;</span>
                        </li>
                        <li class="t2"><input type="text" class="form-control english-name" v-model="item.requestEnName" placeholder="参数名"></li>
                        <li class="t3"><input type="text" class="form-control" v-model="item.requestCnName" placeholder="参数中文名"></li>
                        <li class="t5"><input type="text" class="form-control" v-model="item.defaultVal" placeholder="参数的默认值"></li>
                        <li class="t6">
                            <textarea class="form-control" v-model="item.explain" rows="1" placeholder="参数说明"></textarea>
                        </li>
                        <li class="t7">
                            <select class="form-control" v-model="item.type" >
                                <option value="int">int</option>
                                <option value="string">string</option>
                                <option value="boolean">boolean</option>
                                <option value="null">null</option>
                                <option value="undefined">undefined</option>
                                <option value="array">array</option>
                                <option value="array(object)">array(object)</option>
                                <option value="object">object</option>
                            </select>
                        </li>
                    </ul>
                    <div v-show="item.isSlide" v-if="item.childList&&item.childList.length" v-for="(item1,i1) in item.childList">
                        <ul class="child">
                            <li class="t1">
                                <span class="zhedie iconfont cursor"
                                    @click="item1.isSlide=false"
                                    v-if="item1.childList&&item1.childList.length&&item1.isSlide"
                                    >&#xe624;</span>
                                <span class="zhedie iconfont cursor"
                                    @click="item1.isSlide=true"
                                    v-if="item1.childList&&item1.childList.length&&!item1.isSlide" >&#xe616;</span>
                            </li>
                            <li class="t2"><input type="text" class="form-control english-name" v-model="item1.requestEnName" placeholder="参数名"></li>
                            <li class="t3"><input type="text" class="form-control" v-model="item1.requestCnName" placeholder="参数中文名"></li>
                            <li class="t5"><input type="text" class="form-control" v-model="item1.defaultVal" placeholder="参数的默认值"></li>
                            <li class="t6">
                                <textarea class="form-control" v-model="item1.explain" rows="1" placeholder="参数说明"></textarea>
                            </li>
                            <li class="t7">
                                <select class="form-control" v-model="item1.type">
                                    <option value="int">int</option>
                                    <option value="string">string</option>
                                    <option value="boolean">boolean</option>
                                    <option value="null">null</option>
                                    <option value="undefined">undefined</option>
                                    <option value="array">array</option>
                                    <option value="array(object)">array(object)</option>
                                    <option value="object">object</option>
                                </select>
                            </li>
                        </ul>
                        <div v-show="item1.isSlide" v-if="item1.childList&&item1.childList.length" v-for="(item2,i2) in item1.childList">
                            <ul class="three-child" >
                                <li class="t1">
                                    <span class="zhedie iconfont cursor"
                                        @click="item2.isSlide=false"
                                        v-if="item2.childList&&item2.childList.length&&item2.isSlide"
                                        >&#xe624;</span>
                                    <span class="zhedie iconfont cursor"
                                        @click="item2.isSlide=true"
                                        v-if="item2.childList&&item2.childList.length&&!item2.isSlide" >&#xe616;</span>
                                </li>
                                <li class="t2"><input type="text" class="form-control english-name" v-model="item2.requestEnName" placeholder="参数名"></li>
                                <li class="t3"><input type="text" class="form-control" v-model="item2.requestCnName" placeholder="参数中文名"></li>
                                <li class="t5"><input type="text" class="form-control" v-model="item2.defaultVal" placeholder="参数的默认值"></li>
                                <li class="t6">
                                    <textarea class="form-control" v-model="item2.explain" rows="1" placeholder="参数说明"></textarea>
                                </li>
                                <li class="t7">
                                    <select class="form-control" v-model="item2.type">
                                        <option value="int">int</option>
                                        <option value="string">string</option>
                                        <option value="boolean">boolean</option>
                                        <option value="null">null</option>
                                        <option value="undefined">undefined</option>
                                        <option value="array">array</option>
                                        <option value="array(object)">array(object)</option>
                                        <option value="object">object</option>
                                    </select>
                                </li>
                            </ul>
                            <div v-show="item2.isSlide" v-if="item2.childList&&item2.childList.length" v-for="(item3,i3) in item2.childList">
                                <ul class="four-child" >
                                    <li class="t1">
                                        <span class="zhedie iconfont cursor"
                                            @click="item3.isSlide=false"
                                            v-if="item3.childList&&item3.childList.length&&item3.isSlide"
                                            >&#xe624;</span>
                                        <span class="zhedie iconfont cursor"
                                            @click="item3.isSlide=true"
                                            v-if="item3.childList&&item3.childList.length&&!item3.isSlide" >&#xe616;</span>
                                    </li>
                                    <li class="t2"><input type="text" class="form-control english-name" v-model="item3.requestEnName" placeholder="参数名"></li>
                                    <li class="t3"><input type="text" class="form-control" v-model="item3.requestCnName" placeholder="参数中文名"></li>
                                    <li class="t5"><input type="text" class="form-control" v-model="item3.defaultVal" placeholder="参数的默认值"></li>
                                    <li class="t6">
                                        <textarea class="form-control" v-model="item3.explain" rows="1" placeholder="参数说明"></textarea>
                                    </li>
                                    <li class="t7">
                                        <select class="form-control" v-model="item3.type">
                                            <option value="int">int</option>
                                            <option value="string">string</option>
                                            <option value="boolean">boolean</option>
                                            <option value="null">null</option>
                                            <option value="undefined">undefined</option>
                                            <option value="array">array</option>
                                            <option value="array(object)">array(object)</option>
                                            <option value="object">object</option>
                                        </select>
                                    </li>
                                </ul>
                                <ul class="five-child" v-show="item3.isSlide" v-if="item3.childList&&item3.childList.length" v-for="(item4,i3) in item3.childList">
                                    <li class="t1">
                                       
                                    </li>
                                    <li class="t2"><input type="text" class="form-control english-name" v-model="item4.requestEnName" placeholder="参数名"></li>
                                    <li class="t3"><input type="text" class="form-control" v-model="item4.requestCnName" placeholder="参数中文名"></li>
                                    <li class="t5"><input type="text" class="form-control" v-model="item4.defaultVal" placeholder="参数的默认值"></li>
                                    <li class="t6">
                                        <textarea class="form-control" v-model="item4.explain" rows="1" placeholder="参数说明"></textarea>
                                    </li>
                                    <li class="t7">
                                        <select class="form-control" v-model="item4.type">
                                            <option value="int">int</option>
                                            <option value="string">string</option>
                                            <option value="boolean">boolean</option>
                                            <option value="null">null</option>
                                            <option value="undefined">undefined</option>
                                            <option value="array">array</option>
                                            <option value="array(object)">array(object)</option>
                                            <option value="object">object</option>
                                        </select>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="block">
        <div class="top middlesize mb10 bold">返回参数对应JSON</div>
        <div class="bottom" id="response">
        </div>
    </div>
    <hr class="mt50">
    <div class="block">
        <div class="top middlesize mb10 bold">其他说明详情</div>
        <div class="bottom" id="reqest">
        </div>
    </div>
    <div id="context">
        
    </div>
</div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        components: {
            mavonEditor
        },
        data(){
            return {
                requestJs:{},
                requestJson:[{
                    requestEnName:'',
                    requestCnName:'',
                    isRequired:false,
                    defaultVal:'',
                    explain:'',
                    type:'string',
                }],
                responseJs:{},
                responseJson:[{
                    requestEnName:'',
                    requestCnName:'',
                    isRequired:false,
                    defaultVal:'',
                    explain:'',
                    type:'string',
                }],
                datas:{},
                getApi:'',
            }
        },
        watch:{
            'requestJs':{
                handler(val, oldVal) {
                    var jf = new JsonFormater({
                        dom : '#reqest' 
                    }); 
                    jf.doFormat(this.requestJs); 
                },
                deep: true
            },
            'responseJs':{
                handler(val, oldVal) {
                    var jf = new JsonFormater({
                    dom : '#response' 
                    }); 
                    jf.doFormat(this.responseJs); 
                },
                deep: true
            },
            '$route'(){
                this.getApiDetails();
            },
        },
        created(){
            this.getApiDetails();
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
                
            })
        },
        methods: {
            deleteItem(){
                popup.confirm({title:'确定删除吗？',yes:()=>{
                    util.ajax({
                        url:config.baseApi+'api/api/deleteItemApi',
                        data:{
                            id:this.$route.params.apiId
                        },
                        success:data=>{
                            this.$store.dispatch(
                                'getNavCommonTwoCatalog' , { 
                                projectId:this.$route.params.projectId,
                                type:1, 
                            })
                            util.goBack();
                            popup.miss({title:'操作成功!'})
                        }
                    })
                }})
            },
            getApiDetails(){
                util.ajax({
                    url:config.baseApi+'api/api/getApiDetails',
                    data:{
                        id:this.$route.params.apiId
                    },
                    success:data=>{
                        this.datas=data.data[0]
                        if(this.datas.request){
                            this.requestJs=JSON.parse(this.datas.request)
                        }
                        if(this.datas.response){
                            this.responseJs=JSON.parse(this.datas.response)
                        }
                        this.requestJson = JSON.parse(this.datas.requestjson);
                        this.responseJson = util.chuliJsonToMe(this.responseJs);  
                        
                        $('#context').html(this.datas.html)

                        this.getProjectDetail();
                    }
                })
            },
            getProjectDetail(){
                util.ajax({
                    url:config.baseApi+'api/project/getProjectDetail',
                    data:{
                        id:this.$route.params.projectId
                    },
                    success:data=>{
                        this.apis=data.data[0]
                        this.getApi = config.baseApi+this.apis.projectEnName+'/'+this.datas.apiUrl
                    }
                })
            },
            

           
        }
    }
</script>


