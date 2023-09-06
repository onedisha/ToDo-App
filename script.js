const addInput= document.querySelector("#add-input");
const addButton= document.querySelector("#add-button");
const taskList= document.querySelector("#task-list");
const searchBar= document.querySelector("#search-bar");
let data= [];
let currID=0;

data=[{"title":"dsa","checked":true,"taskID":1},
{"title":"udith","checked":true,"taskID":2},
{"title":"os","checked":false,"taskID":3},
{"title":"webdev","checked":false,"taskID":4}]

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
        const listItem= document.createElement("li");
        listItem.className='list-item';
        listItem.id= tempID;

        const checkbox= document.createElement("input");
        checkbox.type= "checkbox";
        checkbox.className= "check-box";
        listItem.appendChild(checkbox);

        const taskText= document.createElement("span");
        taskText.textContent= task;
        taskText.className= "task-text";
        listItem.appendChild(taskText);

        const deleteBtn= document.createElement("button");
        deleteBtn.className="delete-btn";
        listItem.appendChild(deleteBtn);

        const deleteImg= document.createElement("img");
        deleteImg.className= "delete-img";
        deleteImg.src="images/delete.png";
        deleteImg.alt="Delete";
        deleteBtn.appendChild(deleteImg);
        
        taskList.appendChild(listItem);
        addInput.value="";
    }
}

addButton.addEventListener("click", addTask);
addInput.addEventListener("keydown", function(event){
    if(event.key === "Enter" && addInput.value.trim()!=""){
        addTask(addInput.value.trim());
    }
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
    }

    else if(event.target.classList.contains("delete-btn")){
        const deleteBtn = event.target;
        const listItem = deleteBtn.parentNode;
        taskList.removeChild(listItem);
        data= data.filter((e)=>e.taskID!=listItem.id);
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
    for(let i=0; i<data.length; i++){
        const listItem= document.createElement("li");
        listItem.className='list-item';

        const checkbox= document.createElement("input");
        checkbox.type= "checkbox";
        checkbox.className= "check-box";
        checkbox.checked= data[i].checked;
        listItem.appendChild(checkbox);
        
        const taskText= document.createElement("span");
        taskText.textContent= data[i].title;
        taskText.className= "task-text";
        listItem.appendChild(taskText);
        if(checkbox.checked) taskText.classList.add("checked");
        
        const deleteBtn= document.createElement("button");
        deleteBtn.className="delete-btn";
        listItem.appendChild(deleteBtn);

        const deleteImg= document.createElement("img");
        deleteImg.className= "delete-img";
        deleteImg.src="images/delete.png";
        deleteImg.alt="Delete";
        deleteBtn.appendChild(deleteImg);
        
        taskList.appendChild(listItem);
    }
}

addTaskFromData();