const app=require('express')();
const server=require('http').Server(app);
const io=require('socket.io')(server);
const formidable = require('formidable');
const User=require('./User');
const md5=require('md5');

app.post('/register',function (req,res) {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":"X-Requested-With",
    "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
    "X-Powered-By":' 3.2.1',
    "Content-Type":"application/json;charset=utf-8"
  });
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
      let username=fields.username;
      let pwd=fields.pwd;
      pwd=md5(pwd);
      User.find({'username':username},function (err,result) {
         if(result.length==0){
           User.create({'username':username,'pwd':pwd},function (err) {
             if(err) throw err;
             res.json({result:{number:0}});
           })
         }else{
           res.json({result:{number:-1}})
         }
      });
  });
});

app.post('/login',function (req,res) {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":"X-Requested-With",
    "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
    "X-Powered-By":' 3.2.1',
    "Content-Type":"application/json;charset=utf-8"
  });
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let username=fields.username;
    let pwd=fields.pwd;
    pwd=md5(pwd);
    User.find({'username':username},function (err,result) {
      if(result.length!=0){
        if(result[0].pwd!=pwd){
           res.json({result:{number:-2}})
        }else{
          res.json({result:{number:0,username:username}})
        }
      }else{
        res.json({result:{number:-1}})
      }
    });
  });
});
io.on('connection', function (socket) {
   socket.on('message',function (data) {
     io.emit('message',data)
   });
   socket.on('login',function (data) {
     io.emit('login',data)
   });
  socket.on('disconnect', () => {
    console.log('断开连接'+new Date())
  })
});

server.listen(3000);
