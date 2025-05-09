const Form = document.getElementById("todo-form");
const Input = document.getElementById("todo-input");
const ToDoList = document.getElementById("todo-list");

let allListItems = getListLocal();
updateList();

Form.addEventListener('submit', function(e){
    e.preventDefault();
    addItem();
})

function addItem(){
    const itemText = Input.value.trim();

    if(itemText.length > 0){
        allListItems.push({ text: itemText, done: false });;
        updateList();
        saveListLocal();
        Input.value = '';
    }
}

function updateList(){
    ToDoList.innerHTML = "";

    allListItems.forEach((item, itemIndex)=>{
        listItem = createItem(item, itemIndex, item.done);
        ToDoList.append(listItem);
    })
}

function saveListLocal() {
    const allListItemsJSON = JSON.stringify(allListItems);
    localStorage.setItem("TaskList", allListItemsJSON);
}

function getListLocal() {
    LocalItems = localStorage.getItem("TaskList") || "[]";
    return JSON.parse(LocalItems);
}

function createItem(item, itemIndex, isDone){
    const listItem = document.createElement("li");
    const listItemID = "todo-"+itemIndex;

    if (isDone) {
        listItem.classList.add("done");
    } else {
        listItem.classList.add("todo");
    }
    
    listItem.innerHTML = `
    <button class="button-done">Done</button>
    <label for="${listItemID}">${item.text}</label>  <!-- for is to make the id "${listItemID}" react -->
    <button class="button-delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
    // viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>`;
    
        const deleteButton = listItem.querySelector(".button-delete");
        deleteButton.addEventListener('click', () => {
            allListItems.splice(itemIndex, 1);
            updateList();
            saveListLocal();
        })

        const doneButton = listItem.querySelector(".button-done");
        doneButton.addEventListener('click', () => {
            item.done = true;
            updateList();
        })
    
    return listItem;
}