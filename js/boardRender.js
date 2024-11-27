let tasksTodo = [];
let tasksInProgress = [];
let tasksAwaitFeedback = [];
let tasksDone = [];

/**
 * this function clears the whole board and after that it renders the tasks
 * in regard of the task status.
 *
 * 
 * @param {Object} data - JSON with all Tasks data
 * @author Kevin Mueller
 */
async function renderCheckState(data) {
    await clearBoard();

    for (let i = 0; i < data.length; i++) {
        const task = data[i];

        if (task.inProgress == true) {
            tasksInProgress.push(task);
            renderCard(task, "in-progress");
        } else if (task.awaitFeedback == true) {
            tasksAwaitFeedback.push(task);
            renderCard(task, "await-feedback");
        } else if (task.done == true) {
            tasksDone.push(task);
            renderCard(task, "done");
        } else {
            tasksTodo.push(task);
            renderCard(task, "todo");
        }
    }
    checkIfTasksAvailable();
}

/**
 * this function clears the board and all board dependant arrays
 * 
 * @author Kevin Mueller
 */
function clearBoard() {
    document.getElementById("todo").innerHTML = "";
    document.getElementById("in-progress").innerHTML = "";
    document.getElementById("await-feedback").innerHTML = "";
    document.getElementById("done").innerHTML = "";
    tasksTodo = [];
    tasksInProgress = [];
    tasksAwaitFeedback = [];
    tasksDone = [];
}

/**
 * this function checks if there are tasks in the section, if not the template for noTask
 * will be rendered.
 * 
 * @author Kevin Mueller
 */
function checkIfTasksAvailable() {
    if (tasksTodo.length == 0) {
        document.getElementById("todo").innerHTML = templateNoTask();
    }
    if (tasksInProgress.length == 0) {
        document.getElementById("in-progress").innerHTML = templateNoTask();
    }
    if (tasksAwaitFeedback.length == 0) {
        document.getElementById("await-feedback").innerHTML = templateNoTask();
    }
    if (tasksDone.length == 0) {
        document.getElementById("done").innerHTML = templateNoTask();
    }
}

/**
 * this function renders the card in regard of the given task and section id
 *
 * @param {Object} task - data of the task
 * @param {string} id - id of the section
 * @author Kevin Mueller
 */
function renderCard(task, id) {
    boardSection = document.getElementById(id);
    boardSection.innerHTML += templateCard(task);
}

/**
 * this function gets the assignees and renders them in the html template
 *
 * @param {Array} data - provides assignees as an array
 * @returns html template with Assignees
 * @author Kevin Mueller
 */
function renderCardAssignee(data) {
    let textHTML = "";
    
    for (let i = 0; i < data.assigned.length; i++) {
        const assignee = data.assigned[i].initials;
        const color = data.assigned[i].circle_color;
       
        textHTML += templateCardAssignee(assignee, color);
    }
    return textHTML;
}


/**
 * this function gets the assignees data and renders it in the html template
 * 
 * @param {Object} data - JSON that contains needed data for assignees
 * @returns html template with assignees for the overlay
 * @author Kevin Mueller
 */
function renderOverlayAssignee(data) {
    let textHTML = "";

    for (let i = 0; i < data.assigned.length; i++) {
        const assignee = data.assigned[i].initials;
        const name = data.assigned[i].name;
        const color = data.assigned[i].circle_color;
        textHTML += templateOverlayAssignee(assignee, name, color);
    }
    return textHTML;
}


/**
 * function to render the card task overlay
 * 
 * @param {number} index - index of the wanted information 
 * @author Kevin Mueller
 */
function renderTaskOverlay(index) {
    let overlay = document.getElementById("overlay-card");
    let taskIndex = allTasks.findIndex(task => task.id === index);
    console.log(taskIndex);
    
    overlay.innerHTML = "";
    overlay.innerHTML = templateTaskOverlay(allTasks[taskIndex]);
    openOverlay();
}


/**
 * function to render the edit overlay
 * 
 * @param {number} index - index of the array data
 * @author Kevin Mueller
 */
async function renderEditOverlay(index) {
    let taskIndex = allTasks.findIndex(task => task.id === index);
    let overlay = document.getElementById("overlay-card");
    let task = allTasks[taskIndex];
    overlay.innerHTML = "";
    overlay.innerHTML = await templateEditOverlay(task);
    checkedContacts = [];
    displayContacts(tempContacts);
    await checkedContactId(task.assigned);
    showChoosenContactsCircle();
    await invertSvgFillsEdit(task.priority);
    fillRadio(task.priority);
    getSubtasks(task.subtasks);
    showSubtasks();
    createTodayDateforDatepicker()
}


/**
 * function to get subtasks with its states from the specified task and to render it
 * 
 * @param {Object} task - Json object to gather the data from 
 * @returns html template with provided data
 * @author Kevin Mueller
 */
function renderSubtask(task) {
    let textHTML = "";
    let imgSource = "";
    console.log(task);
    
    for (let i = 0; i < task.subtasks.length; i++) {
        const subtask = task.subtasks[i].task_description;
        const substate = task.subtasks[i].task_state;

        if (substate == true) {
            imgSource = "./assets/img/checkbuttonchecked.png";
        } else if (substate == false) {
            imgSource = "./assets/img/checkbuttonempty.png";
        }
        textHTML += templateOverlaySubtask(i, subtask, task, imgSource);
    }
    return textHTML;
}


/**
 * function to get the length and status of the subtasks to render it
 * 
 * @param {Object} task - Json object to gather the data from
 * @returns html template with provided data
 * @author Kevin Mueller
 */
function renderProgressBar(task) {
    console.log(task.subtasks);
    
    let progressLength = task.subtasks.length;
    let taskState = task.subtasks.map(task=> task.task_state);
    let finishedSubtasks = taskState.filter(Boolean).length;
    let width = (100 / progressLength) * finishedSubtasks;
    if (progressLength > 0) {
        return templateProgressBar(width);
    } else {
        return ``;
    }
}


/**
 * function to get the length and status of the subtasks to render it
 * 
 * @param {Object} task - Json object to gather the data from
 * @returns html template with provided data
 * @author Kevin Mueller
 */
function renderProgressAmount(task) {
    let progressLength = task.subtasks.length;
    let taskState = task.subtasks.map(task=> task.task_state);
    let finishedSubtasks = taskState.filter(Boolean).length;
    if (progressLength !== 0) {
        return `${finishedSubtasks} / ${progressLength} Subtasks`;
    } else{
        return ''
    }
    
}


/**
 * function to render the Addtask overlay
 * 
 * @author Kevin Mueller
 */
function renderAddTaskOverlay() {
    document.getElementById("overlay-add-task").innerHTML = templateAddTaskBoard();
    initContacts(localStorage.getItem("token"));
}