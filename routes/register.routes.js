const app=require('express').Router()
const userModel=require('../models/user.model')
const validation=require('../validation/register.validation')
const {validationResult } = require('express-validator');
const bcrypt=require('bcrypt')

app.get('/register',(req,res)=>{
    res.render('register.ejs',{exists:req.flash('exists'),oldInputs:req.flash('oldInputs'),errors:req.flash('errors'),success:req.flash('success'),isLoggedIn:false})
})

app.post('/handleRegister',validation,async(req,res)=>{

    const{name,email,password}=req.body
    let errors=validationResult(req)
    if(errors.isEmpty()){
        let data=await userModel.find({email})
        console.log(data);
        if(data.length==0){
            bcrypt.hash(password,7,async(err,hash)=>{
                await userModel.insertMany({
                    name,email,password:hash,img:'/img/avatar.png'
                })
            })
            req.flash('success',true)

        }else{
            req.flash('oldInputs',{name,email})
            req.flash('exists',true)
            //console.log('account already exists');
        }
    }else{
        req.flash('oldInputs',{name,email})
        req.flash('errors',errors.array())
        //console.log(errors.array());
    }
    //console.log(req.body);
    res.redirect('/register')
})

module.exports=app