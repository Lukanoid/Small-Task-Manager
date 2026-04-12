const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json")

function loadTasks(){
    if(!fs.existsSync(filePath)){
        return [];
    }

    const data = fs.readFileSync(filePath, "utf-8");
    
    if(!data.trim()){
        return [];
    }
    try{
        return JSON.parse(data)
    } catch(error){
        throw new Error("tasks.json contains invalid JSON.")
    }
}

function saveTasks(tasks){
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

module.exports= {
    loadTasks,
    saveTasks
};