let tasks = [];
let id = 1;


//showtasks Functionality(shows all tasks, worsk as expected)
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

let completeTask = function(id){
    const pos = tasks.map(e => e.id).indexOf(id);
    let compeltedTask = tasks.splice(pos, 1)
    console.log(`Task: ${compeltedTask[0].title} successfully removed`)
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
addTask("Homeword")
addTask("Gaming")
addTask("Betting")

completeTask(4)

