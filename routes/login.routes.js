const app=require('express').Router()
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const auth=require('../middleware/auth')
app.get('/login',auth.login,(req,res)=>{
    res.render('login.ejs',{dexists:req.flash('dexists'),incpassword:req.flash('incpassword'),isLoggedIn:false,oldInputs:req.flash('oldInputs')})
})

app.post('/handleLogin',async(req,res)=>{
    const{email,password}=req.body

    let data=await userModel.find({email})
    //console.log(data[0]._id);
    if(data.length!=0){
        let match = await bcrypt.compare(password,data[0].password)
        //console.log(match);
        if(match){
            req.session.isLoggedIn=true
            req.session.userID=data[0]._id
            req.session.name=data[0].name
            res.redirect('/home')
        }else{
            console.log('wrong pass');
            req.flash('oldInputs',{email,password})
            req.flash('incpassword',true)
            res.redirect('/login')

        }
    }else{
        req.flash('dexists',true)
        res.redirect('/login')

    }
})

module.exports=app