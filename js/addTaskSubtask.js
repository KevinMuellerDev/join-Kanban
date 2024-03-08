/**
 * Retrieves the value of an input field with the ID "subtask".
 * @function getInput
 * @returns {string} The value of the input field.
 * @author Christian Förster
 */

function getInput() {
  let subtask = document.getElementById("subtask").value;
  return subtask;
}

/**
 * Pushes a subtask into the subtasks array, updates task states, displays subtasks, and renders a plus icon.
 * @function pushSubtask
 * @author Christian Förster
 */

function pushSubtask() {
  let subTaskSvgContainer = document.getElementById("subTaskSvgContainer");
  let subtask = getInput();
  let taskState = false;
  if (subtask == "") {
    checkSubtasknputField();
  } else {
    subtasks.push(subtask);
    taskStates.push(taskState);
    showSubtasks();
    subTaskSvgContainer.innerHTML = renderSubtaskPlusIcon();
    clearSubtaskInput();
  }
}

/**
 * Checks if the Enter key is pressed and calls the 'pushSubtask' function if the event target's id is "subtask".
 * @function checkKeyPressAndPushSubtask
 * @param {Event} event - The event object representing the key press event.
 * @author Christian Förster
 */

function checkKeyPressAndPushSubtask(event) {
  removeEmptyEditSubtaskInputNotice();
  if (event.key === "Enter") {
    if (event.srcElement.id == "subtask") {
      pushSubtask();
    }
  }
}

/**
 * Handles key press events and invokes the 'saveEditedSubtask' function with the specified index if the Enter key is pressed.
 * @function checkKeyPressAndPushEditedSubtask
 * @param {KeyboardEvent} event - The event object representing the key press event.
 * @param {number} index - The index of the subtask being edited.
 * @author Christian Förster
 */

function checkKeyPressAndPushEditedSubtask(event, index) {
  removeEmptyEditSubtaskInputNotice();
  if (event.key === "Enter") {
    saveEditedSubtask(index);
  }
}

/**
 * Displays subtasks in the designated container.
 * @function showSubtasks
 * @author Christian Förster
 */

function showSubtasks() {
  let showSubtasks = document.getElementById("showSubtasks");
  showSubtasks.innerHTML = "";
  subtasks.forEach((subtask, index) => {
    showSubtasks.innerHTML += renderSubtaskItem(subtask, index);
  });
}

/**
 * Handles mouse hover event to display additional options for a subtask.
 * @function mouseIn
 * @param {number} index - The index of the subtask.
 * @author Christian Förster
 */

function mouseIn(index) {
  let selectedSubtask = document.getElementById(`subtaskListContainer_${index}`);
  let iconSection = document.getElementById(`subtask-icon-section_${index}`);
  let getUlElement = document.getElementById(`subTaskItemUl_${index}`);
  selectedSubtask.classList.add("subtask-selected");
  if (iconSection) {
    iconSection.classList.remove("d-none");
  }
}

/**
 * Handles mouse out event to hide additional options for a subtask.
 * @function mouseOut
 * @param {number} index - The index of the subtask.
 * @author Christian Förster
 */

function mouseOut(index) {
  let selectedSubtask = document.getElementById(`subtaskListContainer_${index}`);
  let iconSection = document.getElementById(`subtask-icon-section_${index}`);
  selectedSubtask.classList.remove("subtask-selected");
  if (iconSection) {
    iconSection.classList.add("d-none");
  }
}

/**
 * Prepares a subtask for editing by replacing it with an input field.
 * @function editSubtask
 * @param {number} index - The index of the subtask to be edited.
 * @author Christian Förster
 */

function editSubtask(index) {
  let subtaskToEdit = document.getElementById(`subtask_${index}`);
  let iconSection = document.getElementById(`subtask-icon-section_${index}`);
  let subtaskText = subtasks[index];
  let inputField = ` <input id="changedSubtaskValue" onkeypress="checkKeyPressAndPushEditedSubtask(event,${index})" type="text" value="${subtaskText}" >`;
  let getUlElement = document.getElementById(`subTaskItemUl_${index}`);
  iconSection.innerHTML = renderEditSubtaskIcons(index);
  getUlElement.classList.add("edit-subtask-field");
  subtaskToEdit.innerHTML = inputField;
  subtaskToEdit.querySelector("input").focus();
}

/**
 * Saves the edited value of a subtask and updates the display.
 * @function saveEditedSubtask
 * @param {number} index - The index of the subtask being edited.
 * @author Christian Förster
 */

function saveEditedSubtask(index) {
  let newSubtaskValue = document.getElementById("changedSubtaskValue").value;
  if (newSubtaskValue == "") {
    document.getElementById("inputReqiuredSpanSubtask").classList.remove("d-none");
  } else {
    subtasks[index] = newSubtaskValue;
    showSubtasks();
  }
}

/**
 * Clears the input field for entering subtasks.
 * @function clearSubtaskInput
 * @returns {string} An empty string.
 * @author Christian Förster
 */

function clearSubtaskInput() {
  let subtask = (document.getElementById("subtask").value = "");
  removeEmptyEditSubtaskInputNotice();
  return subtask;
}

/**
 * Removes a subtask and its corresponding task state from the task's subtasks and taskStates arrays respectively.
 * Calls the showSubtasks function to update the UI.
 * @function deleteSubtask
 * @param {number} index - The index of the subtask to be deleted.
 * @author Christian Förster
 */

function deleteSubtask(index) {
  subtasks.splice(index, 1);
  taskStates.splice(index, 1);
  showSubtasks();
  removeEmptyEditSubtaskInputNotice();
}

/**
 * Updates the icons for subtask inputs by replacing the content of the container with new SVG icons.
 * Retrieves the container element by its ID "subTaskSvgContainer" and updates its innerHTML with the rendered SVG icons.
 * @function changeSubtaskInputIcons
 * @author Christian Förster
 */

function changeSubtaskInputIcons() {
  let subTaskSvgContainer = document.getElementById("subTaskSvgContainer");
  subTaskSvgContainer.innerHTML = renderSubtaskInputIcons();
}

/**
 * Sets focus to the input field for adding subtasks by programmatically clicking on it and then focusing on it.
 * Retrieves the input element by its ID "subtask" and programmatically simulates a click event followed by focusing on the input field.
 * @function subtaskPlusIconSetFocus
 * @author Christian Förster
 */

function subtaskPlusIconSetFocus() {
  let input = document.getElementById("subtask");
  input.click();
  input.focus();
}
