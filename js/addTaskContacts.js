/**
 * Initializes the contacts by retrieving them from storage and populating the temporary contacts array.
 * @async
 * @function initContacts
 * @author Dragan
 */

async function initContacts() {
  tempContacts = await getItemContacts("contacts");
  getAllContacts();
}

/**
 * Retrieves all contacts and displays them.
 * @function getAllContacts
 * @author Christian Förster
 */

function getAllContacts() {
  displayContacts(tempContacts);
}

/**
 * Displays a list of contacts in a select element on the DOM.
 * @function displayContacts
 * @param {Array} contacts - An array of contacts to display.
 * @author Christian Förster
 */

function displayContacts(contacts) {
  checkedContacts = [];
  let selectElement = document.getElementById("contact-values");
  selectElement.innerHTML = "";
  let optionsHTML = "";
  contacts.forEach((contact, index) => {
    optionsHTML += generateContactHTML(contact, index);
  });
  selectElement.innerHTML = optionsHTML;
}

/**
 * Toggles the visibility of a list of contacts.
 * @function showContacts
 * @author Christian Förster
 */

function showContacts() {
  let arrow = document.getElementById("arrowContactInput");
  let id = document.getElementById("contact-values");
  let input = document.getElementById("contactAssignInput");
  input.placeholder = "Select contacts to assign";
  id.classList.toggle("d-none");
  arrow.classList.toggle("rotate-180");
  if (!id.classList.contains("d-none")) {
    closeContactValueOnDifferentClickTarget();
  }
}

/**
 * Closes the contact values dropdown when clicking outside this specific element and its components.
 * @function closeContactValueOnDifferentClickTarget
 * @param {number} index - The index of the contact.
 */

function closeContactValueOnDifferentClickTarget(index) {
  document.onclick = function (event) {
    const contactValues = document.getElementById("contact-values");
    const assignToInput = document.getElementById("contactAssignInput");
    const arrow = document.getElementById("arrowContactInput");
    const contactCard = document.getElementById(`contact_${index}`);
    const checkboxIcon = document.getElementById(`checkboxIcon_${index}`);
    const clickedElement = event.target;
    // Überprüfen, ob das geklickte Element ein SVG oder ein Span ist
    const isSVGOrSpan = clickedElement.tagName === "svg" || clickedElement.tagName === "SPAN";
    // Wenn das geklickte Element nicht eines der spezifizierten Elemente ist wird ein d-none gesetzt
    if (!isSVGOrSpan && clickedElement !== contactValues && clickedElement !== assignToInput && clickedElement !== arrow && clickedElement !== contactCard && clickedElement !== checkboxIcon) {
      contactValues.classList.add("d-none");
      assignToInput.placeholder = "Select contacts to assign";
    }
  };
}

/**
 * Retrieves information about a clicked contact and updates its visual representation.
 * @function getClickedContact
 * @param {number} index - The index of the clicked contact.
 * @param {string} contactId - The ID of the clicked contact.
 * @author Christian Förster
 */

function getClickedContact(index, contactId) {
  let input = document.getElementById("contactAssignInput");
  let iconToChange = document.getElementById(`checkboxIcon_${index}`);
  let contactCard = document.getElementById(`contact_${index}`);
  let checkBoxIconColor = document.getElementById(`checkboxIcon_${index}`);
  let isChecked = checkedContacts.includes(contactId);
  input.placeholder = "An ";
  checkClickedContact(iconToChange, contactCard, checkBoxIconColor, isChecked, index, contactId);
  closeContactValueOnDifferentClickTarget(index);
}

/**
 * Updates the visual representation of a clicked contact based on its current state.
 * @function checkClickedContact
 * @param {HTMLElement} iconToChange - The checkbox icon element to be updated.
 * @param {HTMLElement} contactCard - The contact card element associated with the clicked contact.
 * @param {HTMLElement} checkBoxIconColor - The checkbox icon color element associated with the clicked contact.
 * @param {boolean} isChecked - Indicates whether the clicked contact is already checked.
 * @param {number} index - The index of the clicked contact.
 * @param {string} contactId - The ID of the clicked contact.
 * @author Christian Förster
 */

function checkClickedContact(iconToChange, contactCard, checkBoxIconColor, isChecked, index, contactId) {
  if (isChecked) {
    let contactIndex = checkedContacts.indexOf(contactId);
    if (contactIndex !== -1) {
      checkedContacts.splice(contactIndex, 1);
    }
    iconToChange.innerHTML = renderBoxIcon();
    contactCard.classList.remove("active");
    checkBoxIconColor.classList.remove("stroke-wht");
  } else {
    checkedContacts.push(contactId);
    iconToChange.innerHTML = renderCheckedIcon();
    contactCard.classList.add("active");
    checkBoxIconColor.classList.add("stroke-wht");
  }
  showChoosenContactsCircle();
}

/**
 * Clears the active state of contacts by removing the "active" class from their corresponding elements
 * and resetting checkbox icons to default.
 * @function clearActiveContacts
 * @author Christian Förster
 */

function clearActiveContacts() {
  for (let index = 0; index < tempContacts.length; index++) {
    document.getElementById(`checkboxIcon_${index}`).innerHTML = renderBoxIcon();
    document.getElementById(`contact_${index}`).classList.remove("active");
    document.getElementById(`checkboxIcon_${index}`).classList.remove("stroke-wht");
  }
}

/**
 * Filters and displays contacts based on the input value.
 * @function filterContacts
 * @author Christian Förster
 */

function filterContacts() {
  // Input-Wert abrufen
  let filterValue = document.getElementById("contactAssignInput").value.trim().toUpperCase();
  // Wenn das Eingabefeld leer ist, getAllContacts aufrufen, um alle Kontakte anzuzeigen
  if (filterValue === "") {
    getAllContacts();
    return;
  }
  // Neue Liste für gefilterte Kontakte erstellen
  let filteredContacts = tempContacts.filter((contact) => {
    // Den Filter auf Namen anwenden
    let fullName = `${contact.name.toUpperCase()}`;
    return fullName.includes(filterValue);
  });
  // Neue Kontakte als Liste anzeigen
  displayFilteredContacts(filteredContacts);
}

/**
 * Displays filtered contacts by passing them to the function responsible for displaying contacts.
 * @function displayFilteredContacts
 * @param {array} filteredContacts - The array of filtered contacts to be displayed.
 * @author Christian Förster
 */

function displayFilteredContacts(filteredContacts) {
  displayContacts(filteredContacts);
}

/**
 * Renders circles representing chosen contacts and displays them in the designated container.
 * @function showChoosenContactsCircle
 * @author Christian Förster
 */

function showChoosenContactsCircle() {
  let container = document.getElementById("choosenContacts");
  container.innerHTML = "";
  checkedContacts.forEach((checkedContactId) => {
    tempContacts.forEach((contact) => {
      if (checkedContactId === contact.id) {
        container.innerHTML += `
          <div class="initials-circle ${contact.circleColor}">
          ${contact.initials}
          </div>
          
          `;
      }
    });
  });
}

/**
 * Retrieves information about checked contacts and stores it in various arrays.
 * @function getCheckedContact
 * @author Christian Förster & Kevin Müller
 */

function getCheckedContact() {
  initials = [];
  contactName = [];
  circleColors = [];
  contactDataAsArray = [];
  contactIds = [];
  finalContactData = [];
  checkedContacts.forEach((contactId) => {
    tempContacts.forEach((contact) => {
      if (contactId === contact.id) {
        contactName.push(contact.name + " " + contact.lastname);
        initials.push(contact.initials);
        circleColors.push(contact.circleColor);
        contactIds.push(contact.id);
        finalContactData.push({
          id: contact.id,
          name: contact.name,
          lastname: contact.lastname,
          initials: contact.initials,
          circleColor: contact.circleColor,
        });
      }
    });
  });
}
