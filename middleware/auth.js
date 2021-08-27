module.exports.home=(req,res,next)=>{
    if(req.session.isLoggedIn){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports.login=(req,res,next)=>{
    if(!req.session.isLoggedIn){
        next()
    }else{
        res.redirect('/home')
    }
}
