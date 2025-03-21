let todoItemsContainer=document.getElementById("todoItemsContainer");
let addTodoButton=document.getElementById("addTodoButton");
let saveButton=document.getElementById("saveButton");
function getTodoList(){
    let todoListArray=localStorage.getItem("todoList");
    let parsedTodoList=JSON.parse(todoListArray);
    if(parsedTodoList===null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}
let textArray=getTodoList();

addTodoButton.onclick=function(){
    onAddTodo();
}

saveButton.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(textArray));
}

function onAddTodo(){
    let userInputEl=document.getElementById("todoUserInput");
    let userInputValue=userInputEl.value;
    if(userInputValue===""){
        alert("Enter Valid Text");
        return;
    }
    todosCount=textArray.length;
    let newTodo={
        text:userInputValue,
        uniqueNo:todosCount+10,
        isChecked:false
    }
    textArray.push(newTodo);
    createAndAppend(newTodo);
    userInputEl.value="";
}
function onTodoStatusChange(checkboxId,labelId,todoId){
    let checkboxEl=document.getElementById(checkboxId);
    let labeledEl=document.getElementById(labelId);
    labeledEl.classList.toggle("checked");
    let todoObjectIndex=textArray.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.uniqueNo;
        if(eachTodoId===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    let todoObject=textArray[todoObjectIndex];
    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }
    else{
        todoObject.isChecked=true;
    }
    //here it checks whether the box is checked or not and behave accordingly...
    //we can use below code also it gives same output....
    /*if(checkboxEl.checked===true){
        labeledEl.classList.add("checked");
    }
    else{
        labeledEl.classList.remove("checked");
    }*/
}
function deleteTodo(todoId){
    let todoElement=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteTodoIndex=textArray.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.uniqueNo;
        if(eachTodoId===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    textArray.splice(deleteTodoIndex,1);
}
function createAndAppend(sample){
    let labelId="label"+sample.uniqueNo;
    let checkboxId="myCheckbox"+sample.uniqueNo;
    let todoId="todo"+sample.uniqueNo;
    let listItemEl=document.createElement("li");
    listItemEl.classList.add("todo-item-container","d-flex","flex-row");
    listItemEl.id=todoId;
    todoItemsContainer.appendChild(listItemEl);
    let inputEl=document.createElement("input");
    inputEl.type="checkbox";
    inputEl.checked=sample.isChecked;
    inputEl.id=checkboxId;
    inputEl.classList.add("checkbox-input");
    inputEl.onclick=function(){
        onTodoStatusChange(checkboxId,labelId,todoId);
    }
    listItemEl.appendChild(inputEl);
    let labelContainer=document.createElement("div");
    labelContainer.classList.add("d-flex","flex-row","justiify-content-between","label-container");
    listItemEl.appendChild(labelContainer);
    let labelEl=document.createElement("label");
    if(sample.isChecked===true){
        labelEl.classList.add("checked");
    }
    labelEl.setAttribute("for",checkboxId);
    labelEl.textContent=sample.text;
    labelEl.id=labelId;
    labelEl.classList.add("checkbox-label");
    labelContainer.appendChild(labelEl);
    let deleteContainer=document.createElement("div");
    labelContainer.appendChild(deleteContainer);
    deleteContainer.classList.add("delete-icon-container");
    let deleteEl=document.createElement("i");
    deleteContainer.appendChild(deleteEl);
    deleteEl.classList.add("fa","fa-trash","delete-icon");
    deleteEl.onclick=function(){
        deleteTodo(todoId);
    }
}
for(let sample of textArray){
    createAndAppend(sample);
}

