function templateCard(task) {
  return `
      <div id="card${task.id}"  onclick="renderTaskOverlay(${task.id});" draggable="true" ondragstart="startDragging(${task.id}); rotateCard(${task.id})" class="board-card">
          ${templateCardTopContent(task)}
          <div class="board-progress">
              ${renderProgressBar(task)}
              <div>
                  <span>${renderProgressAmount(task)}</span>
              </div>
          </div>
          <div class="board-card-status">
              <div class="board-card-assignee">
                  ${renderCardAssignee(task)}
              </div>
              <div>
                  <img src="./assets/img/${task.prio}.png" alt="prio-low">
              </div>
          </div>
      </div>`;
}

function templateNoTask() {
  return `
      <div class="board-no-task">
          <span>No tasks To do</span>
      </div>`;
}

function templateCardTopContent(task) {
  return `
      <div class="board-card-topic" style="background-color:${checkCategory(task.category)}">
        <span>${task.category}</span>
        <div class="change-state-card" onclick="event.stopPropagation(); dragMenu(${task.id}); ">
          <img src="./assets/img/threedotsmenu.png" alt="dragmenu">
        </div>
      </div>

      <div id="drop-menu${task.id}" class="drop-menu d-none" onclick="event.stopPropagation();">
        <div id="drop-todo${task.id}" class="drop-menu-option" onclick="moveTo('todo');">
          <span>To do</span>
        </div>
        <div id="drop-inprogress${task.id}" class="drop-menu-option" onclick="moveTo('in-progress');">
          <span>In Progress</span>
        </div>
        <div id="drop-awaitfeedback${task.id}" class="drop-menu-option" onclick="moveTo('await-feedback')">
          <span>Await feedback</span>
        </div>
        <div id="drop-done${task.id}" class="drop-menu-option" onclick="moveTo('done')">
          <span>Done</span>
        </div>
      </div>

      <div class="board-card-content">
        <div class="board-card-content-title">
            <span>${task.title}</span>
        </div>
        <div class="max-lines">
            <span>${task.taskDescription}</span>
        </div>
      </div>`;
}

function templateCardAssignee(assignee, color) {
  return `<div class="assignee ${color}" >${assignee}</div>`;
}

function templateTaskOverlay(task) {
  return `
      <div class="task-overlay-top">
          <div class="board-card-topic" style="background-color:${checkCategory(task.category)}">
              <span>${task.category}</span>
          </div>
          <img src="./assets/img/Close.png" alt="close" onclick="closeOverlay()">
      </div>
      ${templateOverlayTopContent(task)}
      <div class="task-overlay-assigned">
          <span class="task-overlay-text task-overlay-text-fix">Assigned to:</span>
          ${renderOverlayAssignee(task)}
      </div>
      <div class="task-overlay-subtasks">
          <span class="task-overlay-text task-overlay-text-fix">Subtasks</span>
          <div id="overlay-subtask-container">
              ${renderSubtask(task)}
          </div>
      </div>
      ${templateOverlayMenu(task)}`;
}

function templateOverlayTopContent(task) {
  return `
      <span class="task-overlay-title">${task.title}</span>
      <span class="task-overlay-text">${task.taskDescription}</span>
      <div class="task-overlay-section">
          <span class="task-overlay-text task-overlay-text-fix">Due date:</span>
          <span class="task-overlay-text">${task.date}</span>
      </div>
      <div class="task-overlay-section">
          <span class="task-overlay-text task-overlay-text-fix">Priority:</span>
          <span class="task-overlay-text board-prio-pad">${task.prio} <img src="./assets/img/${task.prio}.png" alt=""></span>
      </div>`;
}

function templateOverlayAssignee(assignee, name, color) {
  return `
      <div class="task-overlay-assignee">
          <div class="assignee ${color}">${assignee}</div>
          <span>${name}</span>
      </div>`;
}

function templateOverlaySubtask(index, subtask, task, source) {
  return `
      <div class="task-subtask" onclick="checkedSubtask(${index}, ${task.id})">
          <img id="sub${index}" src="${source}">
          <span>${subtask}</span>
      </div>`;
}

function templateOverlayMenu(task) {
  return `
      <div class="overlay-menu">
        <div class="overlay-menu-content" onclick="deleteTask(${task.id})">
        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 18C2.95 18 2.47917 17.8042 2.0875 17.4125C1.69583 17.0208 1.5 16.55 1.5 16V3C1.21667 3 0.979167 2.90417 0.7875 2.7125C0.595833 2.52083 0.5 2.28333 0.5 2C0.5 1.71667 0.595833 1.47917 0.7875 1.2875C0.979167 1.09583 1.21667 1 1.5 1H5.5C5.5 0.716667 5.59583 0.479167 5.7875 0.2875C5.97917 0.0958333 6.21667 0 6.5 0H10.5C10.7833 0 11.0208 0.0958333 11.2125 0.2875C11.4042 0.479167 11.5 0.716667 11.5 1H15.5C15.7833 1 16.0208 1.09583 16.2125 1.2875C16.4042 1.47917 16.5 1.71667 16.5 2C16.5 2.28333 16.4042 2.52083 16.2125 2.7125C16.0208 2.90417 15.7833 3 15.5 3V16C15.5 16.55 15.3042 17.0208 14.9125 17.4125C14.5208 17.8042 14.05 18 13.5 18H3.5ZM3.5 3V16H13.5V3H3.5ZM5.5 13C5.5 13.2833 5.59583 13.5208 5.7875 13.7125C5.97917 13.9042 6.21667 14 6.5 14C6.78333 14 7.02083 13.9042 7.2125 13.7125C7.40417 13.5208 7.5 13.2833 7.5 13V6C7.5 5.71667 7.40417 5.47917 7.2125 5.2875C7.02083 5.09583 6.78333 5 6.5 5C6.21667 5 5.97917 5.09583 5.7875 5.2875C5.59583 5.47917 5.5 5.71667 5.5 6V13ZM9.5 13C9.5 13.2833 9.59583 13.5208 9.7875 13.7125C9.97917 13.9042 10.2167 14 10.5 14C10.7833 14 11.0208 13.9042 11.2125 13.7125C11.4042 13.5208 11.5 13.2833 11.5 13V6C11.5 5.71667 11.4042 5.47917 11.2125 5.2875C11.0208 5.09583 10.7833 5 10.5 5C10.2167 5 9.97917 5.09583 9.7875 5.2875C9.59583 5.47917 9.5 5.71667 9.5 6V13Z" fill="#2A3647"/>
        </svg>
        <span>Delete</span>
        </div>
        <img src="./assets/img/divider.png" alt="divider">
        <div class="overlay-menu-content" onclick="renderEditOverlay(${task.id})">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 17H3.9L12.525 8.375L11.125 6.975L2.5 15.6V17ZM16.8 6.925L12.55 2.725L13.95 1.325C14.3333 0.941667 14.8042 0.75 15.3625 0.75C15.9208 0.75 16.3917 0.941667 16.775 1.325L18.175 2.725C18.5583 3.10833 18.7583 3.57083 18.775 4.1125C18.7917 4.65417 18.6083 5.11667 18.225 5.5L16.8 6.925ZM15.35 8.4L4.75 19H0.5V14.75L11.1 4.15L15.35 8.4Z" fill="black"/>
          </svg>
          <span>Edit</span>
        </div>
      </div> `;
}

function templateProgressBar(progress) {
  return `
      <div class="task-progress-blank">
        <div class="task-progress" style="width:${progress}%"></div>
      </div>`;
}

function templateGhostCard() {
  return `<div id="ghostcard" class="ghost-card"></div>`;
}

function templateAddTaskBoard() {
  return `
      <div class="task-headline">
          <h1>Add Task</h1>
          <img src="./assets/img/Close.png" alt="close" onclick="closeOverlayAddTask()">
      </div>
      <form class="add-task-form" id="form" onkeypress="preventFormSubmit(event)" onsubmit="validateForm();return false">
          ${templateAddTaskLeft()}
          <div class="divider"></div>
          <div class="addtask-side-right" id="right-side-add">
          ${templateAddTaskDueDate()}
          <div class="input-container">
            <span>Prio</span>
            <div id="prio" class="prio-container">
              ${templateAddTaskPrioUrgent()}
              ${templateAddTaskPrioMedium()}
              ${templateAddTaskPrioLow()}
            </div>
          </div>
          ${templateAddTaskCategory()}
          ${templateAddTaskSubtask()}
          ${templateAddTaskButton()}
      </form>`;
}

function templateAddTaskLeft() {
  return `
      <div class="addtask-side-left">
          <div class="input-container">
              <label>Title <span class="required-icon">*</span></label>
              <input onclick="checkTitleInputField()" autocomplete="off" onkeyup="checkTitleInputField();getRequiredFormInputs()" placeholder="Enter a title" class="input-addtask input-focus-required" id="title" type="text" required="">          
              <span id="inputReqiuredSpanTitle" class="required-input-info d-none">this field is required</span>
          </div>
          <div class="input-container">
              <label>Description</label>
              <textarea name="Description" placeholder="Enter a Description" id="taskDescription" cols="30" rows="10"></textarea>
          </div>
          ${templateAddTaskAssignee()}
          <div class="required-info">
            <div class="required-info-wrapper">
              <div class="required-icon">*</div>
              This field is required
            </div>
          </div>
      </div>`;
}

function templateAddTaskAssignee() {
  return `
  <div class="input-container-contacts">
  <label>Assigned to</label>
  <input class="input-addtask assigned-to" id="contactAssignInput" autocomplete="off" onclick="showContacts();showChoosenContactsCircle()" onkeyup="filterContacts()" placeholder="Select contacts to assign" type="text" />
  <svg id="arrowContactInput" class="arrow" onclick="showContacts();  showChoosenContactsCircle()" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_135766_812" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_135766_812)">
      <path d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z" fill="#2A3647" />
    </g>
  </svg>
  <div id="contact-values" class="d-none contact-values"></div>
  <div class="show-selected-contacts-container">
    <div id="choosenContacts" class="choosen-contacts"></div>
  </div>
</div>
`;
}

function templateAddTaskDueDate() {
  return `
      <div class="input-container">
        <label>Due Date <span class="required-icon">*</span></label>
        <input onclick="checkDateInputField()" autocomplete="off" onkeyup="checkDateInputField();getRequiredFormInputs()" class="input-addtask-date-modified" id="date" type="text" maxlength="10" placeholder="dd/mm/yyyy" pattern="\\d{2}/\\d{2}/\\d{4}" required />
        <input type="date" id="dateNormal" autocomplete="off" class="input-addtask-datepicker pointer" pattern="\\d{2}/\\d{2}/\\d{4}" onchange="formatDateInput();updateDateFieldValue();getRequiredFormInputs()" />        <span id="inputReqiuredSpanDate" class="required-input-info d-none">this field is required</span>
        <div class="due-date-icon">
          <svg class="d-none" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_138036_1819" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.248535" width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_138036_1819)">
              <path d="M14.7485 18C14.0485 18 13.4569 17.7583 12.9735 17.275C12.4902 16.7917 12.2485 16.2 12.2485 15.5C12.2485 14.8 12.4902 14.2083 12.9735 13.725C13.4569 13.2417 14.0485 13 14.7485 13C15.4485 13 16.0402 13.2417 16.5235 13.725C17.0069 14.2083 17.2485 14.8 17.2485 15.5C17.2485 16.2 17.0069 16.7917 16.5235 17.275C16.0402 17.7583 15.4485 18 14.7485 18ZM5.24854 22C4.69854 22 4.2277 21.8042 3.83604 21.4125C3.44437 21.0208 3.24854 20.55 3.24854 20V6C3.24854 5.45 3.44437 4.97917 3.83604 4.5875C4.2277 4.19583 4.69854 4 5.24854 4H6.24854V3C6.24854 2.71667 6.34437 2.47917 6.53604 2.2875C6.7277 2.09583 6.9652 2 7.24854 2C7.53187 2 7.76937 2.09583 7.96104 2.2875C8.1527 2.47917 8.24854 2.71667 8.24854 3V4H16.2485V3C16.2485 2.71667 16.3444 2.47917 16.536 2.2875C16.7277 2.09583 16.9652 2 17.2485 2C17.5319 2 17.7694 2.09583 17.961 2.2875C18.1527 2.47917 18.2485 2.71667 18.2485 3V4H19.2485C19.7985 4 20.2694 4.19583 20.661 4.5875C21.0527 4.97917 21.2485 5.45 21.2485 6V20C21.2485 20.55 21.0527 21.0208 20.661 21.4125C20.2694 21.8042 19.7985 22 19.2485 22H5.24854ZM5.24854 20H19.2485V10H5.24854V20ZM5.24854 8H19.2485V6H5.24854V8Z" fill="#2A3647"/>
            </g>
          </svg>
        </div>
      </div>`;
}

function templateAddTaskPrioUrgent() {
  return `
      <input class="input-addtask" type="radio" id="urgent" name="priority" value="urgent" autocomplete="off" />
      <label for="urgent" class="radio-button" onclick="invertSvgFills('urgent'); handleClick('urgent')">Urgent
        <svg id="urgent-icon" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_156_987)">
            <path d="M19.2597 15.4464C19.0251 15.4468 18.7965 15.3719 18.6077 15.2328L10.3556 9.14965L2.10356 15.2328C1.98771 15.3184 1.85613 15.3803 1.71633 15.4151C1.57652 15.4498 1.43124 15.4567 1.28877 15.4354C1.14631 15.414 1.00944 15.3648 0.885997 15.2906C0.762552 15.2164 0.654943 15.1186 0.569314 15.0029C0.483684 14.8871 0.421712 14.7556 0.386936 14.6159C0.352159 14.4762 0.345259 14.331 0.366629 14.1887C0.409788 13.9012 0.565479 13.6425 0.799451 13.4697L9.70356 6.89926C9.89226 6.75967 10.1208 6.68433 10.3556 6.68433C10.5904 6.68433 10.819 6.75967 11.0077 6.89926L19.9118 13.4697C20.0977 13.6067 20.2356 13.7988 20.3057 14.0186C20.3759 14.2385 20.3747 14.4749 20.3024 14.6941C20.2301 14.9133 20.0904 15.1041 19.9031 15.2391C19.7159 15.3742 19.4907 15.4468 19.2597 15.4464Z" fill="#FF3D00"/>
            <path d="M19.2597 9.69733C19.0251 9.69774 18.7965 9.62289 18.6077 9.48379L10.3556 3.40063L2.10356 9.48379C1.86959 9.6566 1.57651 9.72945 1.28878 9.68633C1.00105 9.6432 0.742254 9.48762 0.569318 9.25383C0.396382 9.02003 0.323475 8.72716 0.366634 8.43964C0.409793 8.15213 0.565483 7.89352 0.799455 7.72072L9.70356 1.15024C9.89226 1.01065 10.1208 0.935303 10.3556 0.935303C10.5904 0.935303 10.819 1.01065 11.0077 1.15024L19.9118 7.72072C20.0977 7.85763 20.2356 8.04974 20.3057 8.26962C20.3759 8.4895 20.3747 8.72591 20.3024 8.94509C20.2301 9.16427 20.0904 9.35503 19.9031 9.49012C19.7159 9.62521 19.4907 9.69773 19.2597 9.69733Z" fill="#FF3D00"/>
          </g>
          <defs>
            <clipPath id="clip0_156_987">
              <rect width="20" height="14.5098" fill="white" transform="translate(0.355469 0.936768)"/>
            </clipPath>
          </defs>
        </svg>
      </label>`;
}

function templateAddTaskPrioMedium() {
  return `
      <input class="input-addtask" type="radio" id="medium" checked name="priority" value="medium" autocomplete="off" />
      <label for="medium" class="radio-button" onclick="invertSvgFills('medium');handleClick('medium')">Medium
        <svg id="medium-icon" width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_156_994)">
            <path d="M19.7596 7.91693H1.95136C1.66071 7.91693 1.38197 7.80063 1.17645 7.59362C0.970928 7.3866 0.855469 7.10584 0.855469 6.81308C0.855469 6.52032 0.970928 6.23955 1.17645 6.03254C1.38197 5.82553 1.66071 5.70923 1.95136 5.70923H19.7596C20.0502 5.70923 20.329 5.82553 20.5345 6.03254C20.74 6.23955 20.8555 6.52032 20.8555 6.81308C20.8555 7.10584 20.74 7.3866 20.5345 7.59362C20.329 7.80063 20.0502 7.91693 19.7596 7.91693Z" fill="#FFA800"/>
            <path d="M19.7596 2.67376H1.95136C1.66071 2.67376 1.38197 2.55746 1.17645 2.35045C0.970928 2.14344 0.855469 1.86267 0.855469 1.56991C0.855469 1.27715 0.970928 0.996386 1.17645 0.789374C1.38197 0.582363 1.66071 0.466064 1.95136 0.466064L19.7596 0.466064C20.0502 0.466064 20.329 0.582363 20.5345 0.789374C20.74 0.996386 20.8555 1.27715 20.8555 1.56991C20.8555 1.86267 20.74 2.14344 20.5345 2.35045C20.329 2.55746 20.0502 2.67376 19.7596 2.67376Z" fill="#FFA800"/>
          </g>
          <defs>
            <clipPath id="clip0_156_994">
              <rect width="20" height="7.45098" fill="white" transform="translate(0.855469 0.466064)"/>
            </clipPath>
          </defs>
        </svg>
      </label>`;
}

function templateAddTaskPrioLow() {
  return `
      <input class="input-addtask" type="radio" id="low" name="priority" value="low" />
      <label for="low" class="radio-button" onclick="invertSvgFills('low');handleClick('low')">Low
        <svg id="low-icon" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.8555 9.69779C10.6209 9.69819 10.3923 9.62335 10.2035 9.48427L1.30038 2.91453C1.18454 2.82898 1.0867 2.72146 1.01245 2.59812C0.938193 2.47478 0.888977 2.33803 0.867609 2.19569C0.824455 1.90821 0.897354 1.61537 1.07027 1.3816C1.24319 1.14782 1.50196 0.992265 1.78965 0.949143C2.07734 0.906021 2.3704 0.978866 2.60434 1.15165L10.8555 7.23414L19.1066 1.15165C19.2224 1.0661 19.354 1.00418 19.4938 0.969432C19.6336 0.934685 19.7788 0.927791 19.9213 0.949143C20.0637 0.970495 20.2006 1.01967 20.324 1.09388C20.4474 1.16808 20.555 1.26584 20.6407 1.3816C20.7263 1.49735 20.7883 1.62882 20.823 1.7685C20.8578 1.90818 20.8647 2.05334 20.8433 2.19569C20.822 2.33803 20.7727 2.47478 20.6985 2.59812C20.6242 2.72146 20.5264 2.82898 20.4106 2.91453L11.5075 9.48427C11.3186 9.62335 11.0901 9.69819 10.8555 9.69779Z" fill="#7AE229"/>
          <path d="M10.8555 15.4463C10.6209 15.4467 10.3923 15.3719 10.2035 15.2328L1.30038 8.66307C1.06644 8.49028 0.910763 8.2317 0.867609 7.94422C0.824455 7.65674 0.897354 7.3639 1.07027 7.13013C1.24319 6.89636 1.50196 6.7408 1.78965 6.69768C2.07734 6.65456 2.3704 6.7274 2.60434 6.90019L10.8555 12.9827L19.1066 6.90019C19.3405 6.7274 19.6336 6.65456 19.9213 6.69768C20.209 6.7408 20.4678 6.89636 20.6407 7.13013C20.8136 7.3639 20.8865 7.65674 20.8433 7.94422C20.8002 8.2317 20.6445 8.49028 20.4106 8.66307L11.5075 15.2328C11.3186 15.3719 11.0901 15.4467 10.8555 15.4463Z" fill="#7AE229"/>
        </svg>
      </label>`;
}

function templateAddTaskCategory() {
  return `
      <div class="input-container">
        <label for="category">Category <span class="required-icon">*</span></label>
        <select class="custom-select" id="category" name="category" onchange="getRequiredFormInputs()" autocomplete="off">
          <option value="" disabled selected>Select a task category</option>
          <option value="Technical Task">Technical Task</option>
          <option value="User Story">User Story</option>
        </select>
      </div> `;
}

function templateAddTaskSubtask() {
  return `
      <div class="input-container">
      <label for="subtask">Subtask</label>
      <div class="add-subtask">
      <input class="input-addtask" name="subtask" id="subtask" type="text" placeholder="Add  new subtask" minlength="5" maxlength="33" onkeypress="checkKeyPressAndPushSubtask(event)" onclick="changeSubtaskInputIcons()" autocomplete="off" onkeyup="getInput()" />        <div id="subTaskSvgContainer" class="svg-container">
          <svg class="svg-plusicon" id="subTaskPlusIcon" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_136369_4669" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.248535" width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_136369_4669)">
              <path d="M11.2485 13H6.24854C5.9652 13 5.7277 12.9042 5.53604 12.7125C5.34437 12.5208 5.24854 12.2833 5.24854 12C5.24854 11.7167 5.34437 11.4792 5.53604 11.2875C5.7277 11.0958 5.9652 11 6.24854 11H11.2485V6C11.2485 5.71667 11.3444 5.47917 11.536 5.2875C11.7277 5.09583 11.9652 5 12.2485 5C12.5319 5 12.7694 5.09583 12.961 5.2875C13.1527 5.47917 13.2485 5.71667 13.2485 6V11H18.2485C18.5319 11 18.7694 11.0958 18.961 11.2875C19.1527 11.4792 19.2485 11.7167 19.2485 12C19.2485 12.2833 19.1527 12.5208 18.961 12.7125C18.7694 12.9042 18.5319 13 18.2485 13H13.2485V18C13.2485 18.2833 13.1527 18.5208 12.961 18.7125C12.7694 18.9042 12.5319 19 12.2485 19C11.9652 19 11.7277 18.9042 11.536 18.7125C11.3444 18.5208 11.2485 18.2833 11.2485 18V13Z" fill="#2A3647"/>
            </g>
          </svg>
        </div>
      </div>
        <span id="inputReqiuredSpanSubtask" class="required-input-info d-none">Please enter a value to create or edit a subtask</span>
      <div>
        <div id="showSubtasks" class="show-subtasks"></div>
      </div>`;
}

function templateAddTaskButton() {
  return `
      <div class="button-container">
        <button class="add-task-btn pointer btn-wht btn-color-bk border-1px" type="button" onclick="clearBoardAddTask()" >Clear
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.24959 6.99984L11.4926 12.2428M1.00659 12.2428L6.24959 6.99984L1.00659 12.2428ZM11.4926 1.75684L6.24859 6.99984L11.4926 1.75684ZM6.24859 6.99984L1.00659 1.75684L6.24859 6.99984Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button id="submitButton" type="submit" class="add-task-btn" disabled>Create Task
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.79923 9.15L14.2742 0.675C14.4742 0.475 14.7117 0.375 14.9867 0.375C15.2617 0.375 15.4992 0.475 15.6992 0.675C15.8992 0.875 15.9992 1.1125 15.9992 1.3875C15.9992 1.6625 15.8992 1.9 15.6992 2.1L6.49923 11.3C6.29923 11.5 6.0659 11.6 5.79923 11.6C5.53256 11.6 5.29923 11.5 5.09923 11.3L0.79923 7C0.59923 6.8 0.503397 6.5625 0.51173 6.2875C0.520064 6.0125 0.62423 5.775 0.82423 5.575C1.02423 5.375 1.26173 5.275 1.53673 5.275C1.81173 5.275 2.04923 5.375 2.24923 5.575L5.79923 9.15Z" fill="white"/>
          </svg>
        </button>
      </div>`;
}

function templateEditOverlay(task) {
  return `
      <div class="task-overlay-edit-top">
        <img src="./assets/img/Close.png" alt="close" onclick="closeOverlay()">
      </div>
      <div class="scrollbar">
        <div class="task-overlay-edit-content">
          ${templateEditOverlayTitleDescription(task)}
          ${templateEditOverlayDueDate(task)}

          <div class="input-container-edit">
            <span>Prio</span>
            <div id="prio" class="prio-container">
              ${templateEditOverlayPrioUrgent()}
              ${templateEditOverlayPrioMedium()}
              ${templateEditOverlayPrioLow()}
            </div>
          </div>
          ${templateEditOverlayAssignees()}
          <div class="input-container">
             ${templateEditOverlaySubtasks()}
            <div>
              <div id="showSubtasks" class="show-subtasks"></div>
            </div>
          </div>
        </div>
      </div>
      ${TemplateEditOverlayCheckButton(task)}
  `;
}

function templateEditOverlayTitleDescription(task) {
  return `
      <div class="input-container-edit">
        <span>Title</span>
        <input class="input-addtask-edit" required id="title" type="text"  value="${task.title}"/>
      </div>
      <div class="input-container-edit">
        <span>Description</span>
        <textarea required name="Description" id="taskDescription" cols="30" rows="10">${task.taskDescription}</textarea>
      </div> `;
}

function templateEditOverlayDueDate(task) {
  return `
      <div class="input-container-edit">
        <span>Due Date</span>
        <input onclick="checkDateInputField()" onkeyup="checkDateInputField()" value="${task.date}" class="input-addtask-date-modified" id="date" type="text" maxlength="10" placeholder="dd/mm/yyyy" pattern="\d{2}/\d{2}/\d{4}" required />
        <input type="date" id="dateNormal" class="input-addtask-datepicker edit-datepicker" pattern="\d{2}/\d{2}/\d{4}" onchange="formatDateInput();updateDateFieldValue()" />
        <div class="due-date-icon">
          <svg class="d-none" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_138036_1819" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.248535" width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_138036_1819)">
              <path d="M14.7485 18C14.0485 18 13.4569 17.7583 12.9735 17.275C12.4902 16.7917 12.2485 16.2 12.2485 15.5C12.2485 14.8 12.4902 14.2083 12.9735 13.725C13.4569 13.2417 14.0485 13 14.7485 13C15.4485 13 16.0402 13.2417 16.5235 13.725C17.0069 14.2083 17.2485 14.8 17.2485 15.5C17.2485 16.2 17.0069 16.7917 16.5235 17.275C16.0402 17.7583 15.4485 18 14.7485 18ZM5.24854 22C4.69854 22 4.2277 21.8042 3.83604 21.4125C3.44437 21.0208 3.24854 20.55 3.24854 20V6C3.24854 5.45 3.44437 4.97917 3.83604 4.5875C4.2277 4.19583 4.69854 4 5.24854 4H6.24854V3C6.24854 2.71667 6.34437 2.47917 6.53604 2.2875C6.7277 2.09583 6.9652 2 7.24854 2C7.53187 2 7.76937 2.09583 7.96104 2.2875C8.1527 2.47917 8.24854 2.71667 8.24854 3V4H16.2485V3C16.2485 2.71667 16.3444 2.47917 16.536 2.2875C16.7277 2.09583 16.9652 2 17.2485 2C17.5319 2 17.7694 2.09583 17.961 2.2875C18.1527 2.47917 18.2485 2.71667 18.2485 3V4H19.2485C19.7985 4 20.2694 4.19583 20.661 4.5875C21.0527 4.97917 21.2485 5.45 21.2485 6V20C21.2485 20.55 21.0527 21.0208 20.661 21.4125C20.2694 21.8042 19.7985 22 19.2485 22H5.24854ZM5.24854 20H19.2485V10H5.24854V20ZM5.24854 8H19.2485V6H5.24854V8Z" fill="#2A3647"/>
            </g>
          </svg>
        </div>
      </div>`;
}

function templateEditOverlayPrioUrgent() {
  return `
      <input class="input-addtask" type="radio" id="urgent-edit" name="priority-edit" value="urgent" />
      <label for="urgent-edit" class="radio-button" id="urgent-radio" onclick="invertSvgFillsEdit('urgent'); handleClick('urgent')">Urgent
        <svg id="urgent-icon-edit" width="21" height="16" viewBox="0 0 21 16" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_156_987)">
            <path d="M19.2597 15.4464C19.0251 15.4468 18.7965 15.3719 18.6077 15.2328L10.3556 9.14965L2.10356 15.2328C1.98771 15.3184 1.85613 15.3803 1.71633 15.4151C1.57652 15.4498 1.43124 15.4567 1.28877 15.4354C1.14631 15.414 1.00944 15.3648 0.885997 15.2906C0.762552 15.2164 0.654943 15.1186 0.569314 15.0029C0.483684 14.8871 0.421712 14.7556 0.386936 14.6159C0.352159 14.4762 0.345259 14.331 0.366629 14.1887C0.409788 13.9012 0.565479 13.6425 0.799451 13.4697L9.70356 6.89926C9.89226 6.75967 10.1208 6.68433 10.3556 6.68433C10.5904 6.68433 10.819 6.75967 11.0077 6.89926L19.9118 13.4697C20.0977 13.6067 20.2356 13.7988 20.3057 14.0186C20.3759 14.2385 20.3747 14.4749 20.3024 14.6941C20.2301 14.9133 20.0904 15.1041 19.9031 15.2391C19.7159 15.3742 19.4907 15.4468 19.2597 15.4464Z" fill="#FF3D00"/>
            <path d="M19.2597 9.69733C19.0251 9.69774 18.7965 9.62289 18.6077 9.48379L10.3556 3.40063L2.10356 9.48379C1.86959 9.6566 1.57651 9.72945 1.28878 9.68633C1.00105 9.6432 0.742254 9.48762 0.569318 9.25383C0.396382 9.02003 0.323475 8.72716 0.366634 8.43964C0.409793 8.15213 0.565483 7.89352 0.799455 7.72072L9.70356 1.15024C9.89226 1.01065 10.1208 0.935303 10.3556 0.935303C10.5904 0.935303 10.819 1.01065 11.0077 1.15024L19.9118 7.72072C20.0977 7.85763 20.2356 8.04974 20.3057 8.26962C20.3759 8.4895 20.3747 8.72591 20.3024 8.94509C20.2301 9.16427 20.0904 9.35503 19.9031 9.49012C19.7159 9.62521 19.4907 9.69773 19.2597 9.69733Z" fill="#FF3D00"/>
          </g>
          <defs>
            <clipPath id="clip0_156_987">
              <rect width="20" height="14.5098" fill="white" transform="translate(0.355469 0.936768)" />
            </clipPath>
          </defs>
        </svg>
      </label>`;
}

function templateEditOverlayPrioMedium() {
  return `
      <input class="input-addtask" type="radio" id="medium-edit" name="priority-edit" value="medium" />
      <label for="medium-edit" class="radio-button" id="medium-radio" onclick="invertSvgFillsEdit('medium');handleClick('medium')">Medium
        <svg id="medium-icon-edit" width="21" height="8" viewBox="0 0 21 8" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_156_994)">
            <path d="M19.7596 7.91693H1.95136C1.66071 7.91693 1.38197 7.80063 1.17645 7.59362C0.970928 7.3866 0.855469 7.10584 0.855469 6.81308C0.855469 6.52032 0.970928 6.23955 1.17645 6.03254C1.38197 5.82553 1.66071 5.70923 1.95136 5.70923H19.7596C20.0502 5.70923 20.329 5.82553 20.5345 6.03254C20.74 6.23955 20.8555 6.52032 20.8555 6.81308C20.8555 7.10584 20.74 7.3866 20.5345 7.59362C20.329 7.80063 20.0502 7.91693 19.7596 7.91693Z" fill="#FFA800" />
            <path d="M19.7596 2.67376H1.95136C1.66071 2.67376 1.38197 2.55746 1.17645 2.35045C0.970928 2.14344 0.855469 1.86267 0.855469 1.56991C0.855469 1.27715 0.970928 0.996386 1.17645 0.789374C1.38197 0.582363 1.66071 0.466064 1.95136 0.466064L19.7596 0.466064C20.0502 0.466064 20.329 0.582363 20.5345 0.789374C20.74 0.996386 20.8555 1.27715 20.8555 1.56991C20.8555 1.86267 20.74 2.14344 20.5345 2.35045C20.329 2.55746 20.0502 2.67376 19.7596 2.67376Z" fill="#FFA800" />
          </g>
          <defs>
            <clipPath id="clip0_156_994">
              <rect width="20" height="7.45098" fill="white" transform="translate(0.855469 0.466064)" />
            </clipPath>
          </defs>
        </svg>
      </label>`;
}

function templateEditOverlayPrioLow() {
  return `
      <input class="input-addtask" type="radio" id="low-edit" name="priority-edit" value="low" />
      <label for="low-edit" class="radio-button" id="low-radio" onclick="invertSvgFillsEdit('low');handleClick('low')">Low
        <svg id="low-icon-edit" width="21" height="16" viewBox="0 0 21 16" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.8555 9.69779C10.6209 9.69819 10.3923 9.62335 10.2035 9.48427L1.30038 2.91453C1.18454 2.82898 1.0867 2.72146 1.01245 2.59812C0.938193 2.47478 0.888977 2.33803 0.867609 2.19569C0.824455 1.90821 0.897354 1.61537 1.07027 1.3816C1.24319 1.14782 1.50196 0.992265 1.78965 0.949143C2.07734 0.906021 2.3704 0.978866 2.60434 1.15165L10.8555 7.23414L19.1066 1.15165C19.2224 1.0661 19.354 1.00418 19.4938 0.969432C19.6336 0.934685 19.7788 0.927791 19.9213 0.949143C20.0637 0.970495 20.2006 1.01967 20.324 1.09388C20.4474 1.16808 20.555 1.26584 20.6407 1.3816C20.7263 1.49735 20.7883 1.62882 20.823 1.7685C20.8578 1.90818 20.8647 2.05334 20.8433 2.19569C20.822 2.33803 20.7727 2.47478 20.6985 2.59812C20.6242 2.72146 20.5264 2.82898 20.4106 2.91453L11.5075 9.48427C11.3186 9.62335 11.0901 9.69819 10.8555 9.69779Z"
            fill="#7AE229" />
          <path
            d="M10.8555 15.4463C10.6209 15.4467 10.3923 15.3719 10.2035 15.2328L1.30038 8.66307C1.06644 8.49028 0.910763 8.2317 0.867609 7.94422C0.824455 7.65674 0.897354 7.3639 1.07027 7.13013C1.24319 6.89636 1.50196 6.7408 1.78965 6.69768C2.07734 6.65456 2.3704 6.7274 2.60434 6.90019L10.8555 12.9827L19.1066 6.90019C19.3405 6.7274 19.6336 6.65456 19.9213 6.69768C20.209 6.7408 20.4678 6.89636 20.6407 7.13013C20.8136 7.3639 20.8865 7.65674 20.8433 7.94422C20.8002 8.2317 20.6445 8.49028 20.4106 8.66307L11.5075 15.2328C11.3186 15.3719 11.0901 15.4467 10.8555 15.4463Z"
            fill="#7AE229" />
        </svg>
      </label>`;
}

function templateEditOverlayAssignees() {
  return `
      <div>
        <div class="input-container-contacts">
          <span class="contacts-span">Assigned to</span>
          <input class="input-addtask" id="contactAssignInput" onclick="showContacts();showChoosenContactsCircle()" onkeyup="filterContacts()" type="text" />
          <svg id="arrowContactInput" class="arrow" onclick="showContacts();  showChoosenContactsCircle()" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_135766_812" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_135766_812)">
              <path d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z" fill="#2A3647" />
            </g>
          </svg>
        </div>
        <div id="contact-values" class="d-none contact-values contact-values-edit"></div>
        <div class="show-selected-contacts-container-edit">
          <div id="choosenContacts" class="choosen-contacts-edit"></div>
        </div>
      </div>`;
}

function templateEditOverlaySubtasks() {
  return `
      <label class="label-subtask" for="subtask">Subtask</label>
      <div class="add-subtask">
        <input class="input-addtask" name="subtask" id="subtask" type="text" minlength="5"
          onclick="changeSubtaskInputIcons()" onkeypress=" checkKeyPressAndPushSubtask(event);checkSubtasknputField()"  onkeyup="getInput()" />
        <div id="subTaskSvgContainer" class="svg-container">
          <svg class="svg-plusicon" id="subTaskPlusIcon" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_136369_4669" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.248535" width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_136369_4669)">
              <path d="M11.2485 13H6.24854C5.9652 13 5.7277 12.9042 5.53604 12.7125C5.34437 12.5208 5.24854 12.2833 5.24854 12C5.24854 11.7167 5.34437 11.4792 5.53604 11.2875C5.7277 11.0958 5.9652 11 6.24854 11H11.2485V6C11.2485 5.71667 11.3444 5.47917 11.536 5.2875C11.7277 5.09583 11.9652 5 12.2485 5C12.5319 5 12.7694 5.09583 12.961 5.2875C13.1527 5.47917 13.2485 5.71667 13.2485 6V11H18.2485C18.5319 11 18.7694 11.0958 18.961 11.2875C19.1527 11.4792 19.2485 11.7167 19.2485 12C19.2485 12.2833 19.1527 12.5208 18.961 12.7125C18.7694 12.9042 18.5319 13 18.2485 13H13.2485V18C13.2485 18.2833 13.1527 18.5208 12.961 18.7125C12.7694 18.9042 12.5319 19 12.2485 19C11.9652 19 11.7277 18.9042 11.536 18.7125C11.3444 18.5208 11.2485 18.2833 11.2485 18V13Z" fill="#2A3647" />
            </g>
          </svg>
        </div>
      </div>
        <span id="inputReqiuredSpanSubtask" class="required-input-info d-none">Please enter a value to create or edit a subtask</span>
      `;
}

function TemplateEditOverlayCheckButton(task) {
  return `
      <div class="edit-check-button" onclick="editTask(${task.id})">
        <span>Ok</span>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.23282 9.04673L14.7078 0.571728C14.9078 0.371729 15.1453 0.271729 15.4203 0.271729C15.6953 0.271729 15.9328 0.371729 16.1328 0.571728C16.3328 0.771728 16.4328 1.00923 16.4328 1.28423C16.4328 1.55923 16.3328 1.79673 16.1328 1.99673L6.93282 11.1967C6.73282 11.3967 6.49949 11.4967 6.23282 11.4967C5.96616 11.4967 5.73282 11.3967 5.53282 11.1967L1.23282 6.89673C1.03282 6.69673 0.936991 6.45923 0.945324 6.18423C0.953658 5.90923 1.05782 5.67173 1.25782 5.47173C1.45782 5.27173 1.69532 5.17173 1.97032 5.17173C2.24532 5.17173 2.48282 5.27173 2.68282 5.47173L6.23282 9.04673Z" fill="white"/>
        </svg>
      </div> `;
}
