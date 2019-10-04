//? selecting the element

const toDos = document.querySelector(".todos");
const addTodo = document.querySelector(".add");
// console.log(toDos, addTodo);
const addBtn = document.querySelector(".addbtn");
// console.log(addBtn);
const inputItem = document.querySelector("input[name='add']");
// console.log(inputItem);

const delBtn = document.querySelector(".delete");
// console.log(delBtn);
var collection = JSON.parse(localStorage.getItem("todoes")) || [];

//? declaring the Functions

function addList(e) {
  const toDo = inputItem.value;
  e.preventDefault();
  console.log("ok");
  const newItem = document.createElement("li");
  newItem.className =
    "list-group-item d-flex justify-content-between align-items-center";
  newItem.appendChild(document.createTextNode(toDo));

  //?creating delete icon

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash delete text-danger";
  deleteIcon.appendChild(document.createTextNode(""));
  newItem.appendChild(deleteIcon);

  toDos.append(newItem);
  //   console.log(toDos.children);
  const toDoSet = {
    toDo,
    done: false
  };
  collection.push(toDoSet);

  // console.log(toDoSet);
  console.log(collection);
  populateToDo(collection, toDos);
  this.reset(); // ?form method
  localStorage.setItem("todoes", JSON.stringify(collection));
}

//? populating the local storage data in toDo

function populateToDo(collection = [], allToDo) {
  allToDo.innerHTML = collection
    .map((item, i) => {
      return `
  <li class="list-group-item d-flex justify-content-between align-items-center">
         <span>${item.toDo}</span>
  <i class="fas fa-trash delete text-danger"></i>
   </li>
  `;
    })
    .join("");
}

function deleteItem(e) {
  //selecting the parentElement of button which is list item
  // console.log(this.parentNode);
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var list = e.target.parentElement;
      //now we want to remove items of list varible by refering to ul children

      // console.log(e.target.previousElementSibling.innerHTML);
      var task = e.target.previousElementSibling.textContent;
      console.log(typeof task);
      console.log(collection);
      var index = collection.findIndex(i => {
        return i.toDo === task;
      });
      console.log(collection);
      console.log(index);
      if (index >= 0) {
        collection.splice(index, 1);
      }
      console.log(collection);
      localStorage.setItem("todoes", JSON.stringify(collection));

      toDos.removeChild(list);
    }
  }
  populateToDo(collection, toDos);
}

// ? Event listeners

addBtn.addEventListener("submit", addList);

toDos.addEventListener("click", deleteItem);
populateToDo(collection, toDos);
console.log(collection);
