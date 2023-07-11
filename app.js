// form => submit => creat new ToDo => {id , createdAt , title , iscompleted}

const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.querySelector(".todoList")
const selectFilters = document.getElementById('filter-todos')
const avatarFile = document.querySelector("#choose-avatar")
let avatar = document.querySelector("#Avatar")

todoForm.addEventListener('submit',addNewTodo)
selectFilters.addEventListener('change',filterTodos)
avatarFile.addEventListener('submit',selectAvatar)

avatar.forEach(()=>{
  if(Image.src = " ") {avatar.getElementsByClassName("avatarDefault")}
  else {avatar.getElementsByClassName("avatar")}
})

function selectAvatar(){

}

document.addEventListener("DOMContentLoaded",()=>{
  const todos = getAllTodos()
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
      <div class="todo-cart-top">
        <p class="todo__title ${todo.isCompleted && 'completed'}">${todo.title}</p>
        <p class="todo__createdAt" style="margin:0">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</p>
      </div>
      <div class="todo-cart-bottom">
        <button class="todo__check" data-todo-id=${todo.id}><i class="fas fa-check-square"></i></button>
        <button class="todo__remove" data-todo-id=${todo.id}><i class="fas fa-trash-alt"></i></button>
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

function filterTodos(e){
  const filter = e.target.value;
  console.log(filter);
  switch (filter){
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
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId)
  filterTodos()
}

function checkTodo(e){
  const todoId = Number(e.target.dataset.todoId)
  let todo = todos.find((t)=> t.id === todoId)
  todo.isCompleted = !todo.isCompleted;
  filterTodos()
}

function getAllTodos(){
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || []
  return savedTodos
}

function saveTodos(todo){
  const savedTodos = getAllTodos()
  savedTodos.push(todo)
  localStorage.setItem("todos",JSON.stringify(savedTodos))
  return savedTodos
}