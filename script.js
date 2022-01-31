const addIcons = document.getElementsByClassName("section__add-icon");
const tasks = document.getElementsByClassName("task-list");
let isAddTaskWindowOpen = false;
let taskWindow = null; 

function closeTaskWindow (taskWindow){
  taskWindow.children[4].children[1].addEventListener("click", event => {taskWindow.style.display = "none"; isAddTaskWindowOpen = false;});  
}
function addNewTask(taskWindow, containerSection){
  isAddTaskWindowOpen = true;
      // Default Input Values: 
      let  taskName = `Untitled Task`; 
        const currentDate = new Date();
      let taskDescription = `No Description was Provided, Add One!`;
      let taskDate = `${currentDate.getFullYear()}/${currentDate.getMonth()+1}/${currentDate.getDate()}`;
      let taskTime = `00:00`;
  taskWindow.children[4].children[0].addEventListener("click", 
  function (event){

    // Assiging Values:
     if (taskWindow.children[0].value){ taskTime = taskWindow.children[0].value;}
     if (taskWindow.children[1].value){taskDate = taskWindow.children[1].value.replace(/\-/g,"/");}
     if (taskWindow.children[2].innerHTML !== "Task"){taskName = taskWindow.children[2].innerHTML;}
     if (taskWindow.children[3].innerHTML !== "Add The Task Description here" ){taskDescription = taskWindow.children[3].innerHTML;}
      console.log(taskDate)
    //Create The New Element:
      const newTask = document.createElement("div");
            newTask.classList.add("task-list");
            newTask.innerHTML = `
            <header class="task-list__list-header">
             <div class="list-header__time">
              <img src="images/timer-icon.png">
              <span>${taskTime}</span>
             </div>
             <div class="list-header__date">
               <img src="images/calendar-icon.png">  
              <span >${taskDate}</span>
             </div>
            </header>
            <h3 class="task-list__title">${taskName}</h3>
            <p class="taks-list__description">${taskDescription}</p>
            <footer class="task-list__footer">
             <img src="images/empty-check-icon.png" class="task-list__check-btn">
             <span class="task-list__delete-icon">Delete</span>
            </footer>`
          containerSection.appendChild(newTask);
     //Final Settings:
     taskWindow.style.display = "none";
     isAddTaskWindowOpen = false;

  });  
}

//Controls taskWindow Elements actions on certain Events(for example: title element becomes empty when focused):
function handleRequests(taskWindow){
 let taskName = "Task";
 let taskDescription = "Add The Task Description here";
 //When the Task Title Element is Focused Upon:
 taskWindow.children[2].addEventListener("focus", 
 function(){
 taskWindow.children[2].innerHTML = "";
 })
 //When the Task Title Element is Out of Focus:
 taskWindow.children[2].addEventListener("blur", 
 function(){
  let clearText = taskWindow.children[2].innerHTML.replace(/\&nbsp\;/g,"");
  clearText = clearText.replace(/\s*/g,"");
  if (clearText){taskName = taskWindow.children[2].innerHTML;}
  taskWindow.children[2].innerHTML = taskName;
 })
 //When the Task Description Element is Focused Upon:
 taskWindow.children[3].addEventListener("focus",
 function(){
 taskWindow.children[3].innerHTML = "";
 })
  //When the Task Description Element is Out of Focus:
  taskWindow.children[3].addEventListener("blur", 
  function(){
    let clearText = taskWindow.children[3].innerHTML.replace(/\&nbsp\;/g,"");
    clearText = clearText.replace(/\s*/g,"");
   if (clearText){taskDescription = taskWindow.children[3].innerHTML;}
     console.log(clearText)
   taskWindow.children[3].innerHTML = taskDescription;
  })

}
  
// Add A New Task:
function openAddTaskWindow(event){
if (!isAddTaskWindowOpen){
const containerSection = event.path[2].children[1];
taskWindow = document.createElement("div");
      taskWindow.classList.add("add-item");
      taskWindow.innerHTML = `        <input type="time" class="add-item__time-input"></input>
      <input type="date" class="add-item__date-input"></input>
      <span class="add-item__title" contenteditable="true">Task</span>
      <span class="add-item__description" contenteditable="true">Add The Task Description here</span>        
      <footer class="add-item__footer">
        <span class="footer__add-btn">ADD</span>
        <span class="footeR__ignore-btn">IGNORE</span>
      </footer>`;
containerSection.insertBefore(taskWindow, containerSection.firstChild);
isAddTaskWindowOpen = true;
closeTaskWindow(taskWindow);
addNewTask(taskWindow, containerSection);
handleRequests(taskWindow);
}
}
function handleClicks(event){
  //When delete button is clicked
  if (event.target.className == "task-list__delete-icon"){
     const deleteButton = event.target;
     //Delete Task Item:
       deleteButton.parentElement.parentElement.parentElement.removeChild(deleteButton.parentElement.parentElement)
  }
  //When checked button is clicked:
  if (event.target.className == "task-list__check-btn"){
      const checkButton = event.target;

      if (checkButton.src.match("images/empty-check-icon.png")){
     //Replace Checked Image and mark as Checked:
      checkButton.src = "images/filled-check-icon.png";
      }else {
     //Replace Checked Image and mark as Unchecked:
     checkButton.src = "images/empty-check-icon.png";
     }
}
}
//Looping through addIcons and assign addNewTask() to click Event:
for (let index =0; index < addIcons.length; index++){
   addIcons[index].addEventListener("click", openAddTaskWindow);
}
//Looping through Task Items and trigger it once clicked:
for (let index =0; index< document.querySelectorAll("section").length; index++){
      document.querySelectorAll("section")[index].addEventListener("click",handleClicks)
}
