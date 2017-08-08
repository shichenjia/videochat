<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :offset="12">
        注册
      </el-col>
      <el-col :span="10" :offset="6">
        <el-form label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="pwd"></el-input>
          </el-form-item>
          <el-col :offset="12">
            <el-button type="primary" size="large" @click="register">注册</el-button>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      username:'',
      pwd:''
    }
  },
  methods:{
    register(){
        this.$http.post('http://127.0.0.1:3000/register',{'username':this.username,'pwd':this.pwd},{emulateJSON:true}).then(res=>{
          switch (res.body.result.number){
            case 0:
              this.$message('注册成功,3秒后跳转登录页面!');
              setTimeout( ()=> {
                this.$router.push({path: '/login'})
              },3000);
              break;
            default:
              this.$message.error('用户名已存在,请更换一个!');
              setTimeout(()=>{
                this.username='';
                this.pwd='';
              },3000)
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
