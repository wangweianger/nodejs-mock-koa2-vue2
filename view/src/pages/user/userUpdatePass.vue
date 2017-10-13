<style lang="sass" scoped>
   .main{
        
   }
</style>

<template>
<div class="container-fluid">
    <nav-bar><li slot="nav_two">项目列表/ </li></nav-bar>
    <div class="main mt30">
        <form class="form-horizontal">
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">原始密码</label>
                <div class="col-sm-10">
                    <input type="password" v-model="oldPassword" class="form-control w-400" placeholder="原始密码">
                </div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">新密码</label>
                <div class="col-sm-10">
                    <input type="password" v-model="newPassword" class="form-control w-400" placeholder="新密码">
                </div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">确认密码</label>
                <div class="col-sm-10">
                    <input type="password" v-model="sholePassword" class="form-control w-400" placeholder="确认密码">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="button" @click="submit" class="btn btn-primary">修改密码</button>
                </div>
            </div>
        </form>    
    </div>   

    

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
                username:'',
                oldPassword:'',
                newPassword:'',
                sholePassword:'',
            }
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
                let user=util.getStorage('local','userMsg')?JSON.parse(util.getStorage('local','userMsg')):{}
                this.username=user.username
            })
        },
        methods: {
            submit(){
                if(!this.oldPassword){
                    popup.alert({title:"请填写原始密码!"}); return false;
                }
                if(!this.newPassword){
                    popup.alert({title:"请填写新密码!"}); return false;
                }
                if(this.newPassword!=this.sholePassword){
                    popup.alert({title:"两次填写密码不一致!"}); return false;
                }

                util.ajax({
                    url:config.baseApi+'api/user/updatePassword',
                    data:{
                        username:this.username,
                        oldPassword:this.oldPassword,
                        newPassword:this.newPassword
                    },
                    success:data=>{
                        popup.miss({title:'修改密码成功!'})
                    }
                })   
            }
        }
    }
</script>


