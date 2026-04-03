const {
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
} = require("./taskManager");

let showHelp = function(){
        console.log(`
  Available commands:
  node main.js add "Task title" - for adding task.
  node main.js list - for seeing all tasks.
  node main.js complete 1 - for completing task.
  node main.js edit 1 "New title" - for editing task.
  node main.js delete 1 - for deleting task.
  node main.js completed - for seeing all completed tasks.
  node main.js pending - for seeing all uncompleted tasks.
  node main.js clear - for clearing all tasks.
  node main.js uncomplete 1 - for marking task as pending.
  node main.js clear-completed - for clearing completed tasks.
`);
}

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

if (command === "add") {
    addTask(arg1);
}
 else if (command === "list") {
    showTasks();
} 
else if (command === "complete") {
    completeTask(Number(arg1));
} 
else if (command === "edit") {
    editTask(Number(arg1), arg2);
} 
else if (command === "delete") {
    deleteTask(Number(arg1));
} 
else if (command === "completed") {
    showCompletedTasks();
} 
else if (command === "clear") {
    clearAllTasks();
}
else if (command === "pending") {
    showPendingTasks();
} 
else if (command === "uncomplete") {
    uncompleteTask(Number(arg1));
} 
else if (command === "clear-completed") {
    clearCompleted()
} 
else {
    console.log("Unknown command.");
    showHelp()
}
