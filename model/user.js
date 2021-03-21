const mongoose=require('mongoose')

const mongooseschema=mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    AutoCode:{
        type:String,
        require:true
    },
    CreatedDate:{
        type:Date,
        require:true
    }
})

const user=mongoose.model('users',mongooseschema)

module.exports=user