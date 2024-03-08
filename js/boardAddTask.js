/**
 * function to clear the values of the addtask overlay 
 * 
 * @author Kevin Mueller
 */
function clearBoardAddTask(){
    document.getElementById('title').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('choosenContacts').innerHTML = '';
    document.getElementById('date').value = '';
    document.getElementById('dateNormal').value = '';
    document.getElementById('category').value = '';
    document.getElementById('subtask').value = '';
    document.getElementById('showSubtasks').innerHTML = '';
    uncheckPrioButtons();
    invertSvgFills("medium");
    handleClick("medium");
    clearActiveContacts()
    checkedContacts = [];
    subtasks = [];
}


/**
 * function to reset the prio buttons
 */
function uncheckPrioButtons(){
    document.getElementById('urgent').checked = false;
    document.getElementById('medium').checked = true;
    document.getElementById('low').checked = false;
}


/**
 * function to close the task overlay
 *
 * @author Kevin Mueller
 */
function closeOverlay() {
    document.getElementById("overlay-card").classList.remove("task-overlay-translate-in");
    document.getElementById("overlay-card").classList.add("task-overlay-translate-out");
    document.getElementById("overlay-card").innerHTML = "";
    setTimeout(displayCloseOverlay, 250);
    initBoard();
}


/**
 * function to close the addtask overlay, afterwards the board gets reinitialized
 * 
 * @param {boolean} state - if true the task added modal will be shown.
 * @author Kevin Mueller
 */
function closeOverlayAddTask(state) {
    if (state === true) {
        document.getElementById("taskadded").classList.remove("d-none");
        setTimeout(closeTaskAdded, 1000);
        setTimeout(translateOutAdd, 700);
        setTimeout(displayCloseOverlay, 700);
        setTimeout(displayCloseOverlayAddTask, 700);
    } else {
        setTimeout(translateOutAdd, 125);
        setTimeout(displayCloseOverlay, 250);
        setTimeout(displayCloseOverlayAddTask, 250);
    }
    initBoard();
}


/**
 * function to translate out the addtask overlay
 * 
 * @author Kevin Mueller
 */
function translateOutAdd() {
    document.getElementById("overlay-add-task").classList.remove("task-overlay-translate-in-task");
    document.getElementById("overlay-add-task").classList.add("task-overlay-translate-out");
}


/**
 * function to end the display of the taskadded element
 * 
 * @author Kevin Mueller
 */
function closeTaskAdded() {
    document.getElementById("taskadded").classList.add("d-none");
}


/**
 * function to open the task overlay
 *
 * @author Kevin Mueller
 */
function openOverlay() {
    displayOpenOverlay("overlay-card");
    setTimeout(slideInOverlay, 75);
}


/**
 * function to delegate the opening of the addtask overlay and the slidein animation
 * 
 * @author Kevin Mueller
 */
function openAddTaskOverlay() {
    subtasks = [];
    displayOpenOverlay("overlay-add-task");
    setTimeout(slideInOverlayAddTask, 75);
}


/**
 * help function to slide in the overlay with a setTimeout
 *
 * @author Kevin Mueller
 */
function slideInOverlay() {
    document.getElementById("overlay-card").classList.add("task-overlay-translate-in");
}


/**
 * function to add the slidein animation
 * 
 * @author Kevin Mueller
 */
function slideInOverlayAddTask() {
    document.getElementById("overlay-add-task").classList.add("task-overlay-translate-in-task");
}


/**
 * help function to display the overlay with a setTimeout
 *
 * @author Kevin Mueller
 */
function displayOpenOverlay(id) {
    document.getElementById("overlay").classList.remove("d-none");
    document.getElementById(id).classList.remove("task-overlay-translate-out");
}


/**
 * function to open the addtask overlay
 * 
 * @param {Object} state - Json object which contains the state of the task
 * @author Kevin Mueller
 */
function displayAddTaskOverlay(state) {
    checkedContacts = [];
    if (window.innerWidth <= 980) {
        navigateToAddTask();
    } else {
        if (state !== undefined) {
            handleTaskState(state)
        }
        invertSvgFills("medium");
        handleClick("medium");
        document.getElementById("overlay").classList.remove("d-none");
        document.getElementById('overlay-add-task').classList.remove("d-none");
        document.getElementById("overlay-add-task").classList.remove("task-overlay-translate-out");
        openAddTaskOverlay();
    }
}


/**
 * help function to hide the overlay with a setTimeout
 *
 * @author Kevin Mueller
 */
function displayCloseOverlay() {
    document.getElementById("overlay").classList.add("d-none");
}


/**
 * help function to hide the overlay with a setTimeout
 *
 * @author Kevin Mueller
 */
function displayCloseOverlayAddTask() {
    document.getElementById("overlay-add-task").classList.add("d-none");
}