let contacts = [];
let userData = [];
let sortedUsers;
let id = 11;
let lastActivePerson;


async function initContacts() {
  const isLoggedIn = localStorage.getItem("token");
  logedInUser = localStorage.getItem("username");
  contacts = await getContacts(isLoggedIn)
  console.log(contacts);

  if (logedInUser === null) {
    navigateToIndex();
  }
  renderContacts();
  renderLogedUser(logedInUser)
}

// {
//   "id": 13,
//   "name": "Niels",
//   "initials": "N",
//   "email": "niels@muster.de",
//   "phone": null,
//   "circle_color": "#D60F4C",
//   "assigned": [],
//   "user": null
// }
/**
 *Updates the data of a person, only updates the data whose field is also filled in
 * @param {number} id - is needed to find the person to be updated
 * @returns {void} - returns nothing
 * */
async function editContact(userId) {
  const nameValue = document.getElementById("name").value.trim();
  const emailValue = document.getElementById("email").value.trim();
  const phoneValue = document.getElementById("phone").value.trim();
  if (nameValue && isValidEmail(emailValue) && phoneValue) {
    let inedxOfContact = contacts.findIndex(contact => contact.id === userId);
    if (inedxOfContact != -1) {
      contacts[inedxOfContact].name = nameValue;
      contacts[inedxOfContact].email = emailValue;
      contacts[inedxOfContact].phone = formatPhoneNumber(phoneValue);
      contacts[inedxOfContact].initials = nameValue.charAt(0).toUpperCase();
      const payload = {
        "name":contacts[inedxOfContact].name,
        "email":contacts[inedxOfContact].email,
        "phone":contacts[inedxOfContact].phone,
        "initials":contacts[inedxOfContact].initials
      }
      renderContacts()
      renderSingleContactOverview(inedxOfContact)
      patchEditedUser(contacts[inedxOfContact].id,payload)
    }
  } else {
    return
  }
}


/**
 * Checks if the edited data belongs to the logged-in user and updates the user's information accordingly.
 * @param {number} userId - The ID of the logged-in user.
 * @param {number} indexOfContact - The index of the contact being edited in the contacts array.
 * @returns {Promise<void>} - A promise that resolves when the user's information is updated.
 */
async function checkIfEditedDataIsLoggInUser(userId, inedOfContact) {
  if (logedInUser[0].id == userId) {
    logedInUser[0].name = contacts[inedOfContact].name;
    logedInUser[0].email = contacts[inedOfContact].email;
    logedInUser[0].initials = contacts[inedOfContact].initials;
    logedInUser[0].phone = contacts[inedOfContact].phone;
    updateLogedInUserInUserDataArray()
    renderLogedUser()
  }
}


/** deletes a contact from the contact list
 * @param {number} id - is required to find the desired user
 */
async function deleteContact(id) {
  const disabledClick = document.getElementById("single-contact-delete");
  const index = contacts.findIndex(contact => contact.id === id);
  console.log(index);
  
  if (localStorage.getItem("username") == contacts[index].name) {
    renderSlideInMsg("contact-success", "You can't delete yourself");
    disabledClick.style.pointerEvents = "none";
    return;
  }
  if (localStorage.getItem("username")==="Guest") {
    renderSlideInMsg("contact-success", "Guest can't delete a user");
    disabledClick.style.pointerEvents = "none";
    return;
  }
  if (index !== -1 && logedInUser[0].id != contacts[index].id) {
    contacts.splice(index, 1);
    renderContacts();
    document.getElementById("single-contact-data-container").innerHTML = "";
    lastActivePerson = 0;
    renderContactListAfterDeleteMobile()
    deleteContactEntry(id);
  }

}


/**
 * Saves the user in userData array and
 * sets the id to the next number
 * @returns {void} - returns nothing
 */
async function saveNewUserData() {
  id = await getItemContacts("id");
  const name = document.getElementById("name-reg").value.trim();
  const helper = name.split(" ");
  const email = document.getElementById("email-reg").value.trim();
  const password = document.getElementById("password-reg").value.trim();
  const passwordRep = document.getElementById("rep-password-reg").value.trim();
  if (checkEmailAddress(email, userData) || password != passwordRep) {
    return;
  }
  userData.push({
    id: id,
    name: firstCharToUpperCase(helper[0]),
    lastname: helper.length === 1 ? "" : firstCharToUpperCase(helper[helper.length - 1]),
    email: email,
    password: password,
    initials: helper.length === 1 ? helper[0].charAt(0).toUpperCase() : helper[0].charAt(0).toUpperCase() + helper[1].charAt(0).toUpperCase(),
    phone: "No data stored",
  });
  id++;
  setItem("id", id);
  setItem("userData", userData);
  if (window.location.href == 'https://kevin-mueller.developerakademie.net/index.html' || 'http://127.0.0.1:5500/index.html') {
    showRegistrationAnimation();
  }
}


/** adds a new contact to Contactlist and sets the id to the next number
 * @returns {void} - returns nothing
 */
async function addNewContactToContactlist() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  if (checkEmailAddress(email, contacts) || !isValidEmail(email)) {
    return;
  }
  if (name && email && phone) {
    const payload = {
      "name": name,
      "email": email,
      "phone": phone,
      "initials": name.charAt(0).toUpperCase()
    };
    const response = await newContact(payload ,localStorage.getItem("token"));
    contacts = await getContacts(localStorage.getItem("token"));
    renderContacts();
    renderCard("edit-card", "");
    renderAddContactSuccess(response.id, "Contact succesfully created ");
  }
}


/** sets the item in the local storage  */
function sortArrayByUserName() {
  sortedUsers = contacts.sort((a, b) => {
    const result = a.name.localeCompare(b.name);
    return result
    // return result !== 0 ? result : a.lastname.localeCompare(b.lastname);
  });
}


/**
 * /**
 *Compares the email in the contacts array, if the email exists it returns a value,
  which can be intercepted in an if query to jump out of the function
 * @param {string} email - is required to compare the emails
 * @param {array} array - which array should be searched for the emails
 * @returns {string} - returns a string if the email is already in use
 */
function checkEmailAddress(email, array) {
  for (let i = 0; i < array.length; i++) {
    const existingEmail = array[i].email;
    if (existingEmail === email) {
      return "This email is already in use";
    }
  }
}


/**
 *capitalizes the first letter
 * @param {String} name - User name
 * @returns {String} - returns the name in upper case
 */
function firstCharToUpperCase(name) {
  let toUpper = name.charAt(0).toUpperCase() + name.substring(1);
  return toUpper
}


/**
 *Sets all letters to lower case
 * @param {String} name - User name
 * @returns {String}  - returns the name in lower case
 */
function firstCharToLowerCase(name) {
  let toLower = name.toLowerCase()
  return toLower
}


/**
 * Sets the clicked card to active and colors it, if another card is clicked, the last card is reset to normal state
 * @param {Number} id - the id of the clicked card
 */
function setPersonToActive(id) {
  let activPerson = document.getElementById(`contact-data-${id}`)
  activPerson.classList.add("pointerEvents")
  if (lastActivePerson >= 0) {
    let lastPersconActive = document.getElementById(`contact-data-${lastActivePerson}`)
    lastPersconActive.classList.remove("set-contact-to-active")
    lastPersconActive.classList.remove("pointerEvents")
  }
  activPerson.classList.add("set-contact-to-active")
  lastActivePerson = id
}


/**
 * Sets the first letter of the name to upper case
 * @param {String} name - User name
 * @returns {void} - returns nothing
 */
function firstCharToUpperCase(name) {
  let toUpper = name.charAt(0).toUpperCase() + name.substring(1);
  return toUpper;
}


/**
 * Sets all letters to lower case
 * @param {String} name - User name
 * @returns {void} - returns nothing
 */
function firstCharToLowerCase(name) {
  let toLowerCase = name.toLowerCase();
  return toLowerCase;
}


/**
 * Sets the clicked card to active and colors it, if another card is clicked, the last card is reset to normal state
 * @param {Number} id - the id of the clicked card
 */
function setPersonToActive(id) {
  let activPerson = document.getElementById(`contact-data-${id}`);
  activPerson.classList.add("pointerEvents");
  if (lastActivePerson >= 0) {
    let lastPersconActive = document.getElementById(
      `contact-data-${lastActivePerson}`
    );
    lastPersconActive.classList.remove("set-contact-to-active");
    lastPersconActive.classList.remove("pointerEvents");
  }
  activPerson.classList.add("set-contact-to-active");
  lastActivePerson = id;
}


/**
 * Formats a phone number by removing any non-numeric characters and adding a country code if missing.
 * @param {string} phone - The phone number to format.
 * @returns {string} - The formatted phone number.
 */
function formatPhoneNumber(phoneNumber) {
  let cleaned = ('' + phoneNumber).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{1})(\d{4})(\d{3})(\d{2})(\d{1})$/);
  if (match) {
    let countryCode = match[1] === '0' ? '+49' : match[1];
    return countryCode + ' ' + match[2] + ' ' + match[3] + ' ' + match[4] + ' ' + match[5];
  }
  if(phoneNumber === null){
    return "-"
  }
  return phoneNumber;
}


/**
 *  Clears the form values
 * @param {String} formId - id of the form
 */
function clearFormValues(formId) {
  const form = document.getElementById(formId);
  form.reset();
}


/**
 * Right slide in animation
 * @param {String} id - id of the element
 * @param {HTMLElement} htmlTemplate -  html template
 */
function rightSlideAnimation(id, htmlTemplate) {
  let element = document.getElementById(id);
  element.innerHTML = "";
  element.classList.add("right-slide-animation");
  element.innerHTML += htmlTemplate;
  setTimeout(() => {
    element.classList.remove("right-slide-animation");
  }, 450);
}


/**
 *  Right slide out animation
 * @param {Number} id - id of the element
 * @param {Number} setTimeoutValue - time to wait before the animation starts
 */
function slideBackAnimation(id) {
  let element = document.getElementById(id);
  element.classList.add("slide-back-animation");
  setTimeout(() => {
    element.classList.remove("slide-back-animation");
  }, 550);
}


function addBtnMobileOrDesktop() {
  return renderAddNewContact();
}


/**
 * Goes back to the contact list on mobile.
 * Renders the contacts, sets the mobile add button to default,
 * removes the mobile background color from the single user card,
 * and clears the content of the element with the id 'renderOrDelete'.
 */
const goBackToContactListMobile = () => {
  renderContacts();
  setMobileAddBtnToDefault()
  removeMoileBgColorSingleUserCard()
  let element = document.getElementById('renderOrDelete');
  if (element && element.hasChildNodes()) {
    element.innerHTML = '';
  }
}


/**
 * Sets the mobile add button to its default state.
 */
function setMobileAddBtnToDefault() {
  let addOrEddit = document.getElementById("add-or-eddit");
  addOrEddit.innerHTML = "";
  addOrEddit.innerHTML = addNewContactMobileHTML();
}


/**
 * Sets the gray opacity background color for an element with the id "opasity".
 */
function grayOpasityBackgroundColor() {
  let opasity = document.getElementById("opasity");
  opasity.classList.add("opasity");
}


/**
 * Represents the element with the ID "single-contact-data-container".
 * @type {HTMLElement}
 */
window.addEventListener('resize', function () {
  if (window.innerWidth <= 1022) {
    let checkElement = document.getElementById("single-contact-data-container")
    if (checkElement && checkElement.childNodes.length > 0) {
      checkElement.innerHTML = '';
      renderContacts()
    }
  }
});


/**
 * Sets the logged-in user in the contacts array.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
async function setLogedInUserInContactsArray() {
  // let logedInUser = await getItemContacts("logedInUser");
  let checkUserId = contacts.findIndex(contact => contact.id === logedInUser[0].id);
  if (logedInUser.length != "Guest" && !logedInUser[0].id) {
    return;
  }
  if (checkUserId == -1) {
    contacts.push(logedInUser[0]);
    renderContacts();
    setItem("contacts", contacts);
  }
}


/**
 * Updates the logged-in user in the userData array.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
async function updateLogedInUserInUserDataArray() {
  userData = await getItemContacts("userData");
  let checkUserId = userData.findIndex(user => user.id === logedInUser[0].id);
  if (checkUserId != -1) {
    userData[checkUserId] = logedInUser[0];
    await setItem("userData", userData);
  }
}


/**
 * Checks if the input value contains only numbers and optional plus sign.
 * @param {string} id - The ID of the input element.
 */
function checkIfOnlyNumbers(id) {
  const inputElement = document.getElementById(id);
  inputElement.addEventListener('input', function () {
    if (!/^\+?\d*$/.test(this.value)) {
      this.value = this.value.replace(/[^\d+]|(?!^)\+/g, '');
    }
  });
}


/**
 * Checks if the given email is valid.
 *
 * @param {string} email - The email to be validated.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}


/**
 * Disables or enables the submit button based on the input fields' values.
 */
function disabledBtn() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let disabledBtn = document.getElementById("submitContact");
  if (!name || !email || !phone) {
    disabledBtn.disabled = true;
    return
  }
  disabledBtn.disabled = false;

}

async function ifEmailIsValisAddorEditContacts() {
  let email = document.getElementById("email").value.trim();
  if (await !isValidEmail(email)) {
    return
  } else {
    addNewContactToContactlist();
    closeRenderContactCardSlide()
  }
}

async function patchEditedUser(userId, payload) {
  return await fetch(`${STORAGE_URL}/api/kanban/contacts/${userId}/`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
  });
}

async function deleteContactEntry(userId){
  return await fetch(`${STORAGE_URL}/api/kanban/contacts/${userId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
  });
}