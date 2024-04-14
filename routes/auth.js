const route=require('express').Router();
//const jwt=require('jsonwebtoken');
const passport=require('passport')



//require user model..
const User=require('../models/devusernodel');

const middleware=require('../middleware')


//Use passport-local configuration Create passport local Strategy
passport.use(User.createStrategy());

//Serialize and deserialize are only necessary when using session
passport.serializeUser(function(user, done) {
  done(null, user.id);
   console.log('step-2')
  console.log(user.id);
});
passport.deserializeUser(function(id, done) {
  console.log(id);
  console.log('step-3');
  User.findById(id, function (err, user) {
    done(err, user);

    console.log(err,user);
  });
});


route.get('/',(req,res)=>{
    return res.send('Hello, world!!');
})
// route.post('/register',async (req,res)=>{
//    try {
//     //console.log(req.body);
//     const{ fullname,email,mobile,skill,password,confirmpassword}=req.body;
//     const exist=await devuser.findOne({email});
//     if(exist){
//         return res.status(400).send('this email is alredy exist');
//     }
//     if(password!=confirmpassword){
//         return res.status(400).send('password does not match with confirmpassword');
//     }
//     let newUser= new devuser({fullname,email,mobile,skill,password,confirmpassword})
//     newUser.save();
    
//     return res.status(200).send(newUser);
//    } catch (error) {
//     console.log(error)
//     return res.status(500).send('Server Error');
    
//    }
// })

//Local route Register new user
route.post("/auth/register", async (req, res)=>{
    try{
      //Register User
      const registerUser = await User.register({username: req.body.username}, req.body.password);
      console.log(registerUser);
      if(registerUser){
        // if user registered, we will authenticate the user using passport
        passport.authenticate("local")(req,res,function(){
          res.send(registerUser);
        });
      }else{
        res.redirect("/register");
      }
    }catch(err){
      console.log(err)
      res.send("Error: " + err.message);
    }
  });
  
  //Local route Login user
  route.post("/auth/login", (req, res)=>{
    //create new user
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    //use passport login method to check if user credentials true and  authenticate it
    //console.log(user);
    console.log('step-1')
    req.login(user, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log('step-4')
        passport.authenticate("local")(req, res, ()=>{
          console.log('step-5')
          res.send(user);
        });
      }
    });
  });



// route.post('/login',async(req,res)=>{

//     try {
//         const{email,password}=req.body;
//         const exist=await devuser.findOne({email});
//         if(!exist){
//             return res.status(400).send('user not exist');
//         }
//         if(exist.password!=password){
//             return res.status(400).send('invaild password');
//         }
//         let payload={
//             user:{
//                 id:exist.id
//             }
//         }
//         jwt.sign(payload,'jwtpassword',{expiresIn:360000000},(error,token)=>{
//             if(error) throw error;
//             return res.json({exist,token});

//         })
        
//     } catch (error) {
//         console.log(error)
//         return res.status(500).send('Server Error');
//     }
    
// })



route.get('/allusers',async (req,res)=>{
    try {
        const allusers=await devuser.find();
        return res.status(200).json(allusers);
        
    } catch (error) {
        return res.status(500).send('Server Error');
    }

})
route.get('/myprofile', middleware,async (req,res)=>{
    try {
        console.log(req.user);
        let myprofile=await devuser.findById(req.user.id);
        return res.status(200).send(myprofile);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
        
    }
})



//Logout user
route.get("/auth/logout", (req, res)=>{
  //use passport logout method to end user session and unauthenticate it
  console.log('step-1')
  req.logout(function(err) {
    console.log('step-2')
    if (err) { return next(err); }
    res.redirect("/");
  });
});









// route.get("/logout",(req,res)=>{
//     //use passport logout method
//     console.log('step-1')
//     req.logout();
//     res.send('user logout sucessfully..');
// });

module.exports = route;