const { Schema, model } = require('mongoose')

const user = new Schema({
    username:{type:String,required:true},
    password:{type:String, minLength:6,required:true},
    email:{type:String,required:true}
},{collection:'users'})

module.exports = model('User',user)