logedInUser = [];


/**
 * init function to load the registered contacts
 *
 * @author Eugen Ferchow
 */
async function initRegisteredContacts() {
  userData = await getItemContacts('userData');
}


/**
 * 
 * @returns {string}
 * check input password and email to login user or show an alert if password or email are wrong
 * if login succfully, push the input in logedInUser Array and forward the user to summary.html
 */
async function logIn() {
  event.preventDefault(); // Kein Standardverhalten des Formulars
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let loggedIn = false;

  const response = await authenticate(username, password);

  if (response.status === 202) {
    let user = await response.json()
    loggedIn = true;
    logedInUser = user;
    saveRememberMe();
    setLocalStorage();
    window.location.href = "./summary.html";
    return;
  }
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';

  passOutlineLogIn();
}

function setLocalStorage() {
  localStorage.setItem("username", logedInUser.username)
  localStorage.setItem("email", logedInUser.email)
  localStorage.setItem("token", logedInUser.token)
}


/**
 * remember me function
 * if user checked the checkmark field, save user password and email in localStorage
 */
function saveRememberMe() {
  let rememberMe = document.getElementById('rememberMe').checked;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  console.log(rememberMe);

  if (rememberMe) {
    localStorage.setItem('rememberedUsername', username);
    localStorage.setItem('rememberedPassword', password);
  } else {
    localStorage.removeItem('rememberedUsername');
    localStorage.removeItem('rememberedPassword');
  }
}


/**
 * load the user password from local Storage and put it in the input field
 */
function loadRememberMe() {
  let rememberedUsername = localStorage.getItem('rememberedUsername');
  let rememberedPassword = localStorage.getItem('rememberedPassword');
  if (rememberedUsername && rememberedPassword) {
    document.getElementById("username").value = rememberedUsername;
    document.getElementById("password").value = rememberedPassword;
  }
}


/**
 * 
 * @returns {boolean}
 * if all input fields are filled and the checkbox are checked, enable the sign up button, otherweise disable 
 */
function showRegisterButton() {
  let checkedBox = document.getElementById('registerCheckbox').checked;
  let name = document.getElementById('name-reg').value;
  let email = document.getElementById('email-reg').value;
  let password = document.getElementById('password-reg').value;
  let btn = document.getElementById('registerBtn');
  let confirmPassword = document.getElementById('rep-password-reg').value;
  if (!name || !email || !password || !confirmPassword || !checkedBox) {
    btn.disabled = true;
    return
  }
  btn.disabled = false;
}


/**
 * if user sign up succesfully display a feedback message and redirect user to index.html
 */
function showRegistrationAnimation() {
  let blackCont = document.getElementById('feedback-black-container');
  let feedback = document.getElementById('feedback-registration');
  blackCont.style.display = 'flex';
  feedback.style.display = 'block';
  feedback.style.top = '50%';
  setTimeout(() => {
    window.location.href = './index.html';;
  }, 1000);
}


/**
 * function to highlight if the passwords in signup dont match
 * @author Kevin Mueller
 */
function passOutline() {
  let passwordReg = document.getElementById('password-reg');
  let repPasswordReg = document.getElementById('rep-password-reg');
  if (passwordReg.value != repPasswordReg.value) {
    passwordReg.style.border = '2px solid #ff8190';
    repPasswordReg.style.border = '2px solid #ff8190';
    document.getElementById('inputRequired').classList.remove('d-none')
  }
}

/**
 * function to highlight if the passwords in signup dont match
 * @author Kevin Mueller
 */
function passOutlineLogIn() {
  let passwordReg = document.getElementById('email');
  let repPasswordReg = document.getElementById('password');
  if (passwordReg.value != repPasswordReg) {
    passwordReg.style.border = '2px solid #ff8190';
    repPasswordReg.style.border = '2px solid #ff8190';
    document.getElementById('inputRequiredLogIn').classList.remove('d-none')
  }
}