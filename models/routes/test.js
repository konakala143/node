route.post('/login',async(req,res)=>{

    try {
        const{email,password}=req.body;
        const exist=await devuser.findOne({email});
        if(!exist){
            return res.status(400).send('user not exist');
        }
        if(exist.password!=password){
            return res.status(400).send('invaild password');
        }
        let payload={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'jwtpassword',{expiresIn:360000000},(error,token)=>{
            if(error) throw error;
            return res.json({exist,token});

        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Error');
    }
    
})