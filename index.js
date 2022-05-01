

const express =  require('express'); //import express

const app = express() //server app using express

app.get('/',(req,res)=>{res.send("GET REQUEST")}) //resolving api call - here used get to read

app.listen(3000,()=>{ console.log('server started at 3000');})  //set port number



