const mongoose=require('mongoose')

const messageSchema=mongoose.Schema({
    message:String,
    userID:mongoose.Schema.Types.ObjectId
})

const messageModel=mongoose.model('message',messageSchema)

module.exports=messageModel