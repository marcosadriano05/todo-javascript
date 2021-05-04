const todosListContainer = document.querySelector('[data-todos-container]')
const message = document.querySelector('[data-message]')
const todosList = document.querySelector('[data-todos]')
const form = document.querySelector('[data-form]')

let todos = localStorage.getItem('todos') || []

if (todos.length > 0) {
  todos = todos.split(',')
}
console.log(todos)

fulfillTodos()

checkTodoListHasValues()

todosList.addEventListener('click', event => {
  event.preventDefault()
  event.stopPropagation()
  clickedElement = event.target

  if (clickedElement.tagName === 'BUTTON') {
    let listElement = clickedElement.parentElement.parentElement
    let todoMessage = listElement.textContent.match(/\w/g).join('')
    let newTodos = todos.filter(todo => todo !== todoMessage)
    todos = newTodos
    localStorage.setItem('todos', newTodos)
    listElement.remove()
  }

  if (clickedElement.tagName === 'I') {
    let listElement = clickedElement.parentElement.parentElement.parentElement
    let todoMessage = listElement.innerHTML
      .match(/<p>(.*?)<\/p>/gm)
      .join('')
      .match(/[^<p>|^\/]|p[^<>]/gm)
      .join('')
    let newTodos = todos.filter(todo => todo !== todoMessage)
    todos = newTodos
    localStorage.setItem('todos', newTodos)
    listElement.remove()
    listElement.remove()
  }
  
  checkTodoListHasValues()
})

form.addEventListener('submit', event => {
  event.preventDefault()
  const submitedForm = event.target
  addTodoInTodosList(submitedForm.newTodo.value)
  addTodoInLocalStorage(submitedForm.newTodo.value)
  submitedForm.newTodo.value = ''
  checkTodoListHasValues()
})

function fulfillTodos() {
  if (!todos) {
    return;
  }

  todos.forEach(todo => addTodoInTodosList(todo))
}

function addTodoInTodosList(todoText) {
  const todo = createTodo(todoText)

  todosList.appendChild(todo)
}

function addTodoInLocalStorage(todoText) {
  const todosFromLocalStorage = todos

  todosFromLocalStorage.push(todoText)

  localStorage.setItem('todos', todosFromLocalStorage)
}

function checkTodoListHasValues() {
  if (todos.length > 0) {
    todosList.style.display = 'block'
    message.style.display = 'none'
  } else {
    todosList.style.display = 'none'
    message.style.display = 'block'
  }
}

function createTodo(todoText) {
  const todo = document.createElement('li')

  todo.innerHTML = `<span>
    <p>${todoText}</p>
    <button>
      <i class="fas fa-trash"></i>
    </button>
  </span>
  `

  return todo
}