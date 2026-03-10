let tasks = [];
let id = 1;

let showTasks = function(){

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completion === "false"){
            console.log(`[] ${tasks[i]}`)
        }
        else{
            console.log(`[x] ${tasks[i].title}`)
        }
    }

}

//addTask Functionality (id generator aint working as i wanted)
let addTask = function(title){
    let currentTask = {
        id: id,
        title: title,
        completion: false
    }
    id++;

    tasks.push(currentTask)
    console.log(`Task: ${title} successfully added.`)
}

addTask("Gym")
addTask("Study")

showTasks()

