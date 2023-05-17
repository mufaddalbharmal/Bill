require('dotenv').config()
var express=require('express')
var fs=require('fs')
var file=require('./public/items.json')
var app=express()


app.use(express.json())
app.use(express.static('./public'))

let currentDate = new Date();
let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

app.post('/itemAdd',(req,res)=>{
    var{name,value,rate}=req.body
    var v=1;
    file.forEach(ele => {
        if(ele["name"].toLowerCase()==name.toLowerCase() && ele["value"].toLowerCase()==value.toLowerCase()){
            res.send({
                status:'ok',
                added:0
            })
            v=0;
            return
        }
    });  
    if(v){
        file.push(req.body)    
        fs.writeFile('./public/items.json',JSON.stringify(file),err=>{
            if(err) throw err;
            console.log(`Item '${name}' Added Succcessfully`)
            res.send({
                status:'ok',
                added:1
            })
        })
    }

})


app.post('/itemsModification',(req,res)=>{
    var{name,value,rate,valueChanged,RateChanged}=req.body
    file.forEach(ele => {
        if(ele["name"]==name && ele["value"]==value && ele["rate"]==rate){
            console.log(valueChanged,RateChanged)
            ele["name"]=valueChanged
            ele["value"]=valueChanged
            ele["rate"]=RateChanged
            fs.writeFile('./public/items.json',JSON.stringify(file),function(err){
                if(err) throw err
                console.log(`Item '${name}' Edited to '${ele["name"]}' Successfully`)
                modify=true
                res.send({
                    status:'ok',
                    modified:1
                }) 
            })

        }
    });    
})
console.log(process.env.PORT)
port=process.env.PORT
app.listen(port,()=>{
    console.log(currentDate, time)
    console.log("App is listening on",port)
})