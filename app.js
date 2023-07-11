// form => submit => creat new ToDo => {id , createdAt , title , iscompleted}

let filterValue = 'all';

const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.querySelector(".todoList")
const selectFilters = document.getElementById('filter-todos')

todoForm.addEventListener('submit',addNewTodo)
selectFilters.addEventListener('change',(e)=>{
  filterValue = e.target.value;
  filterTodos();
})

function read(value) {
  const reader = new FileReader();

  reader.onload = (e) => {
    document.getElementById("Avatar").src = e.target.result;
  }

  reader.readAsDataURL(value.files[0]);
}

document.addEventListener("DOMContentLoaded",()=>{
  const todos = getAllTodos();
  creatTodos(todos)
})

function addNewTodo(e){ 
  e.preventDefault();  

  if(!todoInput.value) return null;

  const newTodo = {
    title: todoInput.value,
    id : Date.now(),
    createdAt: new Date().toISOString(),
    isCompleted : false,
  }
  saveTodos(newTodo)
  filterTodos()
}

function creatTodos(todos){
  //create todos on DOM
let result = "";
  todos.forEach((todo)=>{
    result += `<li class="todo">
    <div class= "todo-cart">
      <div class="todo-cart-left">
        <p class="todo__title ${todo.isCompleted && 'completed'}">${todo.title}</p>
        <p class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</p>
      </div>
      <div class="todo-cart-right">
        <button class="todo__check" data-todo-id=${todo.id}><i class="fas fa-check-square"></i></button>
        <button class="todo__remove" data-todo-id=${todo.id}><i class="fas fa-trash-alt"></i></button>
        <button class="todo__edit" data-todo-id=${todo.id}><i class="fas fa-edit"></i></button>
      </div>
    </div>
    </li>`
  })
  todoList.innerHTML = result;
  todoInput.value = ''

  const removeBtns = [...document.querySelectorAll('.todo__remove')]
  removeBtns.forEach(btn =>{btn.addEventListener('click',removeTodo)})

  const checkBtns = [...document.querySelectorAll('.todo__check')]
  checkBtns.forEach(btn =>{btn.addEventListener('click',checkTodo)})
}

function filterTodos(){
  const todos = getAllTodos()
  switch (filterValue){
    case "all": {
      creatTodos(todos)
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted)
      creatTodos(filteredTodos)
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted)
      creatTodos(filteredTodos)
      break;
    }
    default : creatTodos(todos)
  }
}

function removeTodo(e){
  let todos = getAllTodos()
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId)
  saveAllTodos(todos)
  filterTodos( )
}

function checkTodo(e){
  let todos = getAllTodos()
  const todoId = Number(e.target.dataset.todoId)
  const todo = todos.find((t)=> t.id === todoId)
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos)
  filterTodos()
}

// localStorage => web API
function getAllTodos(){
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [] ;
  return savedTodos;
}

function saveTodos(todo){
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos; 
}

function saveAllTodos(todos){
  localStorage.setItem("todos",JSON.stringify(todos))
}

setInterval(myTimer, 1000);

function myTimer() {
  const date = new Date();
  document.getElementById("clock").innerHTML = date.toLocaleTimeString();
}