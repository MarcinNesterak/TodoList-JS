let todoInput //miejsce gdzie uzytkownik wpisuje treść zadania
let errorInfo //info o braku zadań - o konieczności wpisania tekstu
let addBtn // przycisk add dodaje nowe elementy do listy
let ulList //lista zadań, tagi ul
let newTodo //nowo dodane li (czyli nowe zadanie)

let popup //popup
let popupInfo // tekst w popupie jak się doda pusty tekst
let todoToEdit //edytowany todo
let popupInput  //input w popupie
let popupAddBtn //przycisk input w popupie
let popupCloseBtn //przycisk anuluj w popupie


const main = () => {
    prepareDomElements()
    prepareDomEvents()
}

const prepareDomElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDomEvents = () => {
    addBtn.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodotext)
    todoInput.addEventListener('keyup', enterKeyCheck)
}


const addNewTodo = () => {
    if (todoInput.value !== '') {
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        createToolsArea()
        ulList.append(newTodo)


        todoInput.value = ''
        errorInfo.textContent = ''

        console.log(newTodo)

    } else {
        errorInfo.textContent = "Wpisz treść zadania"
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = ('EDIT')

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if (e.target.matches('.edit')) {
        editToDo(e)
    } else if (e.target.matches('.delete')) {
        deleteToDo(e)
    }
}

const editToDo = e => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent

    console.log(todoToEdit.firstChild)
    popup.style.display = 'flex'
}

const closePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ""

}

const changeTodotext = () => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
        popupInfo.textContent = ""

    } else {
        popupInfo.textContent = "Musiz podać jakąś treść"
    }
}

const deleteToDo = e => {
    e.target.closest('li').remove()

    const allTodo = ulList.querySelectorAll('li')

    if (allTodo.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście'
    }
}

const enterKeyCheck = e => {
    if (e.key === 'Enter') {
        addNewTodo()
    }
}



document.addEventListener('DOMContentLoaded', main)