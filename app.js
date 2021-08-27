const express = require('express')
const app = express()
const port = 3000
const path=require('path')
const mongoose=require('mongoose')
const session = require('express-session')
var flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/SarahahProjectHTML',
    collection: 'mySessions'
  });

var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ '-' +file.originalname)
    }
  })
  const limits = { fileSize: 1000 * 1000 * 7 }
  function fileFilter (req, photo, cb) {
 
    if(photo.size<=1000*1000*7&&photo.mimetype=='image/jpg'||photo.mimetype=='image/jpeg'||photo.mimetype=='image/png'){
    // To accept the file pass `true`, like so:

      cb(null, true)

    }else{
// To reject this file pass `false`, like so:
   
      cb(null, false)
    }
    
   
   
   
  }

var upload = multer({ dest: 'uploads',storage,fileFilter })
app.use(upload.single('photo'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))
app.use(flash());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.set('view engine','ejs')
app.use(require('./routes/index.routes'))
app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))
app.use(require('./routes/user.routes'))
mongoose.connect('mongodb://localhost:27017/SarahahProjectHTML',{useNewUrlParser:true,useUnifiedTopology:true})
app.listen(port, () => console.log(`Example app listening on port port!`))