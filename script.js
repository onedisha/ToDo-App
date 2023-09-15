const addInput= document.querySelector("#add-input");
const addButton= document.querySelector("#add-button");
const taskList= document.querySelector("#task-list");
const searchBar= document.querySelector("#search-bar");
let data = [];

function addTask(){
    const task= addInput.value.trim();
    if(task!=""){
        addToDb({title: task, checked: false});
        addInput.value="";
    }
}

addButton.addEventListener("click", addTask);
addInput.addEventListener("keydown", function(event){
    if(event.key === "Enter") addTask();
})

taskList.addEventListener("click", function (event) {
    if(event.target.classList.contains("check-box")){
        const checkbox = event.target;
        const taskText = checkbox.nextElementSibling;
        const listItem = checkbox.parentNode;
        const changeTo = checkbox.checked;
        if (checkbox.checked) {
            taskText.classList.add("checked");
            for (let i=0; i<data.length; i++){
                if(data[i]["_id"]==listItem.id) data[i].checked=true;
            }
        } 
        else {
            taskText.classList.remove("checked");
            let k= data.filter((e)=>{
                return (e._id == listItem.id)
            })
            k[0].checked=false; 
        }
        editDb(listItem.id, changeTo);
    }

    else if(event.target.classList.contains("delete-btn")){
        const deleteBtn = event.target;
        const listItem = deleteBtn.parentNode;
        data= data.filter((e)=>e.taskID!=listItem.id);
        deleteFromDb(listItem.id);
    }
});

searchBar.addEventListener("input", function(){
    const searchText= searchBar.value.trim().toLowerCase();
    Array.from(taskList.children).forEach((e)=>{
        const taskText= e.querySelector(".task-text").textContent.toLowerCase();
        if(taskText.includes(searchText)) e.style.display = "flex";
        else e.style.display = "none";
    });
});

function addTaskFromData(){
    console.log(data);
    let listItems= "";
    for(let i=0; i<data.length; i++){        
        const listItem = `
        <li class= "list-item" id="${data[i]._id}">
            <input type= "checkbox" class= "check-box" ${data[i].checked ? "checked" : ""}>
            <span class= "task-text  ${data[i].checked ? "checked" : ""}">${data[i].title}</span>
            <button  class="delete-btn">
                <img class="delete-img" src= "images/delete.png" alt="Delete">
            </button>
        </li>
        `;
        listItems += listItem;    
    }
    taskList.innerHTML = listItems;
}

function addToDb(obj){
    const d={};
    fetch('http://localhost:4000/create',  {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(res => getDb())
    .catch(err => console.log("push unsuccessful"));
}

function deleteFromDb(tempid){
    fetch('http://localhost:4000/delete',  {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: tempid})
    })
    .then(res => res.json())
    .then(res => getDb())
    .catch(err => console.log("no data to delete!"));
}

function editDb(tempid, changeTo){
    fetch('http://localhost:4000/edit',  {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: tempid, checked: changeTo})
    })
    .then(res => res.json())
    .then(res => getDb())
    .catch(err => console.log("no data to edit!"));
}

function getDb(){
    fetch('http://localhost:4000/all')
    .then(res => res.json())
    .then(d => {
        data = d; 
        addTaskFromData();
       })
    .catch(err => alert("unable to fetch data"))
}

getDb();