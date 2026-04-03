const { loadTasks, saveTasks } = require("./storage");

let tasks = loadTasks();
let id = tasks.length > 0
    ? Math.max(...tasks.map(task => task.id)) + 1
    : 1;


let getTaskIndexById = function (id) {
    return tasks.findIndex(task => task.id === id);
};

let getDate = function(task){
    if (!task.createdAt) {
        return "Unknown";
    }
    return new Date(task.createdAt).toLocaleDateString();
}

/**
 * Clearing all tasks
 *
 * 
 * @returns {void}
 */
let clearAllTasks = function () {
    tasks = [];
    id = 1;
    saveTasks(tasks);
    console.log("All tasks cleared.")
}


/**
 * Showing all tasks
 *
 * 
 * @returns {void}
 */
let showTasks = function () {

    if (tasks.length === 0) {
        console.log("No tasks to show.")
        return;
    }
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === false) {
            const currentDate = getDate(tasks[i]);
            console.log(`[] ${tasks[i].id} - ${tasks[i].title} | Created: ${currentDate}`)
        }
        else {
            const currentDate = getDate(tasks[i]);
            console.log(`[x] ${tasks[i].id} - ${tasks[i].title} | Created: ${currentDate}`)
        }
    }

}


/**
 * Deleting existing task
 *
 * @param {number} id the id of task to delete
 * @returns {void}
 */
let deleteTask = function (id) {
    const index = getTaskIndexById(id)

    try {
        if (index === -1) {
            throw new Error("Task not found")
        }
        let completedTask = tasks.splice(index, 1)
        saveTasks(tasks);
        console.log(`Task: ${completedTask[0].title} successfully removed.`)

    } catch (error) {
        console.log(error.message)
    }
}


/**
 * Creating new task
 *
 * @param {string} title the name of task to be created
 * @returns {void} 
 */
let addTask = function (title) {

    try {
        if (!title || title.trim() === "") {
            throw new Error("No Title Added")
        }

        const currentTask = {
            id: id++,
            title: title,
            completed: false,
            createdAt: new Date().toISOString()
        }

        tasks.push(currentTask)
        saveTasks(tasks)
        console.log(`Task: ${title} successfully added.`)
    } catch (error) {
        console.log(error.message)

    }
}

/**
 * Marking a task as completed.
 *
 * @param {number} id the id of the task to be marked as completed
 * @returns {void}
 */
let completeTask = function (id) {
    const index = getTaskIndexById(id)
    try {
        if (index === -1) {
            throw new Error("Task not found")
        }
        tasks[index].completed = true;
        saveTasks(tasks);
        console.log(`Task: ${tasks[index].title} successfully completed.`)
    } catch (error) {
        console.log(error.message)

    }
}

/**
 * Marking a task as pending.
 *
 * @param {number} id the id of the task to be marked as pending
 * @returns {void}
 */
let uncompleteTask = function (id) {
    const index = getTaskIndexById(id)

    try {
        if (index === -1) {
            throw new Error("Task not found")
        }
        tasks[index].completed = false;
        saveTasks(tasks);
        console.log(`Task: ${tasks[index].title} marked as pending.`)
    } catch (error) {
        console.log(error.message)

    }

}

/**
 * Changing the name of an existing task
 *
 * @param {number} id the id of the task to be changed
 * @param {string} newTitle new name of the task
 * @returns {void} 
 */
let editTask = function (id, newTitle) {
    const index = getTaskIndexById(id)

    try {
        if (index === -1) {
            throw new Error("Task not found")
        }
        if (!newTitle || newTitle.trim() === "") {
            throw new Error("Task title is invalid")
        }
        let oldTitle = tasks[index].title;
        tasks[index].title = newTitle.trim();
        saveTasks(tasks);

        console.log(`Task: ${oldTitle} successfully changed to ${tasks[index].title}.`)

    } catch (error) {
        console.log(error.message)
    }
}

/**
 * Clearing all completed tasks
 *
 * @returns {void}
 */
let clearCompleted = function(){
    const before = tasks.length;
    tasks = tasks.filter(task => task.completed === false)
    saveTasks(tasks);


    if(tasks.length === before){
        console.log("No completed tasks to clear.")
    }
    else{
        console.log("Completed tasks cleared")
    }
}

/**
 * Showing all completed tasks
 *
 * @returns {void}
 */
let showCompletedTasks = function () {
    let completedTasks = 0;
    try {
        if (tasks.length === 0) {
            throw new Error("No tasks to show.")
        }

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].completed === true) {
                completedTasks += 1;
                const currentDate = getDate(tasks[i]) 
                console.log(`[x] ${tasks[i].id} - ${tasks[i].title} | Created: ${currentDate}`)
            }
        }

        if (completedTasks === 0) {
            console.log("No completed tasks to show.")
        }

    } catch (error) {
        console.log(error.message)
    }
}

/**
 * Showing all pending tasks(uncompleted)
 *
 * @returns {void} 
 */
let showPendingTasks = function () {
    let pendingTasks = 0;
    try {
        if (tasks.length === 0) {
            throw new Error("No tasks to show.")
        }

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].completed === false) {
                pendingTasks += 1;
                const currentDate = getDate(tasks[i])
                console.log(`[] ${tasks[i].id} - ${tasks[i].title} | Created: ${currentDate}`)
            }
        }

        if (pendingTasks === 0) {
            console.log("No pending tasks found.")
        }

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    addTask,
    deleteTask,
    editTask,
    completeTask,
    showTasks,
    showCompletedTasks,
    showPendingTasks,
    clearAllTasks,
    uncompleteTask,
    clearCompleted
};