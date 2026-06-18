const express=require("express");
const router=express.Router();
const bcrypt=require('bcryptjs');
const jsonowt=require('jsonwebtoken');
const passport=require('passport');
const key=require('../../setup/myurl');
const jwt=require("../../strategies/jsonwtStrategy");
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



//@type GET
//@route /api/auth/login
//@desc just for login of user
//@access PUBLIC


router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const person = await Person.findOne({ email });

        if (!person) {
            return res.status(404).json({
                emailerror: "User not found"
            });
        }

        const isCorrect = await bcrypt.compare(
            password,
            person.password
        );

        if (!isCorrect) {
            return res.status(400).json({
                passworderror: "Password incorrect"
            });
        }

//jwt strategy

        const payload = {
            id: person.id,
            name: person.name,
            email: person.email
        };

        jwt.sign(
            payload,
            key.secret,//in my setupfolder
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.json({
                    success: true,
                    token: "Bearer " + token
                });
            }
        );

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
});

//@type GET
//@route /api/auth/profile
//@desc route to user profile
//@access PRIVATE

router.get("/profile",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.name,
        profilepic:req.user.profilepic
    })
}  )
module.exports=router;
  