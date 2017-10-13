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
                    span{
                        font-size:20px;
                        margin-left:5px;
                    }
                }
            }
        }
   }
</style>

<template>
<div class="container-fluid">
    
</div>
</template>

<script>
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
                    projectId:'',
                },
            }
        },
        beforeMount(){
            $('#nav-two').show();
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
            change(prop,val){
                this['model'][prop]=val;
            },
            callback(){

            },
            deleteItem(){

            },
            editItem(){
                console.log('item begin！')
            },
            deleteCatalog(){
                 popup.confirm({title:'确定删除吗？',yes:()=>{
                    console.log('删除')
                }})
            },
            editCatalog(){
                util.ajax({
                    url:config.baseApi+'api/catalog/editCatalog',
                    data:{},
                    success:data=>{
                        
                    }
                })
            },
        }
    }
</script>


