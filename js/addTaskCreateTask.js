/**
 * Asynchronously adds a task based on the provided index.
 * @async
 * @function addTask
 * @param {number} index - The index of the task to be added.
 * @returns {Promise<void>}
 * @author Christian Förster & Kevin Müller
 */

async function addTask(index) {
  let title = document.getElementById("title");
  let taskDescription = document.getElementById("taskDescription");
  const dateRaw = document.getElementById("date").value;
  let date = transformDate(dateRaw);
  let prio = getPriorityValue(index);
  let category = document.getElementById("category");

  let task = await createTaskObject(title.value, taskDescription.value, date, prio, category.value, index);

  if (index !== undefined) {
    updateExistingTask(index, task[0]);
  } else {
    addNewTask(task[0]);
  }

  clearCurrentTask();
  handleLocation(index);
}

function transformDate(date) {
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!datePattern.test(date)) {
    return date
  }
  const [day, month, year] = date.split('/');
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  return formattedDate;
}

/**
 * Retrieves the priority value from the selected priority input.
 * @function getPriorityValue
 * @returns {string} The priority value.
 * @author Christian Förster
 */

function getPriorityValue(index) {
  let prioInputs = document.getElementsByName("priority");
  let prioInputsEdit = document.getElementsByName("priority-edit");
  let prio;

  if (index != undefined) {
    for (let i = 0; i < prioInputsEdit.length; i++) {
      if (prioInputsEdit[i].checked) {
        prio = prioInputsEdit[i].value;
      }
    }
  } else {
    for (let i = 0; i < prioInputs.length; i++) {
      if (prioInputs[i].checked) {
        prio = prioInputs[i].value;
      }
    }
  }
  return prio;
}

/**
 * Creates a task object with the provided details.
 * @function createTaskObject
 * @param {number} id - The ID of the task.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The date of the task.
 * @param {string} prio - The priority of the task.
 * @param {string} category - The category of the task.
 * @param {number} index - The index of the task.
 * @returns {object[]} An array containing the task object.
 * @author Christian Förster & Kevin Müller
 */

function createTaskObject(title, description, date, prio, category, index) {
  let arrangeSub = [];
  subtasks.forEach((element, indexSub) => {
    if (index === undefined) {
      arrangeSub.push({ task_description: element, task_state: false })
    } else {
      if (allTasks[index].subtasks[indexSub]) {
        arrangeSub.push({ id: allTasks[index].subtasks[indexSub].id, task_description: element, task_state: allTasks[index].subtasks[indexSub].task_state })
      } else {
        arrangeSub.push({ task_description: element, task_state: false })
      }
    }
  });

  return [
    {
      category: category,
      title: title,
      description: description,
      duedate: date,
      priority: prio,
      assigned: contactIds,
      in_progress: false,
      await_feedback: false,
      done: false,
      initials: initials,
      subtasks: arrangeSub,
    },
  ];
}

/**
 * Asynchronously updates an existing task with the provided index and task object.
 * @async
 * @function updateExistingTask
 * @param {number} index - The index of the task to be updated.
 * @param {object[]} task - The updated task object.
 * @returns {Promise<void>}
 * @author Kevin Müller
 */

async function updateExistingTask(index, task) {
  let assigneeIds = structuredClone(finalContactData).map(task => task.id)
  let categoryPlaceholder = allTasks[index].category;
  let idPlaceholder = allTasks[index].id;
  let statusPlaceholder = getPriorityValue(index);
  allTasks[index] = task;
  allTasks[index].assigned = assigneeIds
  allTasks[index].id = idPlaceholder;
  allTasks[index].priority = statusPlaceholder;
  allTasks[index].category = categoryPlaceholder;

  await updateTask(structuredClone(allTasks[index]), localStorage.getItem("token"), allTasks[index].id, index)
  allTasks[index].assigned = finalContactData

  setTimeout(() => {
    initBoard();
  }, 300);

}

/**
 * Asynchronously adds a new task to the tasks array and updates the storage.
 * @async
 * @function addNewTask
 * @param {object[]} task - The new task object to be added.
 * @author Christian Förster
 */

async function addNewTask(task) {
  await newTask(task, localStorage.getItem("token"))
}

/**
 * Handles the location based on the current URL and task index.
 * @function handleLocation
 * @param {number} index - The index of the task.
 * @author Christian Förster
 */

function handleLocation(index) {
  if (window.location.href == "https://join.kevin-mueller-dev.de/board.html" && index == undefined) {
    subtasks = [];
    closeOverlayAddTask(true);
  }
  if (window.location.href == "http://127.0.0.1:5500/board.html") {
    subtasks = [];
    closeOverlayAddTask(true);
    return
  }
  if (window.location.href == "https://join.kevin-mueller-dev.de/add-task.html" || "http://127.0.0.1:5500/add-task.html") {
    translateTaskAddedElementAndRedirect();
  }
}

/**
 * Translates and transforms the task added element and redirects to the board page after a delay.
 * @function translateTaskAddedElementAndRedirect
 * @author Christian Förster
 */

function translateTaskAddedElementAndRedirect() {
  let element = document.getElementById("taskAdded");
  element.classList.remove("d-none");
  element.style.transition = "transform 0.5s ease";
  element.style.transform = "translateY(0)";
  element.style.top = "50%";
  element.style.left = "50%";
  element.style.transform = "translate(-50%, -50%)";
  setTimeout(() => {
    window.location.href = "./board.html";
  }, 2000);
}

/**
 * Generates the task state array based on the provided task index.
 * @function generateTaskState
 * @param {number} index - The index of the task.
 * @returns {boolean[]} The generated task state array.
 * @author Kevin Müller
 */

function generateTaskState(index) {
  let taskstateArray = [];
  for (let i = 0; i < subtasks.length; i++) {
    const element = false;
    if (index != undefined) {
      const value = allTasks[index].subtask.taskstate[i];
      if (value === true) {
        taskstateArray.push(value);
      } else {
        taskstateArray.push(element);
      }
    } else {
      taskstateArray.push(element);
    }
  }
  return taskstateArray;
}
