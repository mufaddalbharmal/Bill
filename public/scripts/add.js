var varname=document.getElementById('name')    
var varvalue=document.getElementById('value')    
var varrate=document.getElementById('rate')    
var submit=document.getElementById('submit')
varname.focus()
if(varname.value!=''){
    varrate.removeAttribute('disabled')
}
else{
    varrate.setAttribute('disabled','')
}

varname.addEventListener('keyup',(event)=>{
    varvalue.value=varname.value
    if(varname.value!=''){
        varrate.removeAttribute('disabled')        
        if(event.key=='Enter'){
            varrate.focus()
        }
    }
    else{
        varrate.setAttribute('disabled','')
    }
})


varrate.addEventListener('keyup',(event)=>{        
    if(Number(varrate.value)==rate.value){
        if(event.key=='Enter'){
            submit.focus()
        }
    }
})


    
submit.addEventListener('keyup',(event)=>{
    event.preventDefault()
    if(event.key=='Enter'){
        if(varname.value!=''){
            if(varrate.value==''){
                alert("Rate of the Item cannot be empty")
            }            
            else if(varname.value===varvalue.value){
                var name=varname.value
                var value=varvalue.value
                var rate=varrate.value
                fetch('/itemAdd',{
                    method:'POST',
                    body:JSON.stringify({
                        name,value,rate
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then((response)=>{
                    return response.json()
                })
                .then((message)=>{
                    if(message["status"]=='ok'){
                        if(message["added"]){
                            alert("Item Added Successfully")                                 
                            window.location.reload()
                        }
                        else{
                            alert("Duplicate Item")                            
                            varname.select()
                        }
                    }
                })
            }
            
        }
        else{
            alert("Name of the item cannot be empty")
        }
    }
})