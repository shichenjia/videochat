const mongoose=require('mongoose');
const db=require('./db');
const userSchema=new mongoose.Schema({
  'username':String,
  'pwd':String
});

module.exports=db.model("User",userSchema);


