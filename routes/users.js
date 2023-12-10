var mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pin");

const userSchema = mongoose.Schema({
  // username:{
  //   type:String,
  //   require:true,
  //   unique:true,
  // },
  // password:{
  //  type:String,
  //  require:true,
  // },
  // // posts:[{
  // //  type:mongoose.Schema.Types.ObjectId,
  // //  ref:'Post'
  // // }],

  // dp:{
  //   type:String,
  // },
  // email:{
  //   type:String,
  //   require:true,
  //   unique:true,
  // },
  // fullname:{
  //   type:String,
  //   require:true,
  // }
  username:String,
  fullname:String,
  email:String,
  password:String,
  profileImage:String,
  boards:{
    type: Array,
    default:[]
  }
});


userSchema.plugin(plm);

module.exports = mongoose.model('user',userSchema);