function storeTask(){
    console.log("stored Task")
    //Javascript
    let taskDescription = document.getElementById('task_description').value
    console.log(taskDescription)
    //JQuery
    let taskDescriptionJQ = $('#task_description').val()
    console.log(taskDescriptionJQ)

    let body = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: taskDescription })
    };

    fetch('/tasks', body)
    .then(response => {
        if (response.ok) {
        return response.json();
        } else {
        throw "Error en la llamada Ajax";
        }
    })
    .then(task => {
        document.getElementById('task_description').value = '';
        addTask(task);
    })
    .catch(error => {
        console.log('Error: ', error);
    })

    function addTask(task) {
        let html =
        `
        <div id="task_${task.id}" class="card my-3">
            <div class="card-body">
            <p class="card-text">${task.description}</p>
            <input type="button" id="done_${task.id}" onclick="updateTask(${task.id})" value="Done">
            <input type="button" id="delete_${task.id}" onclick="deleteTask(${task.id})" value="Delete">
            </div>
        </div>
        `;
        let node = document.createRange().createContextualFragment(html);
        document.getElementById('tasks_list').prepend(node);
    }
}

function updateTask(taskId){
    let body = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId })
    }

    fetch('/update', body)
    .then(response => {
        if (response.ok) {
        return response.json();
        } else {
        throw "Error en la llamada Ajax";
        }
    })
    .then(id => {
        updateTask(id);
    })
    .catch(error => {
        console.log('Error: ', error);
    })

    function updateTask(data) {
        document.getElementById('task_'+data.id).classList.add("bg-light")
        document.getElementById('done_'+data.id).remove()
    }
}

function deleteTask(taskId){
    let body = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId })
    }

    fetch('/delete', body)
    .then(response => {
        if (response.ok) {
        return response.json();
        } else {
        throw "Error en la llamada Ajax";
        }
    })
    .then(id => {
        deleteTask(id);
    })
    .catch(error => {
        console.log('Error: ', error);
    })

    function deleteTask(data) {
        document.getElementById('task_'+data.id).remove()
    }
}