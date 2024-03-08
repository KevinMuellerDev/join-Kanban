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
        const task = data[i][0];

        if (task.status.inProgress == true) {
            tasksInProgress.push(task);
            renderCard(task, "in-progress");
        } else if (task.status.awaitFeedback == true) {
            tasksAwaitFeedback.push(task);
            renderCard(task, "await-feedback");
        } else if (task.status.done == true) {
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
    for (let i = 0; i < data.initials.length; i++) {
        const assignee = data.initials[i];
        const color = data.circleColor[i];
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
    for (let i = 0; i < data.contacts.length; i++) {
        const assignee = data.initials[i];
        const name = data.contacts[i];
        const color = data.circleColor[i];
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
    let taskIndex = allTasks[index][0];
    overlay.innerHTML = "";
    overlay.innerHTML = templateTaskOverlay(taskIndex);
    openOverlay();
}


/**
 * function to render the edit overlay
 * 
 * @param {number} index - index of the array data
 * @author Kevin Mueller
 */
async function renderEditOverlay(index) {
    let overlay = document.getElementById("overlay-card");
    let taskIndex = allTasks[index][0];
    overlay.innerHTML = "";
    overlay.innerHTML = await templateEditOverlay(taskIndex);
    checkedContacts = [];
    displayContacts(tempContacts);
    await checkedContactId(taskIndex.contactIds);
    showChoosenContactsCircle();
    await invertSvgFillsEdit(taskIndex.prio);
    fillRadio(taskIndex.prio);
    getSubtasks(taskIndex.subtask.subtask);
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

    for (let i = 0; i < task.subtask.subtask.length; i++) {
        const subtask = task.subtask.subtask[i];
        const substate = task.subtask.taskstate[i];

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
    let progressLength = task.subtask.subtask.length;
    let taskState = task.subtask.taskstate;
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
    let progressLength = task.subtask.subtask.length;
    let taskState = task.subtask.taskstate.filter(Boolean).length;
    if (progressLength !== 0) {
        return `${taskState} / ${progressLength} Subtasks`;
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
    initContacts();
}