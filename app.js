const express = require('express')
const app=express();

app.listen(process.env.PORT || 3000,()=>{
    console.log(`listening ${process.env.PORT||3000}`);
});

app.get('/',async(req,res)=>{
    res.send("<h1>hey divi</h1>")
})