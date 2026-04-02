const {
  addTask,
  deleteTask,
  editTask,
  completeTask,
  showTasks,
  showCompletedTasks,
  showPendingTasks
} = require("./taskManager");

addTask("Gym");
addTask("Sports");
addTask("Cars");

showTasks();

completeTask(1);
editTask(2, "Football");

showCompletedTasks();
showPendingTasks();