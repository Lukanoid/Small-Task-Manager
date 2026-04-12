const { loadTasks, saveTasks } = require("./storage");

let getTasks = function () {
    return loadTasks();
};

let getNextId = function (tasks) {
    return tasks.length > 0
        ? Math.max(...tasks.map(task => task.id)) + 1
        : 1;
};

let getTaskIndexById = function (tasks, id) {
    return tasks.findIndex(task => task.id === Number(id));
};

let getDate = function (task) {
    if (!task.createdAt) {
        return "Unknown";
    }
    return new Date(task.createdAt).toLocaleDateString();
};

/**
 * Clearing all tasks
 *
 * @returns {boolean}
 */
let clearAllTasks = function () {
    saveTasks([]);
    return true;
};

/**
 * Showing all tasks
 *
 * @returns {Array}
 */
let showTasks = function () {
    return getTasks();
};

/**
 * Alternative Electron-friendly name for showing all tasks
 *
 * @returns {Array}
 */
let getAllTasks = function () {
    return getTasks();
};

/**
 * Deleting existing task
 *
 * @param {number} id the id of task to delete
 * @returns {object}
 */
let deleteTask = function (id) {
    let tasks = getTasks();
    const index = getTaskIndexById(tasks, id);

    if (index === -1) {
        throw new Error("Task not found");
    }

    let deletedTask = tasks.splice(index, 1)[0];
    saveTasks(tasks);

    return {
        success: true,
        task: deletedTask,
        message: `Task: ${deletedTask.title} successfully removed.`
    };
};

/**
 * Creating new task
 *
 * @param {string} title the name of task to be created
 * @param {string} priority optional priority
 * @returns {object}
 */
let addTask = function (title, priority = "medium") {
    let tasks = getTasks();

    if (!title || title.trim() === "") {
        throw new Error("No Title Added");
    }

    if (tasks.some(task => task.title.toLowerCase() === title.trim().toLowerCase())) {
        throw new Error("Task already exists.");
    }

    let normalizedPriority = priority.toLowerCase().trim();
    if (normalizedPriority !== "high" && normalizedPriority !== "low" && normalizedPriority !== "medium") {
        throw new Error(`Priority can't be changed to ${normalizedPriority}`);
    }

    const currentTask = {
        id: getNextId(tasks),
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: normalizedPriority
    };

    tasks.push(currentTask);
    saveTasks(tasks);

    return {
        success: true,
        task: currentTask,
        message: `Task: ${currentTask.title} successfully added.`
    };
};

/**
 * Marking a task as completed.
 *
 * @param {number} id the id of the task to be marked as completed
 * @returns {object}
 */
let completeTask = function (id) {
    let tasks = getTasks();
    const index = getTaskIndexById(tasks, id);

    if (index === -1) {
        throw new Error("Task not found");
    }

    tasks[index].completed = true;
    saveTasks(tasks);

    return {
        success: true,
        task: tasks[index],
        message: `Task: ${tasks[index].title} successfully completed.`
    };
};

/**
 * Marking a task as pending.
 *
 * @param {number} id the id of the task to be marked as pending
 * @returns {object}
 */
let uncompleteTask = function (id) {
    let tasks = getTasks();
    const index = getTaskIndexById(tasks, id);

    if (index === -1) {
        throw new Error("Task not found");
    }

    tasks[index].completed = false;
    saveTasks(tasks);

    return {
        success: true,
        task: tasks[index],
        message: `Task: ${tasks[index].title} marked as pending.`
    };
};

/**
 * Changing the name of an existing task
 *
 * @param {number} id the id of the task to be changed
 * @param {string} newTitle new name of the task
 * @param {string} newPriority optional new priority
 * @returns {object}
 */
let editTask = function (id, newTitle, newPriority) {
    let tasks = getTasks();
    const index = getTaskIndexById(tasks, id);

    if (index === -1) {
        throw new Error("Task not found");
    }

    if (!newTitle || newTitle.trim() === "") {
        throw new Error("Task title is invalid");
    }

    if (tasks.some(task =>
        task.id !== Number(id) &&
        task.title.toLowerCase() === newTitle.trim().toLowerCase()
    )) {
        throw new Error("Task title already exist");
    }

    let oldTitle = tasks[index].title;
    tasks[index].title = newTitle.trim();

    if (newPriority !== undefined) {
        if (!newPriority || newPriority.trim() === "") {
            throw new Error("Please provide a valid priority.");
        }

        let priority = newPriority.toLowerCase().trim();
        if (priority !== "high" && priority !== "low" && priority !== "medium") {
            throw new Error(`Priority can't be changed to ${priority}`);
        }

        tasks[index].priority = priority;
    }

    saveTasks(tasks);

    return {
        success: true,
        task: tasks[index],
        message: `Task: ${oldTitle} successfully changed to ${tasks[index].title}.`
    };
};

/**
 * Clearing all completed tasks
 *
 * @returns {object}
 */
let clearCompleted = function () {
    let tasks = getTasks();
    const before = tasks.length;
    let filteredTasks = tasks.filter(task => task.completed === false);

    saveTasks(filteredTasks);

    if (filteredTasks.length === before) {
        return {
            success: true,
            removedCount: 0,
            message: "No completed tasks to clear."
        };
    } else {
        return {
            success: true,
            removedCount: before - filteredTasks.length,
            message: "Completed tasks cleared"
        };
    }
};

/**
 * Showing all completed tasks
 *
 * @returns {Array}
 */
let showCompletedTasks = function () {
    let tasks = getTasks();

    if (tasks.length === 0) {
        throw new Error("No tasks to show.");
    }

    let completedTasks = tasks.filter(task => task.completed === true);
    return completedTasks;
};

/**
 * Showing all pending tasks
 *
 * @returns {Array}
 */
let showPendingTasks = function () {
    let tasks = getTasks();

    if (tasks.length === 0) {
        throw new Error("No tasks to show.");
    }

    let pendingTasks = tasks.filter(task => task.completed === false);
    return pendingTasks;
};

/**
 * Searching for task in all tasks by keyword
 *
 * @param {string} keyword the keyword to search for
 * @returns {object}
 */
let search = function (keyword) {
    let tasks = getTasks();

    if (!keyword || keyword.trim() === "") {
        throw new Error("Please provide a search keyword.");
    }

    const trimmed = keyword.trim();

    let filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(trimmed.toLowerCase())
    );

    return {
        matches: filtered,
        count: filtered.length,
        message: filtered.length === 0
            ? "No matching tasks found!"
            : `Found ${filtered.length} match for ${trimmed}`
    };
};

/**
 * Changing the priority of a certain task
 *
 * @param {number} id the id of the task to change its priority
 * @param {string} word the priority to change to
 * @returns {object}
 */
let changePriority = function (id, word) {
    let tasks = getTasks();
    const index = getTaskIndexById(tasks, id);

    if (index === -1) {
        throw new Error("Task not found");
    }

    if (!word || word.trim() === "") {
        throw new Error("Please provide a valid priority.");
    }

    let priority = word.toLowerCase().trim();
    if (priority !== "high" && priority !== "low" && priority !== "medium") {
        throw new Error(`Priority can't be changed to ${priority}`);
    }

    let oldPriority = tasks[index].priority;
    tasks[index].priority = priority;
    saveTasks(tasks);

    return {
        success: true,
        task: tasks[index],
        message: `Task: ${tasks[index].title}'s priority successfully changed from ${oldPriority} to ${priority}.`
    };
};

/**
 * Toggling a task's completed state
 *
 * @param {number} id the id of the task to toggle
 * @returns {object}
 */
function toggleTask(id) {
    let tasks = getTasks();
    const task = tasks.find(task => task.id === Number(id));

    if (!task) {
        throw new Error("Task not found.");
    }

    task.completed = !task.completed;
    saveTasks(tasks);

    return {
        success: true,
        task,
        message: task.completed
            ? `Task: ${task.title} successfully completed.`
            : `Task: ${task.title} marked as pending.`
    };
}

module.exports = {
    addTask,
    deleteTask,
    editTask,
    completeTask,
    showTasks,
    getAllTasks,
    showCompletedTasks,
    showPendingTasks,
    clearAllTasks,
    uncompleteTask,
    clearCompleted,
    search,
    changePriority,
    toggleTask,
    getDate
};