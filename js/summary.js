let urgentDates = [];
let summaryData = [];


/**
 * init function to load the content and reset global variables
 *
 * @author Eugen Ferchow
 */
async function renderSummeryTasks() {
    const isLoggedIn = localStorage.getItem("token");
    logedInUser = localStorage.getItem("username");
    summaryData = await getSummary(isLoggedIn);

    if (!Boolean(isLoggedIn)) {
        navigateToIndex();
    };

    tasksInBoard();
    tasksInProgress();
    tasksToDo();
    tasksAwaitingFeedback()
    tasksDone();
    tasksUrgent();
    renderLogedUser(logedInUser);
    userGreetings();
    greetingResponsive();
}






/**
 * render amount of tasks depent on length of the the Array
 */
function tasksInBoard() {
    let tasksInBoard = document.getElementById('amount_of_tasks_in_board');
    tasksInBoard.innerHTML = summaryData.total_tasks;
}


/**
 * render amount of tasks in progress depent on the counter.
 */
function tasksInProgress() {
    let tasksInProgress = document.getElementById('tasks_in_progress');
    tasksInProgress.innerHTML = summaryData.in_progress;

}


/**
 * render amount of tasks in awaiting for feedback depent on the counter.
 */
function tasksAwaitingFeedback() {
    let tasksAwaitingFeedback = document.getElementById('tasks_awaiting_feedback');
    tasksAwaitingFeedback.innerHTML = summaryData.await_feedback;
}


/**
 * render amount of tasks to do depent on the counter.
 */
function tasksToDo() {
    let tasksToDo = document.getElementById('tasks_number_to_do');
    tasksToDo.innerHTML = summaryData.todo;
}


/**
 * render amount done tasks on the counter.
 */
function tasksDone() {
    let tasksDone = document.getElementById('tasks_number_done');
    tasksDone.innerHTML = summaryData.done
}


/**
 * render amount of urgent tasks depent on the counter.
 * show the next urgent date in the right format (month day, year) with function showDateInRightFormat and sort dates
 */
function tasksUrgent() {
    let urgentTasks = document.getElementById('tasks_number_urgent');
    let nextUrgentDate = document.getElementById('next_urgent_task_date');
    urgentTasks.innerHTML = summaryData.urgent
    nextUrgentDate.innerHTML = summaryData.urgent_date;
}




/**
 * render greetings with name and lastname and show the greeting message depent on time 
 * with the GreetingDependTime function
 */
function userGreetings() {
    let greetSummaryMain = document.getElementById('greeting-depent-time');
    let name = document.getElementById('logedInName');
    if (logedInUser == "Guest") {
        greetSummaryMain.innerHTML = `${GreetingDependTime()}`;
        name.innerHTML = logedInUser;
    }
    else {
        greetSummaryMain.innerHTML = `${GreetingDependTime()}`;
        name.innerHTML = logedInUser;
    }
}


/**
 * show greeting message on mobile phones in width size 660 or less depent on time and username
 */
function greetingResponsive() {
    let greetingContainer = document.getElementById('greeting-main-cont-responsive');
    let greeting = document.getElementById('greetings-resposive-user');
    if (window.innerWidth <= 660) {
        greetingContainer.style.display = 'flex';
        if (logedInUser[0].name == "Guest") {
            greeting.innerHTML = `${GreetingDependTime()}`;
        }
        else {
            greeting.innerHTML = `${GreetingDependTime()}, <br> <span class="greetingNameMobile"> ${logedInUser[0].name} ${logedInUser[0].lastname} </span>`
        }
        setTimeout(() => {
            greetingContainer.style.display = 'none';
        }, 2000);
    }
}


/**
 * 
 * @returns {string}
 * show a greeting message depent on time 
 */
function GreetingDependTime() {
    let now = new Date();
    let hour = now.getHours()
    if (hour < 11) {
        return "Good morning"
    } else if (hour < 18) {
        return "Good afternoon";
    } else if (hour < 24) {
        return "Good evening";
    }
}
