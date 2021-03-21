const express=require('express')
const app=express()
const db=require('./config/db')
const mongoose=require('mongoose')
const user=require('./model/user')
const path=require('path')

mongoose.connect(db.url, (err, res)=>{
    console.log('Connection succesfully')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    res.render("users")    
})

app.post('/', (req, res)=>{
    const {Name, Email}=req.body
    user.count()
    .exec()
    .then(doc=>{
        if(doc < 9){
            const tbluser=new user({
                Name:Name,
                Email:Email,
                CreatedDate:Date.now(),
                AutoCode:`VZ000${doc + 1}`
            })
            tbluser.save()
            .then(user=>{
                res.redirect('/')
            })
        }else if(doc < 99){
            const tbluser=new user({
                Name:Name,
                Email:Email,
                CreatedDate:Date.now(),
                AutoCode:`VZ00${doc + 1}`
            })
            tbluser.save()
            .then(user=>{
                res.redirect('/')
            })
        }else{
            const tbluser=new user({
                Name:Name,
                Email:Email,
                CreatedDate:Date.now(),
                AutoCode:`VZ0${doc + 1}`
            })
            tbluser.save()
            .then(user=>{
                res.redirect('/')
            })
        }
    })
})

app.listen(3000)