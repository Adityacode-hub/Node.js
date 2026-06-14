const express=require("express");
const router=express.Router();
const bcrypt=require('bcryptjs');
const jsonowt=require('jsonwebtoken');
const passport=require('passport');
const key=require('../../setup/myurl');

//@type GET
//@route /api/auth
//@desc just for testing
//@access PUBLIC


router.get("/",(req,res)=>{
    res.json({test:"Auth is tested"})
});


const Person=require("../../models/Person");
//@type POST
//@route /api/auth/register
//@desc just for registration of users
//@access PUBLIC   


router.post("/register",(req,res)=>
{
    Person.findOne({email:req.body.email})
    .then(person=>
    {
        if(person)
        {
          return res.status(400).json({emailerror:'Email is already registered'})
        }
        else
        {
            const newPerson=new Person
                ({
         //these are the placeholders          
                  name:req.body.name,
                    email:req.body.email,
                    password:req.body.password  
                    //here got the password  
                });
                //encrypt password
                   bcrypt.genSalt(10,(err,salt)=>
                    {
                          bcrypt.hash(newPerson.password,salt,(err,hash)=>{
                            if(err)
                            {
                                console.log(err);  
                            }
                            newPerson.password=hash;
                            newPerson.save()
                            .then(person=>res.json(person)) 
                            .catch(err=>console.log(err))
                          })
                    })
        }
    }) 
    .catch(err=>console.log(err));
    
})





module.exports=router;
  