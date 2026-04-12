const form = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("task-list");
const message = document.getElementById("message");
const filterButtons = document.querySelectorAll("[data-filter]");
const clearAllBtn = document.getElementById("clear-all-btn");

const editForm = document.getElementById("edit-form");
const editTitleInput = document.getElementById("edit-title");
const editPriorityInput = document.getElementById("edit-priority");
const cancelEditBtn = document.getElementById("cancel-edit");

let tasks = [];
let currentFilter = "all";
let editingTaskId = null;

function showMessage(text, isError = false) {
    message.textContent = text;
    message.style.color = isError ? "crimson" : "green";

    setTimeout(() => {
        message.textContent = "";
    }, 2500);
}

function formatDate(task) {
    if (!task.createdAt) {
        return "Unknown";
    }

    return new Date(task.createdAt).toLocaleDateString();
}

function getFilteredTasks() {
    if (currentFilter === "pending") {
        return tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}

function renderTasks() {
    const filteredTasks = getFilteredTasks();
    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {
        taskList.innerHTML = "<li>No tasks found.</li>";
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? "checked" : ""} data-id="${task.id}">
                <span class="${task.completed ? "completed" : ""}">${task.title}</span>
                <span class="badge">${task.priority}</span>
                <span class="date">Created: ${formatDate(task)}</span>
            </div>
            <div class="actions">
                <button data-id="${task.id}" data-action="edit">Edit</button>
                <button data-id="${task.id}" data-action="delete">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

async function loadTasks() {
    tasks = await window.taskAPI.getAll();
    renderTasks();
}

function openEditForm(task) {
    editingTaskId = task.id;
    editTitleInput.value = task.title;
    editPriorityInput.value = task.priority;
    editForm.classList.remove("hidden");
}

function closeEditForm() {
    editingTaskId = null;
    editTitleInput.value = "";
    editPriorityInput.value = "medium";
    editForm.classList.add("hidden");
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const result = await window.taskAPI.add(titleInput.value, priorityInput.value);
        titleInput.value = "";
        priorityInput.value = "medium";
        await loadTasks();
        showMessage(result.message || "Task added.");
    } catch (error) {
        showMessage(error.message, true);
    }
});

editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (editingTaskId === null) return;

    try {
        const result = await window.taskAPI.edit(
            editingTaskId,
            editTitleInput.value,
            editPriorityInput.value
        );

        await loadTasks();
        closeEditForm();
        showMessage(result.message || "Task updated.");
    } catch (error) {
        showMessage(error.message, true);
    }
});

cancelEditBtn.addEventListener("click", () => {
    closeEditForm();
});

taskList.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    try {
        if (action === "delete") {
            const result = await window.taskAPI.delete(id);
            await loadTasks();
            showMessage(result.message || "Task deleted.");
        }

        if (action === "edit") {
            const task = tasks.find(t => t.id === id);
            if (!task) return;

            openEditForm(task);
        }
    } catch (error) {
        showMessage(error.message, true);
    }
});

taskList.addEventListener("change", async (event) => {
    const checkbox = event.target.closest('input[type="checkbox"]');
    if (!checkbox) return;

    const id = Number(checkbox.dataset.id);

    try {
        const result = await window.taskAPI.toggle(id);
        await loadTasks();
        showMessage(result.message || "Task updated.");
    } catch (error) {
        showMessage(error.message, true);
    }
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

clearAllBtn.addEventListener("click", async () => {
    try {
        await window.taskAPI.clearAll();
        await loadTasks();
        closeEditForm();
        showMessage("All tasks cleared.");
    } catch (error) {
        showMessage(error.message, true);
    }
});

loadTasks();