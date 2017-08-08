const mongoose=require('mongoose');
const db=mongoose.createConnection('mongodb://localhost:27017/videochat');
db.once('open',function (err) {
  console.log('数据库连接成功');
});

const userSchema=new mongoose.Schema({
  'username':String,
  'pwd':String
});

module.exports=db.model("User",userSchema);


