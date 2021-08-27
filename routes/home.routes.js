const app=require('express').Router()
const auth=require('../middleware/auth')
const userModel=require('../models/user.model')
const usermessages=require('../models/messages.model')
var multer  = require('multer')
app.get('/home',auth.home,async(req,res)=>{
    let protocol=req.protocol
    let host=req.headers.host
    let URL=protocol+"://"+host+"/user/"+req.session.userID
   // console.log(URL);
    let data=await userModel.findOne({_id:req.session.userID})
   // console.log(data.img);
    let messages= await usermessages.find({userID:req.session.userID})
    //console.log(messages);
    res.render('home.ejs',{isLoggedIn:req.session.isLoggedIn,data,large:req.flash('large'),name:req.session.name,URL,messages})
})

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
})


app.post('/upload',async(req,res)=>{
var inputValue=req.body.vote

if(inputValue=='upload'){
   if(req.file==undefined){
    req.flash('large',true)
    res.redirect('/home')

   }else{
    console.log('upload');
    //console.log(req.file);
    //console.log(req.session.userID);
    await userModel.findOneAndUpdate({_id:req.session.userID},
        {img:"/"+req.file.path},{useFindAndModify:false}
    )
    res.redirect('/home')
   } 
}else{
    console.log('remove');
    //console.log(req.session.userID);
    
    await userModel.findOneAndUpdate({_id:req.session.userID},{img:'/img/avatar.png'},{useFindAndModify:false})
    res.redirect('/home')
}

})
module.exports=app