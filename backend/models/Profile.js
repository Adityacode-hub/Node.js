const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Profileschema=new Schema({
user:{
    type:Schema.Types.ObjectId,
    ref:"myPerson"
},
username:{
    type:String,
    required:true,
    max:50
},
website:{
    type:String,
},
country:{
    type:String 
},
Languages:{
    type:[String],
    required:true

},
portfolio:{
    type:String 
},
workrole:[{
    role:{
        type:String,
        required:true 
    },
    company:{
        type:String
    },
    country:{
        type:String
    },
    from:{
        type:Date,
        required:true
    },
    to:{
        type:Date,  
    },
    current:{
        type:Boolean,
        default:false
    },
    details:{
        type:String
    }
}],
social:{
    youtube:{
        type:String 
    },
    twitter:{
        type:String 
    },
    github:{
        type:String
    }

}
})

module.exports=Profile=mongoose.model("myProfile",Profileschema);
