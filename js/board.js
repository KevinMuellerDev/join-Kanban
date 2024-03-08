let currentDraggedElement;
let checkedSubtasks = [];
let searchedTask = [];
let dummyContacts = [];
let lockout;

window.addEventListener("resize", function () {
  let windowWidth = window.innerWidth;
  if (windowWidth >= 1000 && windowWidth <= 1023) {
    closeOverlayAddTask();
  }
});

/**
 * init function to load the content and reset global variables
 *
 * @author Kevin Mueller
 */
async function initBoard() {
  logedInUser = await getItemContacts("logedInUser");
  if (logedInUser.length == 0) {
    navigateToIndex();
  }
  renderLogedUser();
  await getAllTasksData();
  clearCurrentTask();
  renderCheckState(allTasks);
  initContacts();
  checkedContacts = [];
  await renderAddTaskOverlay();
  lockout = false;
  createTodayDateforDatepicker();
}

/**
 * function to allow the drop event
 *
 * @param {event} ev - catch the incoming event
 * @author Kevin Mueller
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * function to determine the current dragged element
 *
 * @param {number} id - id of the dragged element
 * @author Kevin Mueller
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * this function determines to which section the card should be moved
 *
 * @param {string} id - id of the board-section to move to
 * @author Kevin Mueller
 */
async function moveTo(id) {
  allTasks[currentDraggedElement][0].status.inProgress = false;
  allTasks[currentDraggedElement][0].status.awaitFeedback = false;
  allTasks[currentDraggedElement][0].status.done = false;

  if (id == "in-progress") {
    allTasks[currentDraggedElement][0].status.inProgress = true;
    await setItem("test_board", allTasks);
    await initBoard();
    addOverflow();
  } else if (id == "await-feedback") {
    allTasks[currentDraggedElement][0].status.awaitFeedback = true;
    await setItem("test_board", allTasks);
    await initBoard();
    addOverflow();
  } else if (id == "done") {
    allTasks[currentDraggedElement][0].status.done = true;
    await setItem("test_board", allTasks);
    await initBoard();
    addOverflow();
  } else if (id == "todo") {
    await setItem("test_board", allTasks);
    await initBoard();
    addOverflow();
  }
}

/**
 * this function manages the checkbox logic of the task overlay
 *
 * @param {number} subtask - index of the subtask
 * @param {number} id - id of the task
 * @author Kevin Mueller
 */
function checkedSubtask(subtask, id) {
  let subtaskDom = document.getElementById(`sub${subtask}`);

  if (allTasks[id][0].subtask.taskstate[subtask] == true) {
    subtaskDom.src = `./assets/img/checkbuttonempty.png`;
    subtaskDom.alt = "unchecked";
    allTasks[id][0].subtask.taskstate[subtask] = false;
  } else if (allTasks[id][0].subtask.taskstate[subtask] == false) {
    subtaskDom.src = `./assets/img/checkbuttonchecked.png`;
    subtaskDom.alt = "checked";
    allTasks[id][0].subtask.taskstate[subtask] = true;
  }
  setItem("test_board", allTasks);
}

/**
 * this function checks the category of the card and determines the bg-color
 *
 * @param {string} category - gets the category to work with
 * @returns the background color var as a string
 * @author Kevin Mueller
 */
function checkCategory(category) {
  if (category == "User Story") {
    return `var(--topic-user)`;
  } else if (category == "Technical Task") {
    return `var(--topic-technical)`;
  }
}

/**
 * this function rotates the card depending on the id
 *
 * @param {number} id - index of the card-id
 * @author Kevin Mueller
 */
function rotateCard(id) {
  document.getElementById(`card${id}`).classList.add("card-rotate");
}

/**
 * this function adds overflow-y:scroll to the board-sections
 *
 * @author Kevin Mueller
 */
function addOverflow() {
  let overflow = document.getElementsByClassName("board-card-section");
  for (let i = 0; i < overflow.length; i++) {
    overflow[i].classList.remove("card-rotate-overflow");
  }
}

/**
 * this function renders the ghost card on the given section
 *
 * @param {string} id - id of the section
 * @author Kevin Mueller
 */
function renderGhostCard(id) {
  if (lockout != true) {
    document.getElementById(id).innerHTML += templateGhostCard();
    lockout = true;
  }
}

/**
 * this function removes the ghost card on the given section
 *
 * @param {string} id - id of the section
 * @author Kevin Mueller
 */
function removeGhostCard(id) {
  let ghost = document.getElementById(id);

  if (ghost) {
    document.getElementById(id).remove();
    lockout = false;
  }
}

/**
 * this function deletes the given task and,
 * renews their ids in relation to the index of the Json
 *
 * @param {number} index - index of the given task
 * @author Kevin Mueller
 */
async function deleteTask(index) {
  await allTasks.splice(index, 1);
  for (let i = 0; i < allTasks.length; i++) {
    allTasks[i][0].id = i;
  }
  await setItem("test_board", allTasks);
  closeOverlay();
}

/**
 * this function renders the card in regards of the given search input
 *
 * @author Kevin Mueller
 */
function searchTask() {
  let searchValue = document.getElementById("board-search-task").value.toLowerCase();
  searchedTask = [];

  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i][0].title.toLowerCase().indexOf(searchValue) !== -1) {
      searchedTask.push(allTasks[i]);
    }
  }
  renderCheckState(searchedTask);

  if (searchedTask.length == 0) {
    displaySearchInfo();
  }
}

/**
 * function to show information that theres no content that contains the searched value
 *
 * @author Kevin Mueller
 */
function displaySearchInfo() {
  let searchInfo = document.getElementById("searchInfo");
  searchInfo.className = "show";
  setTimeout(function () {
    searchInfo.className = searchInfo.className.replace("show", "");
  }, 3000);
}

/**
 * function to highlight the svg icon in the prio buttons
 *
 * @param {string} value - string to determine which button has to be changed
 * @author Kevin Mueller & Christian Foerster
 */
function invertSvgFillsEdit(value) {
  let priorityIcon = value;
  let urgentIcon = document.getElementById("urgent-icon-edit");
  let mediumIcon = document.getElementById("medium-icon-edit");
  let lowIcon = document.getElementById("low-icon-edit");
  let icons = [urgentIcon, mediumIcon, lowIcon];
  icons.forEach((icon) => {
    icon.classList.remove("fill-btn-white");
  });
  if (priorityIcon == "urgent") {
    urgentIcon.classList.add("fill-btn-white");
  } else if (priorityIcon == "medium") {
    mediumIcon.classList.add("fill-btn-white");
  } else if (priorityIcon == "low") {
    lowIcon.classList.add("fill-btn-white");
  }
}

/**
 * function to retrieve the subtasks from clicked card
 *
 * @param {Array} task - this array contains subtasks of the id
 * @author Kevin Mueller
 */
function getSubtasks(task) {
  subtasks = [];
  for (let i = 0; i < task.length; i++) {
    const subtask = task[i];
    subtasks.push(subtask);
  }
}

/**
 * function to determine the button color based on the state
 *
 * @param {string} prio - string that contains the priority
 * @author Kevin Mueller
 */
function fillRadio(prio) {
  switch (prio) {
    case "urgent":
      document.getElementById("urgent-radio").style.setProperty("--prio-button-selected", getButtonColor(prio));
      document.getElementById("urgent-edit").checked = "checked";
      break;
    case "medium":
      document.getElementById("medium-radio").style.setProperty("--prio-button-selected", getButtonColor(prio));
      document.getElementById("medium-edit").checked = "checked";
      break;
    case "low":
      document.getElementById("low-radio").style.setProperty("--prio-button-selected", getButtonColor(prio));
      document.getElementById("low-edit").checked = "checked";
      break;
    default:
      break;
  }
}

/**
 * this function gets the index of the contacts given
 *
 * @param {Array} contacts - array of contacts
 * @author Kevin Mueller
 */
function checkedContactId(contacts) {
  for (let i = 0; i < contacts.length; i++) {
    const contactId = contacts[i];
    getClickedContact(getContactIndex(contactId), contactId);
  }
}

/**
 * function to get the index of given item
 *
 * @param {Array} id - gets item out of array
 * @returns index of the given item
 * @author Kevin Mueller
 */
function getContactIndex(id) {
  for (let i = 0; i < tempContacts.length; i++) {
    const contact = tempContacts[i];
    if (contact.id == id) {
      return i;
    }
  }
}

/**
 * function to update the allTasks in remote storage and render the overlay
 *
 * @param {number} index - index as number
 * @author Kevin Mueller
 */
async function editTask(index) {
  await validateForm(index);
  renderTaskOverlay(index);
}

/**
 * function to handle the current task state
 *
 * @param {string} taskState - string to determine the current task state
 * @author Kevin Mueller
 */
function handleTaskState(taskState) {
  if (taskState === "todo") {
    currentTaskState = { inProgress: false, awaitFeedback: false, done: false };
  } else if (taskState == "inprogress") {
    currentTaskState = { inProgress: true, awaitFeedback: false, done: false };
  } else if (taskState == "awaitfeedback") {
    currentTaskState = { inProgress: false, awaitFeedback: true, done: false };
  }
}
