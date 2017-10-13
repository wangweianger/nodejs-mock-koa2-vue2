<style lang="sass" scoped>
    .index_body{
        .imger {
            display:block;
            margin:auto;
        }
        img {
            height:525px;
        }
        p {

            padding-top:30px;
            padding-left: 30px;
            span {
                color: #af7f67;
            }
        }
    }
</style>
<template>
    <div class="index_body">
        <P class="bigmoresize imger">欢迎进入<span class="ml20 ">mock模拟数据管理后台</span></P>
        <img class="imger" src="../assets/common/images/default_big_img.png">

    </div>
</template>

<script>
    export default {
        data(){
            return {}
        },
        ready: function () {
            var heig = $(window).height();
            $(".index_body").css("min-height",heig-60);
        },
        methods: {
            
        }
    }
</script>


