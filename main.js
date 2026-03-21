let tasks = [];
let id = 1;
let choice = 1;
let input = "Gym";


//showtasks Functionality(shows all tasks, worsk as expected)
let showTasks = function(){

    if(tasks.length === 0){
        console.log("No tasks to show.")
        return;
    }
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completion === false){
            console.log(`[] ${tasks[i]}`)
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
        let compeltedTask = tasks.splice(index, 1)
        console.log(`Task: ${compeltedTask[0].title} successfully removed.`)
        
    } catch (error) {
        console.log(error.message)
    }
}


//addTask Functionality (id generator aint working as i wanted)
let addTask = function(title){
    const currentTask = {
        id: id++,
        title: title,
        completion: false
    }

    tasks.push(currentTask)
    console.log(`Task: ${title} successfully added.`)
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

addTask("Gym")
addTask("Gambling")
addTask("Homework")
addTask("Sports")

deleteTask(10)



//added simple menu simulation 
if(choice === 1){
    addTask(input)
}
else if(choice === 2){
    showTasks()
}
else if(choice === 3){
    completeTask()
}else{
    deleteTask()
}

let a = 10;