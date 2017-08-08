const mongoose=require('mongoose');
const db=mongoose.createConnection('mongodb://localhost:27017/videochat');
db.once('open',function (err) {
  console.log('数据库连接成功');
});

module.exports=db;
