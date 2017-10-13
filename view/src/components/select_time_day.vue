<style lang="sass" scoped> 
    .time_common{
        display: inline-block;
    }
</style>
<template>
   <div class="time_common">
        <select
            v-model.number="hh" 
            class="inline_block">
            <option v-for="n in 24" :value="n-1">{{n-1}}</option>
        </select>
        时
        <select
            v-model.number="mm" 
            class="inline_block">
            <option v-for="n in 60" :value="n-1">{{n-1}}</option>
        </select>
        分
        <select
            v-model.number="ss" 
            class="inline_block">
            <option v-for="n in 60" :value="n-1">{{n-1}}</option>
        </select>
        秒
   </div>
</template>
<script type="es6">
    /*
        十分重要： 此组件 如果一个人页面有多个时间选择器 则传入的开始时间名字跟 id 保持一致
    */
    export default{
        props:{
            keys:{
                type:String,
                default:'time'
            },
            time:{
                type:String,
                default:'00:00:00'
            }
        },
        data(){
            return{
                hh:0,
                mm:0,
                ss:0,
            }
        },
        created(){
            let arr=this.time.split(':');
            this.hh=parseInt(arr[0])>9?parseInt(arr[0]):parseInt(arr[0].slice(1));
            this.mm=parseInt(arr[1])>9?parseInt(arr[1]):parseInt(arr[1].slice(1));
            this.ss=parseInt(arr[2])>9?parseInt(arr[2]):parseInt(arr[2].slice(1));
            this.$watch('hh',()=> {
                let result=(this.hh>9?this.hh:'0'+this.hh)+':'+(this.mm>9?this.mm:'0'+this.mm)+':'+(this.ss>9?this.ss:'0'+this.ss)
                this.$emit('onPropsChanges', this.keys, result); 
            });
            this.$watch('mm', ()=> {
                let result=(this.hh>9?this.hh:'0'+this.hh)+':'+(this.mm>9?this.mm:'0'+this.mm)+':'+(this.ss>9?this.ss:'0'+this.ss)
                this.$emit('onPropsChanges', this.keys, result); 
            });
            this.$watch('ss', ()=> {
                let result=(this.hh>9?this.hh:'0'+this.hh)+':'+(this.mm>9?this.mm:'0'+this.mm)+':'+(this.ss>9?this.ss:'0'+this.ss)
                this.$emit('onPropsChanges', this.keys, result); 
            })
        },
        mounted() {
          this.$nextTick(()=>{
               
          })
        },
    }
</script>
<style>
   
</style>