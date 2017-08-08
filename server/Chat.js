const mongoose=require('mongoose');
const db=require('./db');

const ChatSchema=new mongoose.Schema({
     'username':String,
     'message':String,
     'time':Date
});

module.exports=db.model("Chat",ChatSchema);
