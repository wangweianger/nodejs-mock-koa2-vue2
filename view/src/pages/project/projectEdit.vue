<style lang="sass" scoped>
   .main{
        padding-top:50px;
        margin-bottom:150px;
        .block{
            overflow:hidden;
            margin-bottom:20px;
            .left{
                width:80px;
                float:left;
                line-height:35px;
            }
            .right{
                .form-control{
                    width:800px;
                }
                .item-1{
                    padding:8px 6px 8px 10px;
                    background:#eddff3;
                    color:red;
                }
                .item-2{
                    display:inline-block;
                    width:603px;
                }
            }
            .bottom{
                .table{
                    overflow:auto;
                }
            }
        }
        .zhedie{
            width:30px;
            display:inline-block;
            font-size:20px;
            font-weight:bold;
        }
   }
    .model-to-json{
        textarea{
            width:90%;
            margin:20px auto;
        }
    }
    .add-canshu{
        font-weight:bold;
    }

    div.table{
        ul{
            overflow:hidden;
            border-top:solid 1px #fff;
            border-left:solid 1px #fff;
            width:1170px;
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
                    width:250px;
                    position:relative;
                    padding-left:40px;
                    user-select:none;
                    .zhedie{
                        position:absolute;
                        left:5px;
                        top:5px;
                    }
                }
                &.t2{
                    width:220px;
                }
                &.t3{
                    width:150px;
                }
                &.t4{
                    width:60px;
                }
                &.t5{
                    width:200px;
                }
                &.t6{
                    width:150px;
                }
                &.t7{
                    width:130px;
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
                        padding-left:73px;
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
                        padding-left:105px;
                        .zhedie{
                            left:55px;
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
                        padding-left:137px;
                        .zhedie{
                            left:100px;
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
                        padding-left:168px;
                        .zhedie{
                            left:100px;
                        }
                    }
                }
            }
            &.six-child{
                background:#d1f3f0;
                border-top:none;
                li{
                    height:33px;
                    .form-control{
                        height:28px;
                        padding: 2px 12px;
                        background:#d1f3f0;
                        &.english-name{
                            padding-left:140px;
                        }
                    }
                    &.t1{
                        padding-left:200px;
                        .zhedie{
                            left:100px;
                        }
                    }
                }
            }
        }
    }
    .reponhtml{
        overflow:hidden;
        textarea{
            width:100%;
            min-height:300px;
            padding:10px;
            margin-top:50px;
            border:solid 1px #ccc;
        }
    }
</style>

<template>
<div class="container-fluid">
    <nav-bar><li slot="nav_two">项目列表/ </li></nav-bar>
    <div class="main">
        <div class="tc mb20">
            <button @click="saveApi" class="btn btn-danger btn-lg mt30">保存API</button>
        </div>
        <div class="block">
            <div class="left">页面标题：</div>
            <div class="right"><input type="text" v-model.trim="edit.title" class="form-control"></div>
        </div>
        <div class="block">
            <div class="left">简要描述：</div>
            <div class="right"><input type="text" v-model.trim="edit.briefDesc" class="form-control"></div>
        </div>
        <div class="block">
            <div class="left">二级目录：</div>
            <div class="right">
                <select class="form-control" v-model="edit.twoCatalogId">
                    <option value="">无</option>
                    <option :value="item.id" v-for="item in navCatalogList">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="block">
            <div class="left">三级目录：</div>
            <div class="right">
                <select class="form-control" v-model="edit.threeCatalogId">
                    <option value="">无</option>
                    <option :value="item.id" v-for="item in navCatalogThreeList">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="block">
            <div class="left">请求方式：</div>
            <div class="right">
                <select class="form-control" v-model="edit.type">
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                </select>
            </div>
        </div>
        <div class="block">
            <div class="left">API地址：</div>
            <div class="right">
                <span class="item-1">{{getApi}}</span>
                <input type="text" v-model.trim="edit.apiUrl" placeholder="填写接口Api后缀地址" class="form-control item-2">
            </div>
        </div>
        <div class="block mt30">
            <div class="top middlesize bold">请求参数配置 (最多支持三级展示)</div>
            <div class="bottom mt20">
                <div class="table request">
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
                                <button class="btn btn-success btn-xs"
                                    v-if="item.type=='array(object)'||item.type=='object'"  
                                    @click="addItemObj(item)"><span class="iconfont">&#xe616;</span></button>
                                <button class="btn btn-danger btn-xs" 
                                    @click="deleteItem(requestJson,i)" 
                                    ><span class="iconfont">&#xe605;</span></button>
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
                                    <button class="btn btn-success btn-xs"
                                        v-if="item1.type=='array(object)'||item1.type=='object'"  
                                        @click="addItemObj(item1)"><span class="iconfont">&#xe616;</span></button>
                                    <button class="btn btn-danger btn-xs" 
                                        @click="deleteItem(item.childList,i1)"><span  class="iconfont">&#xe605;</span></button>
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
                                    <button class="btn btn-danger btn-xs" 
                                    @click="deleteItem(item1.childList,i2)"><span class="iconfont">&#xe605;</span></button>
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

                <div class="btn btn-default btn-sm mt15 add-canshu" @click="addCanshu('req')"><span class="iconfont">&#xe616;</span>增加参数</div>
                <span class="btn btn-success ml20 mt15" @click="viewJson('req')">JSON转参数表格</span>
            </div>
        </div>
        <div class="block">
            <div class="top middlesize mb10 bold">请求参数对应JSON</div>
            <div class="bottom" id="reqest">
            </div>
        </div>

        <hr style="margin-top:60px;">
        <!-- 返回类型是JSON 还是html|xml -->
        <div class="restype tc">
            <button class="btn btn-default" :class="{'btn-danger':restype===1?true:false}" @click="restype=1">返回JSON类型</button>
            <button class="btn btn-default" :class="{'btn-danger':restype===2?true:false}" @click="restype=2">返回其他类型(HTML/XML)</button>
        </div>
        
        <div class="response"> 
            <div class="reponjson" v-if="restype === 1">
                <div class="block mt30">
                    <div class="top middlesize bold">返回参数配置(最多支持五级展示)</div>
                    <div class="bottom mt20">
                        <div class="table">
                            <ul class="head">
                                <li class="t1 tc bold response">折叠</li>
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
                                        <button class="btn btn-success btn-xs"
                                            v-if="item.type=='array(object)'||item.type=='object'"  
                                            @click="addItemObj(item)"><span class="iconfont">&#xe616;</span></button>
                                        <button class="btn btn-danger btn-xs" 
                                            @click="deleteItem(responseJson,i)" 
                                            ><span class="iconfont">&#xe605;</span></button>
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
                                        <ul class="child" v-if="!item1.length">
                                            <li class="t1">
                                                <span class="zhedie iconfont cursor"
                                                    @click="item1.isSlide=false"
                                                    v-if="item1.childList&&item1.childList.length&&item1.isSlide"
                                                    >&#xe624;</span>
                                                <span class="zhedie iconfont cursor"
                                                    @click="item1.isSlide=true"
                                                    v-if="item1.childList&&item1.childList.length&&!item1.isSlide" >&#xe616;</span>
                                                <button class="btn btn-success btn-xs"
                                                    v-if="item1.type=='array(object)'||item1.type=='object'"  
                                                    @click="addItemObj(item1)"><span class="iconfont">&#xe616;</span></button>
                                                <button class="btn btn-danger btn-xs" 
                                                    @click="deleteItem(item.childList,i1)"><span  class="iconfont">&#xe605;</span></button>
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
                                                    <button class="btn btn-success btn-xs"
                                                        v-if="item2.type=='array(object)'||item2.type=='object'"  
                                                        @click="addItemObj(item2)"><span class="iconfont">&#xe616;</span></button>
                                                    <button class="btn btn-danger btn-xs" 
                                                        @click="deleteItem(item1.childList,i2)"><span class="iconfont">&#xe605;</span></button>
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
                                                        <button class="btn btn-success btn-xs"
                                                            v-if="item3.type=='array(object)'||item3.type=='object'"  
                                                            @click="addItemObj(item3)"><span class="iconfont">&#xe616;</span></button>
                                                        <button class="btn btn-danger btn-xs" 
                                                            @click="deleteItem(item2.childList,i3)"><span class="iconfont">&#xe605;</span></button>
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
                                                <div v-show="item3.isSlide" v-if="item3.childList&&item3.childList.length" v-for="(item4,i4) in item3.childList">
                                                    <ul class="five-child">
                                                        <li class="t1">
                                                            <span class="zhedie iconfont cursor"
                                                                @click="item4.isSlide=false"
                                                                v-if="item4.childList&&item4.childList.length&&item4.isSlide"
                                                                >&#xe624;</span>
                                                            <span class="zhedie iconfont cursor"
                                                                @click="item4.isSlide=true"
                                                                v-if="item4.childList&&item4.childList.length&&!item4.isSlide" >&#xe616;</span>
                                                            <button class="btn btn-success btn-xs"
                                                                v-if="item4.type=='array(object)'||item4.type=='object'"  
                                                                @click="addItemObj(item4)"><span class="iconfont">&#xe616;</span></button>
                                                            <button class="btn btn-danger btn-xs" 
                                                                @click="deleteItem(item3.childList,i4)"><span class="iconfont">&#xe605;</span></button>
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
                                                    <div v-show="item4.isSlide" v-if="item4.childList&&item4.childList.length" v-for="(item5,i5) in item4.childList">
                                                        <ul class="six-child">
                                                            <li class="t1">
                                                                <button class="btn btn-danger btn-xs" 
                                                                    @click="deleteItem(item4.childList,i5)"><span class="iconfont">&#xe605;</span></button>
                                                            </li>
                                                            <li class="t2"><input type="text" class="form-control english-name" v-model="item5.requestEnName" placeholder="参数名"></li>
                                                            <li class="t3"><input type="text" class="form-control" v-model="item5.requestCnName" placeholder="参数中文名"></li>
                                                            <li class="t5"><input type="text" class="form-control" v-model="item5.defaultVal" placeholder="参数的默认值"></li>
                                                            <li class="t6">
                                                                <textarea class="form-control" v-model="item5.explain" rows="1" placeholder="参数说明"></textarea>
                                                            </li>
                                                            <li class="t7">
                                                                <select class="form-control" v-model="item5.type">
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
                        <div class="btn btn-default btn-sm mt15 add-canshu" @click="addCanshu('res')"><span class="iconfont">&#xe616;</span>增加参数</div>
                        <span class="btn btn-success ml20 mt15" @click="viewJson('res')">JSON转参数表格</span>
                    </div>
                </div>
                <div class="block">
                    <div class="top middlesize mb10 bold">返回参数对应JSON</div>
                    <div class="bottom" id="response">
                    </div>
                </div>
            </div>
            <div class="reponhtml" v-if="restype === 2">
                <div class="top middlesize bold">返回参数配置</div>
                <textarea placeholder="填写需要返回的内容" v-model="edit.response"></textarea>
            </div>
        </div>

        <div class="block">
            <div class="top middlesize mb10 bold">其他说明详情</div>
            <div class="bottom" id="reqest">
            </div>
        </div>
        <div class="block">
            <button class="btn btn-info mr10" v-for="item in tempList" @click="choseTemp(item)">{{item.tempName}}</button>
            <button class="btn btn-danger ml20" @click="saveTemp">另存为模板</button>
        </div>
        <mavon-editor style="min-height:800px;height:100%;" :value="edit.text" @change="getMavonVal"></mavon-editor>
        <div class="tc">
            <button @click="saveApi" class="btn btn-danger btn-lg mt30">保存API</button>
        </div>
        
    </div>   

    <!-- 新增项目 -->
    <modal
        :show='model.show'
        :callback='callback'
        title='JSON转参数表格'
        :width="'750'"
        @onPropsChange="change">
        <div class="tc mt20 mb20" slot="modal-body" >
            <!--弹出层-->
            <div class="model-to-json">
                <textarea class="form-control" v-model.trim="requestStr" rows="20" 
                    placeholder='请填写JSON格式字符串,
同时对你的JSON做最大的容错处理,
标准JSON参考：
{ 
    "name":"wangwei",
    "sex":"男" 
}'>
                </textarea>
            </div>
        </div>
    </modal>

</div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import navBar from 'components/navBar'
    import modal from 'components/modal'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        components: {
           navBar,
           modal,
           mavonEditor
        },
        data(){
            return {
                model:{
                    show:false,
                },
                defaultjson:{
                    requestEnName:'',
                    requestCnName:'',
                    isRequired:false,
                    defaultVal:'',
                    explain:'',
                    type:'string',
                },
                requestStr:'',
                requestJson:[{
                    requestEnName:'',
                    requestCnName:'',
                    isRequired:false,
                    defaultVal:'',
                    explain:'',
                    type:'string',
                }],
                responseJson:[{
                    requestEnName:'',
                    requestCnName:'',
                    isRequired:false,
                    defaultVal:'',
                    explain:'',
                    type:'string',
                }],
                oldType:'',
                addJSONtype:'',
                apiId:this.$route.query.apiId,
                edit:{
                    id:'',
                    title:'',
                    projectId:this.$route.params.projectId,
                    twoCatalogId:'',
                    threeCatalogId:'',
                    text:'',
                    request:'',
                    requestjson:'',
                    response:'',
                    html:'',
                    apiUrl:'',
                    type:'POST',
                    briefDesc:'',
                    projectName:'',
                },
                datas:{},
                getApi:'',
                restype:1, //json:1 | html:2
            }
        },
        watch:{
            'requestJson':{
                handler(val, oldVal) {
                    var jf = new JsonFormater({
                        dom : '#reqest' 
                    }); 
                    let jsonStr=util.chuliJsonToBegin(this.requestJson)
                    jf.doFormat(jsonStr); 
                },
                deep: true
            },
            'responseJson':{
                handler(val, oldVal) {
                    var jf = new JsonFormater({
                    dom : '#response' 
                    }); 
                    let jsonStr=util.chuliJsonToBegin(this.responseJson)
                    jf.doFormat(jsonStr); 
                },
                deep: true
            },
            'edit.twoCatalogId'(){
                if(!this.edit.id){
                    this.edit.threeCatalogId='';
                }
                this.getNavCatalogList({ projectId:this.edit.projectId ,datatype:3,type:1,parentId:this.edit.twoCatalogId,fn:()=>{
                    if(this.apiId){
                        this.edit.threeCatalogId = this.edit.threeCatalogIdEdit
                    }
                }});
            },
        },
        computed: {
            ...mapState({
                navCatalogList: state => state.catalog.navCatalogList,
                navCatalogThreeList: state => state.catalog.navCatalogThreeList,
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
                this.getNavCatalogList({ projectId:this.edit.projectId ,datatype:2,type:1,fn:()=>{
                    if(this.apiId){
                        this.getApiDetails();
                    }
                }});
                this.getProjectDetail();
                this.getTempList();
            })
        },
        methods: {
            ...mapActions([
                'getNavCatalogList',
            ]),
            change(prop,val){
                this['model'][prop]=val;
            },
            getApiDetails(){
                util.ajax({
                    url:config.baseApi+'api/api/getApiDetails',
                    data:{
                        id:this.apiId
                    },
                    success:data=>{
                        this.datas=data.data[0]
                        if(this.datas.request){
                            this.requestJs=JSON.parse(this.datas.request)
                        }
                        if(this.datas.response&&this.datas.restype===1){
                            this.responseJs=JSON.parse(this.datas.response)
                            this.responseJson = util.chuliJsonToMe(this.responseJs); 
                        }else{
                            this.edit.response=this.datas.response
                        }
                        this.requestJson = util.chuliJsonToMe(this.requestJs);
                        
                        this.edit.id=this.datas.id
                        this.edit.title=this.datas.title
                        this.edit.twoCatalogId=this.datas.twoCatalogId
                        this.edit.threeCatalogId=this.datas.threeCatalogId
                        this.edit.threeCatalogIdEdit=this.datas.threeCatalogId
                        this.edit.text=this.datas.text
                        this.edit.html=this.datas.html
                        this.edit.apiUrl=this.datas.apiUrl
                        this.edit.type=this.datas.type
                        this.edit.briefDesc=this.datas.briefDesc
                        this.restype = this.datas.restype
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
                        this.getApi = config.baseApi+this.apis.projectEnName+'/'
                        this.edit.projectName=this.apis.projectEnName
                    }
                })
            },    
            viewJson(type){
                this.addJSONtype=type
                this.model.show=true;
                if(type=='req'){
                    this.requestStr=util.chuliJSONgsh(util.chuliJsonToBegin(this.requestJson));
                }else if(type=='res'){
                    this.requestStr=util.chuliJSONgsh(util.chuliJsonToBegin(this.responseJson));
                }
            },
            addCanshu(type){
                this.addJSONtype=type
                if(type=='req'){
                    this.requestJson.push(JSON.parse(JSON.stringify(this.defaultjson)))
                }else{
                    this.responseJson.push(JSON.parse(JSON.stringify(this.defaultjson)))
                }
                
            },
            callback(){
                if(this.requestStr){
                    try{
                        let newJson = util.toJson(this.requestStr)
                        let json = JSON.parse(newJson)

                        if(this.addJSONtype=='req'){
                            this.requestJson = util.chuliJsonToMe(json);
                        }else{
                            this.responseJson = util.chuliJsonToMe(json);
                        }
                        
                        this.model.show=false;  
                    }catch(err){
                        popup.alert({style:'max-width:480px!important;',title:'JSON解析失败'+err})
                    }
                     
                }
            },
            deleteItem(obj,i){
                obj.splice(i,1)
            },
            addItemObj(item){
                if(!item['childList']){
                    this.$set( item, 'childList', [] )
                    this.$set( item, 'isSlide', true )
                }
                item['childList'].push(JSON.parse(JSON.stringify(this.defaultjson)))
            },
            getMavonVal(text,html){
                this.edit.text=text;
                this.edit.html=html;
            },
            saveApi(){
                if(!util.regCombination('*').test(this.edit.title)){
                    popup.alert({title:'请填写标题!'}); return false;
                };
                if(!util.regCombination('*').test(this.edit.apiUrl)){
                    popup.alert({title:'请填写API地址!'}); return false;
                };

                let response=null;
                response = this.restype===1?JSON.stringify(util.chuliJsonToBegin(this.responseJson)):this.edit.response;

                let json={
                    id:this.edit.id,
                    title:this.edit.title,
                    projectId:this.edit.projectId,
                    projectName:this.edit.projectName,
                    twoCatalogId:this.edit.twoCatalogId,
                    threeCatalogId:this.edit.threeCatalogId,
                    apiUrl:this.edit.apiUrl,
                    text:this.edit.text,
                    html:this.edit.html,
                    briefDesc:this.edit.briefDesc,
                    requestjson:JSON.stringify(this.requestJson).replace(/'/g,'"'),
                    request:JSON.stringify(util.chuliJsonToBegin(this.requestJson)),
                    response: response,
                    restype:this.restype
                }
                util.ajax({
                    url:config.baseApi+'api/api/editApiDetail',
                    data:json,
                    success:data=>{
                        this.$store.dispatch(
                            'getNavCommonTwoCatalog' , { 
                            projectId:this.$route.params.projectId,
                            type:1, 
                        })
                        util.goBack();
                        popup.miss({title:'新增api成功!'})
                    }
                })
            },
            getTempList(){
                util.ajax({
                    url:config.baseApi+'api/temp/getTempList',
                    success:data=>{
                        this.tempList=data.data
                    }
                })
            },
            saveTemp(){
                if(!this.edit.text){
                    popup.alert({title:'请填写模板内容!'}); return false;
                }
                let tempName = prompt("请为要保存的模板设置标题");    
                if(!tempName.trim()){
                    popup.alert({title:'请填写模板标题!'}); return false;
                }

                util.ajax({
                    url:config.baseApi+'api/temp/addTemp',
                    data:{
                        tempName:tempName,
                        tempVal:this.edit.text
                    }
                })
            },
            choseTemp(item){
                this.edit.text+=item.tempVal
            },
           
        }
    }
</script>


