const {
  addTask,
  deleteTask,
  editTask,
  completeTask,
  showTasks,
  showCompletedTasks,
  showPendingTasks,
} = require("./taskManager");

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

if(command === "add"){
    addTask(arg1);
}else if(command === "list"){
    showTasks();
}else if(command === "complete"){
    completeTask(Number(arg1))
}else if(command === "edit"){
    editTask(Number(arg1), arg2)
}else if(command === "delete"){
    deleteTask(Number(arg1))
}else if(command === "completed"){
    showCompletedTasks()
}else if (command === "pending"){
    showPendingTasks()
}else{
    console.log("Unknown command.")
}