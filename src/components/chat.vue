<template>
  <div class="chat">
    <el-row class="top">
      <el-col>聊天室</el-col>
    </el-row>
    <el-row class="content"></el-row>
    <el-row class="fixed">
      <el-col :span="22">
        <el-input v-model="sendinput"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button class="send" type="primary" :disabled="disable" @click="send">发送</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import io from '../../static/socket.io'
  export default {
    data() {
      return {
        sendinput: '',
        disable: false
      }
    },
    methods: {
      send() {
        if(this.sendinput==''){
          this.$message.error('消息不能为空！');
          return false;
        }
        this.disable = true;
        setTimeout(() => {
          this.disable = false;
          this.sendinput='';
        }, 3000);
        let socket = io('http://127.0.0.1:3000');
        let username=this.$route.query.username;
        socket.emit('message', {msg:this.sendinput,username:username});
      }
    },
    created(){
      let socket = io('http://127.0.0.1:3000');
      let username=this.$route.query.username;
      socket.emit('login',{'user':username});
      socket.on('login',(data) =>{
        this.$message('欢迎'+data.user+'加入聊天室')
      });
      socket.on('message', (data)=> {
        let col = document.createElement('div');
        col.className = 'el-col el-col-24 message';
        col.innerHTML='<div class="el-card">'+
          '<div class="el-card__body">'+
          '<div class="item">'+
          '<p>'+(new Date).toLocaleString()+'</p>'+
          '<p>'+data.username+'说:'+data.msg+'</p>'+
          '</div>'+
          '</div>'+
          '</div>';
        document.getElementsByClassName('content')[0].appendChild(col);
        document.getElementsByClassName('content')[0].scrollTop=document.getElementsByClassName('content')[0].scrollHeight;
      })
    },
    mounted(){
      let wh=document.documentElement.clientHeight || document.body.clientHeight;
      let content=wh-42;
      document.getElementsByClassName('content')[0].style.height=content+'px';
    }
  }
</script>
<style>
  .top {
    position: fixed;
    top: 0;
    left: 0;
    z-index:1999;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
    background: #58B7FF;
    box-shadow: 1px 1px 5px #58B7FF;
  }

  .content {
    padding-top: 40px;
    overflow-y: auto;
  }

  .fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
.message{
  margin-bottom: 10px;
}
  .send {
    width: 100%;
  }
</style>
