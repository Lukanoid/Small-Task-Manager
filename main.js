const taskManager = require("./taskManager");

let command = process.argv[2];
let arg1 = process.argv[3];
let arg2 = process.argv[4];

let printTask = function (task) {
    const status = task.completed ? "[x]" : "[]";
    const created = taskManager.getDate(task);
    console.log(`${status} ${task.id} - ${task.title} | Priority: ${task.priority} | Created: ${created}`);
};

let printTaskList = function (tasks) {
    if (!tasks || tasks.length === 0) {
        console.log("No tasks to show.");
        return;
    }

    for (let i = 0; i < tasks.length; i++) {
        printTask(tasks[i]);
    }
};

let showHelp = function () {
    console.log("Available commands:");
    console.log('node main.js add "Task title" [priority]');
    console.log("node main.js delete <id>");
    console.log("node main.js show");
    console.log("node main.js complete <id>");
    console.log("node main.js pending <id>");
    console.log('node main.js edit <id> "New title" [priority]');
    console.log("node main.js clear");
    console.log("node main.js clearCompleted");
    console.log("node main.js showCompleted");
    console.log("node main.js showPending");
    console.log('node main.js search "keyword"');
    console.log("node main.js priority <id> <low|medium|high>");
    console.log("node main.js help");
};

try {
    switch (command) {
        case "add": {
            const result = taskManager.addTask(arg1, arg2 || "medium");
            console.log(result.message);
            break;
        }

        case "delete": {
            if (!arg1) {
                throw new Error("Please provide task id.");
            }
            const result = taskManager.deleteTask(Number(arg1));
            console.log(result.message);
            break;
        }

        case "show": {
            const tasks = taskManager.showTasks();
            printTaskList(tasks);
            break;
        }

        case "complete": {
            if (!arg1) {
                throw new Error("Please provide task id.");
            }
            const result = taskManager.completeTask(Number(arg1));
            console.log(result.message);
            break;
        }

        case "pending": {
            if (!arg1) {
                throw new Error("Please provide task id.");
            }
            const result = taskManager.uncompleteTask(Number(arg1));
            console.log(result.message);
            break;
        }

        case "edit": {
            if (!arg1) {
                throw new Error("Please provide task id.");
            }
            if (!arg2) {
                throw new Error("Please provide new task title.");
            }

            const newPriority = process.argv[5];
            const result = taskManager.editTask(Number(arg1), arg2, newPriority);
            console.log(result.message);
            break;
        }

        case "clear": {
            taskManager.clearAllTasks();
            console.log("All tasks cleared.");
            break;
        }

        case "clearCompleted": {
            const result = taskManager.clearCompleted();
            console.log(result.message);
            break;
        }

        case "showCompleted": {
            const completedTasks = taskManager.showCompletedTasks();
            if (completedTasks.length === 0) {
                console.log("No completed tasks to show.");
            } else {
                printTaskList(completedTasks);
            }
            break;
        }

        case "showPending": {
            const pendingTasks = taskManager.showPendingTasks();
            if (pendingTasks.length === 0) {
                console.log("No pending tasks found.");
            } else {
                printTaskList(pendingTasks);
            }
            break;
        }

        case "search": {
            const result = taskManager.search(arg1);
            if (result.count === 0) {
                console.log(result.message);
            } else {
                printTaskList(result.matches);
                console.log(result.message);
            }
            break;
        }

        case "priority": {
            if (!arg1 || !arg2) {
                throw new Error("Please provide task id and priority.");
            }
            const result = taskManager.changePriority(Number(arg1), arg2);
            console.log(result.message);
            break;
        }

        case "help":
        case undefined: {
            showHelp();
            break;
        }

        default: {
            console.log("Unknown command.");
            showHelp();
        }
    }
} catch (error) {
    console.log(error.message);
}