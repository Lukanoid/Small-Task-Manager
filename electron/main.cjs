const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const taskManager = require("../taskManager");

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, "../ui/index.html"));
}

app.whenReady().then(() => {
    ipcMain.handle("tasks:getAll", async () => {
        return taskManager.getAllTasks();
    });

    ipcMain.handle("tasks:add", async (_, title, priority) => {
        return taskManager.addTask(title, priority);
    });

    ipcMain.handle("tasks:delete", async (_, id) => {
        return taskManager.deleteTask(id);
    });

    ipcMain.handle("tasks:toggle", async (_, id) => {
        return taskManager.toggleTask(id);
    });

    ipcMain.handle("tasks:edit", async (_, id, newTitle, newPriority) => {
        return taskManager.editTask(id, newTitle, newPriority);
    });

    ipcMain.handle("tasks:clearAll", async () => {
        return taskManager.clearAllTasks();
    });

    ipcMain.handle("tasks:changePriority", async (_, id, priority) => {
        return taskManager.changePriority(id, priority);
    });

    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});