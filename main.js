let tasks = [];
let id = 1;

//addTask Functionality (id generator aint working as i wanted)
let addTask = function(title){
    let currentTask = {
        id: id,
        title: title,
        completion: false
    }
    id++;

    tasks.push(currentTask)
}

addTask("Gym")
addTask("Study")

