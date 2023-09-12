const addInput= document.querySelector("#add-input");
const addButton= document.querySelector("#add-button");
const taskList= document.querySelector("#task-list");
const searchBar= document.querySelector("#search-bar");
let data = [];

let currID=data.length;

function createID(){
    currID++;
    return currID;
}

function addTask(){
    const task= addInput.value.trim();
    if(task!=""){
        let tempID = createID();
        data.push({
            title: task, 
            checked: false,
            taskID: tempID
        });
        console.log(JSON.stringify(data));
        addTaskFromData();
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
        if (checkbox.checked) {
            taskText.classList.add("checked");
            for (let i=0; i<data.length; i++){
                if(data[i]["taskID"]==listItem.id) data[i].checked=true;
            }
        } else {
            taskText.classList.remove("checked");
            let k= data.filter((e)=>{
                return (e.taskID == listItem.id)
            })
            k[0].checked=false; 
        }
        addTaskFromData();
    }

    else if(event.target.classList.contains("delete-btn")){
        const deleteBtn = event.target;
        const listItem = deleteBtn.parentNode;
        taskList.removeChild(listItem);
        data= data.filter((e)=>e.taskID!=listItem.id);
        addTaskFromData();
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
        <li class= "list-item" id="${data[i].taskID}">
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
    saveToLocalStorage();
}


function saveToLocalStorage(){
    localStorage.setItem("tasks",JSON.stringify(data));
}

function loadFromStorage(){
    let tasks= localStorage.getItem("tasks");
    if(tasks!=null) data = JSON.parse(tasks);
}

loadFromStorage();
addTaskFromData();