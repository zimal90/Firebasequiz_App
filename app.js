var list =document.getElementById("list");

firebase.database().ref('task').on('child_added',function(data){
    var ol = document.createElement("ol")
    var oltext = document.createTextNode(data.val().input)
    ol.appendChild(oltext)
    
    var delbtn = document.createElement("button")
    var btnText = document.createTextNode("Delete")
    delbtn.setAttribute("class","btn")
    delbtn.setAttribute('id',data.val().key)
    delbtn.setAttribute("onclick","deleteItem(this)")
    delbtn.appendChild(btnText)
    ol.appendChild(delbtn)
    
    var editbtn = document.createElement("button")
    var btnText = document.createTextNode("Edit")
    editbtn.setAttribute("class","btn")
    editbtn.setAttribute('id',data.val().key)
    editbtn.setAttribute("onclick","editItem(this)")
    editbtn.appendChild(btnText)
    ol.appendChild(editbtn)
    
   list.appendChild(ol)

}
)

function submit(){
    var task_item = document.getElementById("input")
   var key = firebase.database().ref('task').push().key
    var task = {
        input: input.value,
        key: key
    }
    console.log(task)
 firebase.database().ref('task/' + key).set(task)

    input.value = ""
}  
    
function deleteItem(e){
    firebase.database().ref('task').child(e.id).remove()
    e.parentNode.remove()
    }
    
function deleteAll(){
     firebase.database().ref('task').remove()
    list.innerHTML =""
    }
    
function editItem(e){
        var val =prompt("Enter ur value",e.parentNode.firstChild.nodeValue)
        var editupdate ={
             value :val,
            key:e.id
        }
        firebase.database().ref('task').child(e.id).set(editupdate)
        e.parentNode.firstChild.nodeValue =val;
    }
            
    