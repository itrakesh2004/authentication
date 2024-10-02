const users = require('../model/user_schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.home=(req,res)=>{
    res.render('index');
}

exports.create=(req,res)=>{

    try{
       const {name,userName,email,password,bio}=req.body;

       bcrypt.genSalt(10,(err,salt)=>{
           bcrypt.hash(password,salt,async(err,hash)=>{

               if(err){
                   console.log(err);
               }
              
            const createuser= await users .create({
                name,
                userName,
                email,
                password:hash,
                bio
               })

               const token=jwt.sign({email},"sssshhs")
               res.cookie("token",token);

               res.render('login');

            //    res.status(201).json({
            //     success:true,
            //     data:createuser,
            //     token
            //    })
           })
       })
     
       
    }catch(err){
        console.log(err);
        res.status(404).json({
            success:false,
            message:err
        })
    }
}


exports.homelogin=(req,res)=>{
    res.render('login');  
  }


  exports.login=async(req,res)=>{
      try{

         const {email,password}=req.body;

        const loginUser=await users.findOne({email});

        const token=jwt.sign({email},"sssshhs");
        res.cookie("token",token);

         if(!loginUser){
             return res.status(404).json({
                 success:false,
                 message:"user not found"
             })
         }

         const isMatch=await bcrypt.compare(password,loginUser.password);

         if(!isMatch){
             return res.status(404).json({
                 success:false,
                 message:"not match"
             })
         }
         res.render('true');
        //  res.status(200).json({
        //      success:true,
        //      data:loginUser,
        //      token
             
             
        //  })
      }catch(err){
          console.log(err);
          res.status(404).json({
              success:false,
              message:err
          })
      }
  }