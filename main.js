let tasks = [];
let id = 1;


//showtasks Functionality(shows all tasks, worsk as expected)
let showTasks = function(){

    if(tasks.length === 0){
        console.log("No tasks to show.")
        return;
    }
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completion === false){
            console.log(`[] ${tasks[i].title}`)
        }
        else{
            console.log(`[x] ${tasks[i].title}`)
        }
    }

}


//deleteTask added functionallity for deleting tasks by id(working as expected)
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


//addTask Functionality 
let addTask = function(title){

    try {
        if(title.trim() === ""){
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

//completeTask added functionality for completing task by id(working as expected)
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


addTask("");
addTask("   ");
completeTask(0);
deleteTask(-1);
deleteTask("abc");