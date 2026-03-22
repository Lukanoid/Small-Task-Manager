let tasks = [];
let id = 1;


/**
 * Showing all tasks
 *
 * 
 * @returns {void}
 */
let showTasks = function(){

    if(tasks.length === 0){
        console.log("No tasks to show.")
        return;
    }
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completion === false){
            console.log(`[] ${tasks[i].id} - ${tasks[i].title}`)
        }
        else{
            console.log(`[x] ${tasks[i].id} - ${tasks[i].title}`)
        }
    }

}


/**
 * Deleting existing task
 *
 * @param {number} id the id of task to delete
 * @returns {void}
 */
let deleteTask = function(id){
    const index = tasks.map(e => e.id).indexOf(id);

    try {
        if(index === -1){
            throw new Error("Task not found")
        }
        let completedTask = tasks.splice(index, 1)
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
let addTask = function(title){

    try {
        if(!title || title.trim() === ""){
        throw new Error("No Title Added")
    }

    const currentTask = {
        id: id++,
        title: title,
        completion: false
    }
    
    tasks.push(currentTask)
    console.log(`Task: ${title} successfully added.`)
    } catch (error) {
        console.log(error.message)
        
    }
}

/**
 * Marking a task as completed
 *
 * @param {number} id the id of the task to be marked as completed
 * @returns {void}
 */
let completeTask = function(id){
    const index = tasks.map(e => e.id).indexOf(id);
    try {
        if(index === -1){
        throw new Error("Task not found")
    }
        tasks[index].completion = true;
        console.log(`Task: ${tasks[index].title} successfully completed.`)
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
let editTask = function(id, newTitle){
    const index = tasks.map(e => e.id).indexOf(id);

    try {
        if(index === -1){
        throw new Error("Task not found")
    }
        if(!newTitle || newTitle.trim() === ""){
            throw new Error("Task title is invalid")
        }
        let oldTitle = tasks[index].title;
        tasks[index].title = newTitle.trim();

        console.log(`Task: ${oldTitle} successfully changed to ${tasks[index.title]}.`)

    } catch (error) {
        console.log(error.message)
    }
}

/**
 * Showing all completed tasks
 *
 * @returns {void}
 */
let showCompletedTasks = function(){
    let completedTasks = 0;
    try {
        if(tasks.length === 0){
        throw new Error("No tasks to show.")
    }

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completion === true){
            completedTasks += 1;
            console.log(`[x] ${tasks[i].id} - ${tasks[i].title}`)
        }
    }

    if(completedTasks === 0){
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
let showPendingTasks = function(){
    let pendingTasks = 0;
    try {
        if(tasks.length === 0){
        throw new Error("No tasks to show.")
    }

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completion === false){
            pendingTasks += 1;
            console.log(`[] ${tasks[i].id} - ${tasks[i].title}`)
        }
    }

    if(pendingTasks === 0){
        console.log("No pending tasks found.")
    }

    } catch (error) {
        console.log(error.message)
    }
}


addTask("Gym")
addTask("Sports")
addTask("Cars")

showTasks()

completeTask(1);
completeTask(2);
completeTask(3);
showPendingTasks()