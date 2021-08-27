const app=require('express').Router()

app.get('/',(req,res)=>{
    res.render('index.ejs',{isLoggedIn:false})
})

module.exports=app