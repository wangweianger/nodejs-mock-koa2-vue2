<style lang="sass" scoped>
    .copot-page{
      overflow: hidden;
      margin:20px 0;
    }
</style>

<template>
  <div class="copot-page">
    <span v-if="p_isPageList" class="inline_block mr10">
        每页显示
        <select class="form-control w-80 inline_block input-sm" v-model="p_pageSize">
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
        条
    </span> 
    <div class="copot-page-size inline_block"></div>    
  </div> 
</template> 

<script>
import config from 'common/js/config'
import page from 'page'
import propsync from 'common/lib/mixin/propsync'

export default {
  /*routerName  路由名字 name
    totalCount  总条数
    callback    回调函数
  */
  props:{
    totalCount:{
      type:Number,
      required: true,
      default:0,
    },
    nowPage:{
      type:null,
      required: true,
      default:0,
    },
    pageSize: {
      type: null,
      required: true,
      default: 0,
    },
    isPageList:{
      type:null,
      default:false,
    },
    isSearch:{
      type:null,
      default:false,
    },
  },
  mixins: [propsync],
  watch:{
    p_totalCount (newVal) {
      this.gitPages();
    },
    p_nowPage (newVal) {
      this.gitPages();
    },
    p_pageSize (newVal) {
      this.gitPages();
    },
    p_isSearch(){
      if(this.p_isSearch){
        setTimeout(()=>{
            this.p_isSearch=false;
        }, 100);
        console.log(211)
        this.gitPages();
      }
    }
  },
  mounted() {
      this.$nextTick(()=>{
          this.gitPages();
      })
  },
  methods:{
    gitPages:function(){
      var This=this;
      page({
          route:This.$route,
          routerName:This.$route.name,
          parent:$("div.copot-page-size"),
          nowPage:This.p_nowPage,
          pageSize: This.p_pageSize || config.pageSize,
          totalCount:This.p_totalCount,
          isSearch:this.p_isSearch
      })
    }
  },
 
}
</script>