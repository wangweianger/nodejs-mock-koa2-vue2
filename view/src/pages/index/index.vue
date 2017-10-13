<style lang="sass" scoped>
    .swiper-slide{height:300px;background:#ccc;}

</style>

<template>
<div class="container-fluid">
      000000000000000000000000000000000000000000000000000000000000000000000000
    <button class="btn btn-primary" @click="search.isSearch=true">点击查询</button>
    <div class="page_box tr clear mt20 mr20">
        <page :isSearch="search.isSearch" :now-page="search.page" :page-size="search.pageSize" :total-count="search.totalcount" @onPropsChange="change"></page>
    </div>
    <hr>
        时间选择器组件封装
        <select-time-common :begin="begin" :end="end" :datas="datas" @onPropsChange="change"></select-time-common>
        开始时间：<span v-text="begin"></span> &nbsp; &nbsp; &nbsp; 结束时间：<span v-text="end"></span>  
    <hr>

        多个时间选择器<br>

        时间一
        <select-time-common :begin="moretime.begin1" :end="moretime.end1" :datas="moretime.datas1" @onPropsChanges="change"></select-time-common>
        时间二
        <select-time-common :begin="moretime.begin2" :end="moretime.end1" :datas="moretime.datas2" @onPropsChanges="change"></select-time-common>

    ECharts
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>


</div>
</template>

<script>
    import Vue from 'vue'
    import page from 'components/page'
    import selectTimeCommon from 'components/select_time_common'

    export default {
        components: {
           page,
           selectTimeCommon,
        },
        data(){
            return {
                search:{
                    page:1,
                    pageSize:10,
                    totalcount:100,
                    isSearch:false,
                },
                datas:{
                    istime:true
                },

                begin:1477630954604,
                end:1477630954604,

                moretime:{
                    begin1:'',
                    end1:'',
                    datas1:{
                        beginId:'begin1',
                        endId:'end1'
                    },
                    begin2:'',
                    end2:'',
                    datas2:{
                        beginId:'begin2',
                        endId:'end2'
                    },
                }
            }
        },
        mounted() {
            this.$nextTick(()=>{
            // // 基于准备好的dom，初始化echarts实例
            // var myChart = echarts.init(document.getElementById('main'));

            // // 指定图表的配置项和数据
            // var option = {
            //     title: {
            //         text: 'ECharts 入门示例'
            //     },
            //     tooltip: {},
            //     legend: {
            //         data:['销量']
            //     },
            //     xAxis: {
            //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // };

            // // 使用刚指定的配置项和数据显示图表。
            // myChart.setOption(option);

            })
        },
        methods: {
            change:function(propName,newVal,oldVal){
                this.search[propName]=newVal;
                this.moretime[propName]=newVal;
                this[propName]=newVal;
                this.datas[propName]=newVal;
            }
        }
    }
</script>
<style lang="sass">

</style>

