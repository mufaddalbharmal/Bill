var table=document.getElementById('table')
var names=document.getElementsByName('names')
var qty=document.getElementsByName('qty')
var rate=document.getElementsByName('rate')
var amt=document.getElementsByName('amt')
var totamt=document.getElementById('totamt')
var itemsbox=document.getElementsByClassName('itemsbox')
var itemsboxinput=document.getElementsByName('itemsboxinput')
var itemslist=document.getElementsByClassName('itemslist')
var itemsbox=document.getElementsByClassName('itemsbox')
var buttons=document.getElementsByName('itemsbutton')
    

var names=[]
var Data=""

function itemslistClose(itemslist){
    for(var i=0;i<itemslist.length;i++)
    itemslist[i].style.display='none' 
}
function Funsort(data){
    data.sort(function(stra,strb){
        var namea=stra.name.toLowerCase();
        var nameb=strb.name.toLowerCase();

        if(namea<nameb)
        return -1;
        if(namea>nameb)
        return 1;
        return 0;
    })
}
function Remove(divName){
    if(divName){
        while (divName.firstChild) {
            divName.firstChild.remove()
        }
    }
}
function FunSearch(itemsboxtemp,data){        
    var newData=[]    
    InputValue=itemsboxtemp.children[0].value
    data.forEach(ele => {
        if(ele["value"].toLowerCase().match(InputValue)){
            newData.push(ele)
        }
    });
    Remove(itemslist[elementFocused.id])
    appendItems(itemslist,elementFocused.id,newData)
}
function appendRate(event,data){
    var tempid=event.target.id
    itemName=itemsboxinput[tempid].value    
    itemRate=rate[tempid]    
    data.forEach(ele => {
        if(ele["value"]===itemName){
            itemRate.value=ele["rate"]
            itemRate.select()
        }
    });
}
function appendRow(event){
    event.preventDefault()
    targetedId=event.target.id
    var currentqty = qty[targetedId].value
    var currentrate = rate[targetedId].value
    var currentamt = amt[targetedId].value
    console.log(currentqty)
    console.log(currentrate)
    console.log(currentamt)

    if(!currentqty && !currentrate && !currentamt){
        return 0;
    }
    else if(itemsbox.length-1==targetedId){

        var gridcontainer=document.getElementsByClassName('grid-container')
        var NewId=gridcontainer[0].children.length/4-1        
        var divitemsbox=document.createElement('div')
        divitemsbox.innerHTML=`<input name="itemsboxinput" class="itemsboxinput" id=${NewId} type="text">
        <div class="itemslist" id=${NewId} name="itemslist">
        </div>`

        divitemsbox.setAttribute('name','itemsbox')
        divitemsbox.setAttribute('id',NewId)
        divitemsbox.setAttribute('class','itemsbox')

        var divqty=document.createElement('div')
        var divrate=document.createElement('div')
        var divamt=document.createElement('div')

        divqty.innerHTML=`<input class="qty" name="qty" type="number" id=${NewId}>`
        divrate.innerHTML=`<input class="rate" name="rate" type="number" id=${NewId}>`
        divamt.innerHTML=`<input class="amt" disabled="disabled" name="amt" type="number" id=${NewId}>`

        gridcontainer[0].append(divitemsbox)
        gridcontainer[0].append(divqty)
        gridcontainer[0].append(divrate)
        gridcontainer[0].append(divamt)
        
        Funitemsbox(document.getElementsByClassName('itemsbox'),NewId)
        // Funnames(document.getElementsByName('names'))
        Funqty(document.getElementsByName('qty'))
        // var itemsLen=items.length
        appendItems(itemslist,itemslist.length-1,Data)
        return 1;
    }
}
function totalAmount(){
    var temptotal=0    
    amt.forEach(ele => {        
        temptotal+=Number(ele.value)
    });
    // console.log(temptotal)
    return temptotal; 
}
function Funqty(qty){
    qty.forEach(qtykeyup => {        
        qtykeyup.addEventListener('keyup',(event)=>{            
            var targetParentElementId=event.target.id                
            if(event.key=='Enter'){
                appendRate(event,Data)
                rate[targetParentElementId].focus()
            }
            rateValue=rate[targetParentElementId].value    
            if(rateValue && qtykeyup.value){
                    amt[targetParentElementId].value=rateValue*qtykeyup.value                
                    var totalAmountfun=totalAmount()
                    if(totalAmountfun)
                        totamt.value=totalAmountfun
                    else
                        totamt.value=''
            }
            else{
                amt[targetParentElementId].value=''        
                var totalAmountfun=totalAmount()
                if(totalAmountfun)
                    totamt.value=totalAmountfun
                else
                    totamt.value=''
            }        
        })
        qtykeyup.addEventListener('focusin',(event)=>{
            // qtykeyup.select();
            itemslistClose(itemslist)
        })
    });
}
function Funrate(rate){
    rate.forEach(ratekeyup => {    
        ratekeyup.addEventListener('keyup',(event)=>{            
            var targetParentElementId=event.target.id
            qtyvalue=qty[targetParentElementId].value    
            if(qtyvalue && ratekeyup.value){
                amt[targetParentElementId].value=qtyvalue*ratekeyup.value
                var totalAmountfun=totalAmount()
                if(totalAmountfun)
                    totamt.value=totalAmountfun
                else
                    totamt.value=''
            }
            else{   
                amt[targetParentElementId].value=''        
                var totalAmountfun=totalAmount()
                if(totalAmountfun)
                    totamt.value=totalAmountfun
                else
                    totamt.value=''
            }       
            if(event.key=='Enter'){
                if(appendRow(event))
                Funrate(document.getElementsByName('rate'))                
                itemsboxinput[Number(targetParentElementId)+1].focus()

            }
        })
        ratekeyup.addEventListener('focusin',(event)=>{
            // ratekeyup.select()
            itemslistClose(itemslist)
        })
    });    
}
function appendItems(itemslist,index,data,InputValue){    
    data.forEach(ele => {        
        var button=document.createElement('button')
        var v=1;             
        for(var i=0;i<itemslist.length;i++){
            if(itemsboxinput[i].value==ele["value"] && itemsboxinput[index].value!=ele["value"]){
                v=0;
                break;
            }
        }                
        if(v){
            button.innerHTML=ele["name"]
            button.setAttribute('value',ele["value"])
            button.setAttribute('name','itemsbutton')
            button.setAttribute('id','itemsbutton')
            button.setAttribute('class','itemsbutton')            
            itemslist[index].append(button) 
            if(InputValue==ele["value"])
            button.focus()
        }        
    });    
}
function FunitemsboxinputFocus(){
    for(var i=0;i<itemslist.length;i++){
        if(itemslist[i].style.display=='flex'){
            itemsboxinput[i].focus()
            itemsboxinput[i].select()
            return
        }
    }
    itemsboxinput[0].focus()
}
function Fetchitems(){
    fetch('items.json')
        .then((response)=>{            
            return response.json()
        })
        .then((data)=>{
            Data=data
            Funsort(data)
            FunitemsboxinputFocus()
            // appendItems(itemslist,0,Data)                       
        })        
        .catch((err)=>{
            console.log('error: '+err)
        })
}
function Funitemsbox(itemsbox,index){ 
    itemsbox[index].addEventListener('keyup',(event)=>{            
        event.preventDefault();
        // console.log(event)
        elementFocused=document.activeElement                
        itemsboxinputId=elementFocused.id            
        if(elementFocused==itemsboxinput[itemsboxinputId])
        FunSearch(itemsbox[elementFocused.id],Data)
        buttonchildrens=elementFocused.parentElement.children                                     
        if(event.key=='ArrowDown'){
            elementToBeFocused=elementFocused.parentElement.children[1].children[0]                              
            if(elementFocused==itemsboxinput[elementFocused.id])                            
                elementToBeFocused.focus()        
            for(var i=0;i<buttonchildrens.length;i++){
                if(buttonchildrens[i]==elementFocused){                
                    buttonchildrens[(i+1)%buttonchildrens.length].focus()                        
                    break;
                    return
                }                
            }
        }
        else if(event.key=='ArrowUp'){
            for(var i=0;i<buttonchildrens.length;i++){
                if(buttonchildrens[i]==elementFocused){                
                    if(i==0)
                    buttonchildrens[buttonchildrens.length-1].focus()
                    else
                    buttonchildrens[i-1].focus()
                    return
                }                
            }
        }      
        else if(event.key=='Enter' && event.target.value!=''){
            itemsboxinputParentElement=elementFocused.parentElement.parentElement
            itemsboxinputParentElement.children[0].value=elementFocused.value
            itemslist[elementFocused.parentElement.id].style.display='none'                                
            qty[itemsboxinputParentElement.children[0].id].focus()
                        
        }
        else if(event.key==' ' && event.code=='Space'){
            var tempid=event.target.id
            if(itemsboxinput[tempid].value==' '){
                itemslist[tempid].style.display='flex'
            }
        }
        else if(event.key=='F8'){
            for(var i=0;i<itemslist[index].children.length;i++){
                if(event.target==itemslist[index].children[i]){
                    window.open(`edit.html?value=${event.target.value}`,'_blank')
                    
                }
            }
        }
        else{                            
            itemsboxinput[elementFocused.parentElement.id].focus()
        }
    })       
    itemsboxinput[index].addEventListener('focusin',(event)=>{                                   
        itemslistId=event.target.id
        Remove(itemslist[itemslistId])
        InputValue=event.target.value
        appendItems(itemslist,itemslistId,Data,InputValue)
        itemslist[itemslistId].style.display='flex'
    })     
}
Funqty(qty)
Funrate(rate)
Fetchitems()
Funitemsbox(itemsbox,0)


document.addEventListener("visibilitychange", (event) => {
    Fetchitems()
    if (document.visibilityState == "visible")
        console.log("tab is active")      
    else
        console.log("tab is inactive")
    
});