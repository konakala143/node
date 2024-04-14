const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    try{
        let token=req.header('Authorization');
        if(!token){
            return res.status(400).send('Token not Found');
        }
        let decoded=jwt.verify(token,'jwtpassword');
        req.user=decoded.user;
        next();

    }
    catch(error){
        console.log(error);
        return res.status(400).send('Authentication Error');
    }

}