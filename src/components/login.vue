<template>
   <div class="login">
     <el-row>
       <el-col :span="12" :offset="12">
         登录
       </el-col>
       <el-col :span="10" :offset="6">
         <el-form label-width="100px">
           <el-form-item label="用户名">
             <el-input v-model="username"></el-input>
           </el-form-item>
           <el-form-item label="密码">
             <el-input v-model="pwd" type="password"></el-input>
           </el-form-item>
           <el-col :offset="12">
             <el-button type="primary" size="large" @click="login">登录</el-button>
           </el-col>
         </el-form>
       </el-col>
     </el-row>
   </div>
</template>
<script>
    export default {
      data(){
        return{
          username:'',
          pwd:''
        }
      },
      methods:{
        login(){
          this.$http.post('http://127.0.0.1:3000/login',{'username':this.username,'pwd':this.pwd},{emulateJSON:true}).then(res=>{
            switch (res.body.result.number){
              case 0:
                this.$message('登录成功,3秒后跳转到聊天页面!');
                setTimeout( ()=> {
                  this.$router.push({path: '/chat',query:{'username':res.body.result.username}})
                },3000);
                break;
              case -2:
                this.$message.error('密码错误!');
                setTimeout( ()=> {
                  this.pwd='';
                },3000);
                break;
              default:
                this.$message.error('用户名不存在,即将返回注册页面!');
                setTimeout(()=>{
                  this.$confirm('您是需要停留在本页面回忆用户名呢?还是返回注册页面','提示',{
                    confirmButtonText:'取消',
                    confirmButtonText:'返回注册页面',
                    type: 'warning'
                  }).then(()=>{
                    this.$message('3秒后跳转,跳转到注册页!');
                    setTimeout(()=>{
                      this.$router.push({path: '/register'})
                    },3000)
                  }).catch(()=>{
                    this.username='';
                    this.pwd='';
                  });
                });
            }
          })
        }
      }
    }
</script>
<style>

</style>
