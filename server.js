//require necessary packages..
require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const session = require("express-session");
const passport = require("passport");
// const path=require('path');
// const logger=require('morgan');
// const cookieParser=require('cookie-parser')
//const session=require('cookie-session');
//const favicon=require('serve-favicon')
const ejs=require('ejs');
// const LocalStrategy=require('passport-local').Strategy;
// const flash=require('connect-flash')
// const bcrypt=require('bcrypt');
const bodyParser = require("body-parser");
//const passportLocalMongoose = require("passport-local-mongoose");

const authRoute=require('./routes/auth')


//const middleware=require('./middleware');
//const jwt=require('jsonwebtoken');

const app=express();


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

//const {mailFunction}=require('./mail');
mongoose.connect(process.env.DB_CONNECT).then(
    ()=>console.log('Db is Connected..')
)
//mongoose.set('useCreateIndex',true);
//app.use(express.static("public")); 
//app.use(bodyParser.urlencoded({extended:true})); 
//passport.use(new LocalStrategy(User.authenticate()));

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session({keys:['secretkey1','secretkey2','....']}))
// app.use(flash());
// app.use(express.static(path.join(__dirname,'public')))


//Setup view engine EJS, use body-parser and express static
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Setup session
app.use(session({ 
    secret: "any long secret key", 
    resave: false, 
    saveUninitialized: false
  })); 






  // Initializing Passport 
  app.use(passport.initialize()); 

    
  // Starting the session
  //Use passport to deal with session 
  app.use(passport.session()); 

//   passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));


//   passport.use(new LocalStrategy((email,password,done)=>{
//         devuser.findOne({email:email},function(err,user){
//             if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       })
        //.then(user=>{
        //     if(!user){
        //         return res.send('you did not register ');
        //     }
        //     if(password==user.password){(err,match)=>{
        //         if(err) throw err;
        //         if(match){
        //             return done(user);
        //         }else{
        //             return done('Incorrect password');
        //         }

        //     }
                
        //     }
        // })
//         .catch(err=>console.log(err));

//   }))

  //passport.use(devuser.createStrategy({ email: 'email',password:'password' }));
  

// const devusernodel=require('./models/devusernodel')
// passport.use(new LocalStrategy(devusernodel.authenticate()))


  
 // Serializing and deserializing 
//  passport.serializeUser(devusernodel.serializeUser()); 
//  passport.deserializeUser(devusernodel.deserializeUser()); 

// passport.serializeUser((user,done)=>{
//     done(user.id);
// })
// passport.deserializeUser((id,done)=>{
//     devuser.findById(id,(err,user)=>{
//         done(err,user);
//     })
// })



app.use(express.json());
//use application routes
app.use('/',authRoute);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// })


app.listen(process.env.PORT,()=>console.log('Server running...'))