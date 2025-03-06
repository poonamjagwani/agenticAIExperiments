const API_URL = 'http://localhost:3000';
let currentFilter = 'all';

// DOM Elements
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
const filterButtons = document.querySelectorAll('.filter-btn');

// Event Listeners
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTodo();
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        loadTodos();
    });
});

// API Functions
async function fetchTodos() {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
}

async function createTodo(text) {
    const response = await fetch(`${API_URL}/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
}

async function updateTodo(id, updates) {
    const response = await fetch(`${API_URL}/task/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
}

async function deleteTodo(id) {
    const response = await fetch(`${API_URL}/task/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return response.json();
}

// UI Functions
async function loadTodos() {
    try {
        const todos = await fetchTodos();
        const filteredTodos = filterTodos(todos);
        renderTodos(filteredTodos);
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}

function filterTodos(todos) {
    switch (currentFilter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        const checkbox = li.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => toggleTodo(todo.id, checkbox.checked));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => removeTodo(todo.id));

        todoList.appendChild(li);
    });
}

async function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    try {
        await createTodo(text);
        todoInput.value = '';
        loadTodos();
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

async function toggleTodo(id, completed) {
    try {
        await updateTodo(id, { completed });
        loadTodos();
    } catch (error) {
        console.error('Error toggling todo:', error);
    }
}

async function removeTodo(id) {
    try {
        await deleteTodo(id);
        loadTodos();
    } catch (error) {
        console.error('Error removing todo:', error);
    }
}

// Initial load
loadTodos();