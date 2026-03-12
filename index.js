const defaultTasks = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const todoList = document.querySelector(".to-do__list");
const todoForm = document.querySelector(".to-do__form");
const todoInput = document.querySelector(".to-do__input");

function getStoredTasks() {
	const stored = localStorage.getItem('tasks');
	if (stored){
		return JSON.parse(stored);
	}
	else {
		return defaultTasks;
	}
}

function generateTaskItem(content) {
	const source = document.getElementById("to-do__item-template");
	const copy = source.content.querySelector(".to-do__item").cloneNode(true);
    const taskText = copy.querySelector(".to-do__item-text");
    const removeBtn = copy.querySelector(".to-do__item-button_type_delete");
    const copyBtn = copy.querySelector(".to-do__item-button_type_duplicate");
    const modifyBtn = copy.querySelector(".to-do__item-button_type_edit");
    
	taskText.textContent = content;

	removeBtn.addEventListener('click', function(){
		copy.remove();
		const currentList = collectTasks();
		storeTasks(currentList);
	});
	
	copyBtn.addEventListener('click', function(){
		const taskName = taskText.textContent;
		const newTask = generateTaskItem(taskName);
		todoList.prepend(newTask);
		const currentList = collectTasks();
		storeTasks(currentList);
	});

	modifyBtn.addEventListener('click', function() {
		taskText.setAttribute('contenteditable','true');
		taskText.focus();
	});

	taskText.addEventListener('blur', function() {
		taskText.setAttribute('contenteditable','false');
		const currentList = collectTasks();
		storeTasks(currentList);
	});
	
	return copy;
}

function collectTasks() {
	const textElements = todoList.querySelectorAll('.to-do__item-text');
	const tasksArray = [];

	textElements.forEach(function(element){
		tasksArray.push(element.textContent);
	});

	return tasksArray;
}

function storeTasks(tasksList) {
	 localStorage.setItem('tasks' ,JSON.stringify(tasksList));
}

todoForm.addEventListener('submit', function(event){
	event.preventDefault();
	const newTaskText = todoInput.value;
	
	if(newTaskText) {
		const newTaskElement = generateTaskItem(newTaskText);
		todoList.prepend(newTaskElement);
		const currentList = collectTasks();
		storeTasks(currentList);
		todoInput.value = '';
	}
});

let currentTasks = getStoredTasks();
currentTasks.forEach(function(item){
	const taskElement = generateTaskItem(item);
	todoList.append(taskElement);
});
