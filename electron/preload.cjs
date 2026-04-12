const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("taskAPI", {
    getAll: () => ipcRenderer.invoke("tasks:getAll"),
    add: (title, priority) => ipcRenderer.invoke("tasks:add", title, priority),
    delete: (id) => ipcRenderer.invoke("tasks:delete", id),
    toggle: (id) => ipcRenderer.invoke("tasks:toggle", id),
    edit: (id, newTitle, newPriority) =>
        ipcRenderer.invoke("tasks:edit", id, newTitle, newPriority),
    clearAll: () => ipcRenderer.invoke("tasks:clearAll")
});