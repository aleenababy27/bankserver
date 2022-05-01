

const express =  require('express'); //import express

const dataservice = require('./services/data.service')

const app = express() //server app using express

app.use(express.json()) // parse json to data

app.get('/',(req,res)=>{res.send("GET REQUEST1")}) //resolving api call - here used get to read

app.post('/',(req,res)=>{res.send("POST REQUEST1")}) //resolving api call - here used post to read/write or  simply create

app.put('/',(req,res)=>{res.send("PUT REQUEST1")}) //resolving api call - here used put to  simply modify ENTIRE DATA

app.patch('/',(req,res)=>{res.send("PATCH REQUEST1")}) //resolving api call - here used PATCH to simply MODIFY  SMALL PORTIONS OF DATA

app.delete('/',(req,res)=>{res.send("DELETE REQUEST1")}) //resolving api call - here used DELETE to simply DELETE

// resolve register API

app.post('/register',(req,res)=>{ 
    
    const result= dataservice.register(req.body.uname,req.body.acno,req.body.password)

    // if(result){
    //     res.send("Successfully Registered")
    // }
    // else{
    //     res.send("Account already existing")
    // }
    // this is using true or false return

res.status(result.statusCode).json(result)
})

// resolve login API 

app.post('/login',(req,res)=>{ 
    
    const result= dataservice.login(req.body.acno,req.body.pswd)

res.status(result.statusCode).json(result)
})

// resolve deposit API

app.post('/deposit',(req,res)=>{ 
    
    const result= dataservice.deposit(req.body.acno,req.body.pswd,req.body.amt)

    res.status(result.statusCode).json(result)
})

// resolve withdraw API

app.post('/withdraw',(req,res)=>{ 
    
    const result= dataservice.withdraw(req.body.acno,req.body.pswd,req.body.amt)

    res.status(result.statusCode).json(result)
})

app.listen(3000,()=>{ console.log('server started at 3000');})  //set port number



