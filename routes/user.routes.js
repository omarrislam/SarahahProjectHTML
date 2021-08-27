const app=require('express').Router()
const userModel=require('../models/user.model')
const messagesModel=require('../models/messages.model')

let userID
app.get('/user/:id',async(req,res)=>{
    let data=await userModel.findOne({_id:req.session.userID})
    console.log(data);
    userID=req.params.id
    //console.log(req.params);
    res.render('user.ejs',{isLoggedIn:false,data})
})

app.post('/handleAdd',async(req,res)=>{
    const{message}=req.body
    await messagesModel.insertMany({message,userID})
    res.redirect('/user/'+userID)
})

module.exports=app