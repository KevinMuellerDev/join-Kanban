/**
 * renders the maps, always makes a capital letter when a new charAt(0) is reached
 */
function renderContacts() {
    sortArrayByUserName();
    const list = document.getElementById("contact-list");
    list.innerHTML = "";
    list.innerHTML += contactDataHTML(0);
    list.innerHTML += contactUserCardHtml(0);
    for (let i = 1; i < contacts.length; i++) {
        if (contacts[i].name.charAt(0) != contacts[i - 1].name.charAt(0)) {
            list.innerHTML += contactDataHTML(i);
            list.innerHTML += contactUserCardHtml(i);
        } else {
            list.innerHTML += contactUserCardHtml(i);
        }
    }
}


/**
 * Renders the overview of a single contact.
 *
 * @param {string} id - The ID of the contact to render.
 * @returns {void}
 */
function renderSingleContactOverview(id) {
    if (window.innerWidth < 1024) {
        mobileSingleContactOverview(id);
        makeBigCircleSmaller()
        renderMobileViewMenu(id)
        changeMobileBgColorSingelUserCard()
    } else {
        singleContactOverview(id);
    }
}


/**
 * Closes the rendered contact card slide.
 * Removes the "opasity" class from the element with the id "opasity".
 * Clears the form values of the element with the id "contacts-form".
 * Performs a slide back animation on the element with the id "edit-card".
 * Removes the inner HTML content of the element with the id "edit-card" after a delay of 420 milliseconds.
 */
function closeRenderContactCardSlide() {
    let opasity = document.getElementById("opasity");
    opasity.classList.remove("opasity");
    // clearFormValues("contacts-form");
    slideBackAnimation("edit-card");
    setTimeout(() => {
        document.getElementById("edit-card").innerHTML = "";
    }, 200);
}


/**
 * Renders the card with the given html content
 * @param {Number} id - id of the person in contacts
 * @param {String} htmlContent - html content
 */
function renderCard(id, htmlContent) {
    const card = document.getElementById(id);
    card.innerHTML = "";
    rightSlideAnimation(id, htmlContent);
}


/**
 * Renders the "Add New Contact" card on the page.
 * This function sets the background color, configures the form, and renders the card HTML.
 * It also updates the circle color and adds the contact icon.
 */
function renderAddNewContact() {
    grayOpasityBackgroundColor()
    const formConfig = {
        cardName: "Add contact",
        secondText: "Tasks are better with a team!",
        functionName: `addNewContactToContactlist`,
        secontFunction: `closeRenderContactCardSlide()`,
        deleteOrClosebtn: "Close",
        saveOrCreateContact: "Create contact",
        index: ""
    };
    renderCard("edit-card", contactsCardHTML(formConfig));
    let circleColor = document.getElementById("circle-color");
    circleColor.innerHTML = addContactIconHTML();
}


/**
 * Renders the edit contact form for a specific user.
 *
 * @param {string} userId - The ID of the user.
 * @param {number} userIndex - The index of the user in the contacts array.
 * @returns {void}
 */
function renderEditContact(userId, userIndex) {
    grayOpasityBackgroundColor()
    const formConfig = {
        cardName: "Edit contact",
        secondText: "",
        functionName: `editContact(${userId})`,
        secontFunction: `deleteContact(${userId}); closeRenderContactCardSlide()`,
        deleteOrClosebtn: "Delete",
        saveOrCreateContact: "Save",
        index: userIndex
    };
    renderCard("edit-card", contactsCardHTML(formConfig));
    let circleColor = document.getElementById("circle-color");
    circleColor.innerHTML += contactsCardCircleHTML(userIndex)
    document.getElementById("name").value = contacts[userIndex].name + " " + contacts[userIndex].lastname;
    document.getElementById("email").value = contacts[userIndex].email;
    document.getElementById("phone").value = formatPhoneNumber(contacts[userIndex].phone);
}


/**
 * Renders the success message after adding a contact
 * and sets the person to active.
 * @param {Number} id - id of the contact
 */
function renderAddContactSuccess(userId, message) {
    let indexOfId = contacts.findIndex(contact => contact.id === userId);
    let succesfully = document.getElementById("contact-success");
    renderOnlyInDesktopView(renderSingleContactOverviewDesktop(indexOfId))
    setPersonToActive(indexOfId);
    rightSlideAnimation("contact-success", slideInMessageHTML(message));
    setTimeout(() => {
        slideBackAnimation("contact-success");
    }, 1000);
    setTimeout(() => {
        succesfully.innerHTML = "";
    }, 1220);
}


/**
 * Renders the mobile view menu for a contact at the specified index.
 *
 * @param {number} index - The index of the contact.
 */
function renderMobileViewMenu(index) {
    let container = document.getElementById("contact-list")
    let btnContainer = document.getElementById("btn-container")
    btnContainer.innerHTML = ""
    btnContainer.innerHTML += menuContactMobileIconHTML(index)
}


/**
 * Renders the edit or delete button for a specific contact.
 *
 * @param {number} index - The index of the contact.
 */
function renderEditOrDelete(index) {
    let container = document.getElementById("renderOrDelete")
    container.innerHTML = ""
    container.innerHTML += mobileDeleteOrEditBtnHTML(index)
}


/**
 * Renders the contact list after deleting a contact on mobile devices.
 * If the window width is less than 1024 pixels, it clears the contact list,
 * renders the updated contact list, sets the mobile add button to its default state,
 * and clears the renderOrDelete element.
 */
function renderContactListAfterDeleteMobile() {
    if (window.innerWidth < 1024) {
        let renderOrDelete = document.getElementById("renderOrDelete");
        document.getElementById("contact-list").innerHTML = "";
        renderContacts();
        setMobileAddBtnToDefault()
        renderOrDelete.innerHTML = "";
    }
}


/**
 * Render a single person in a more detailed view
 * @param {number} id - is required to find the desired user
 */
function singleContactOverview(index) {
    const singlContactDataContainer = document.getElementById(
        "single-contact-data-container"
    );
    setPersonToActive(index);
    singlContactDataContainer.innerHTML = "";
    rightSlideAnimation("single-contact-data-container", singleContactOverviewHTML(index));
}


/**
 * Renders the overview of a single contact on a mobile device.
 *
 * @param {Number} id - The ID of the contact to render.
 */
function mobileSingleContactOverview(id) {
    const singlContactDataContainer = document.getElementById("contact-list");
    setPersonToActive(id);
    singlContactDataContainer.innerHTML = "";
    singlContactDataContainer.innerHTML += contactsWelcomHTML();
    singlContactDataContainer.innerHTML += singleContactOverviewHTML(id);
    singlContactDataContainer.innerHTML += goBackToContactlistHTML();
}


/**
 * Makes the big circle smaller by adding the "mobile-big-circle" class.
 */
function makeBigCircleSmaller() {
    let bigCircle = document.getElementById("big-circle");
    bigCircle.classList.add("mobile-big-circle");
}


/**
 * Changes the background color of the mobile single user card.
 */
function changeMobileBgColorSingelUserCard() {
    let singleUserCard = document.getElementById("contacts-container");
    singleUserCard.classList.add("mobile-single-user-card");
}


/**
 * Removes the mobile background color from the single user card.
 */
function removeMoileBgColorSingleUserCard() {
    let singleUserCard = document.getElementById("contacts-container");
    singleUserCard.classList.remove("mobile-single-user-card");
}


/**
 * Renders the overview of a single contact for mobile devices.
 *
 * @param {number} indexOfId - The index of the contact ID.
 */
function renderSingleContactOverviewDesktop(indexOfId) {
    let container = document.getElementById("single-contact-data-container")
    container.innerHTML = ""
    container.innerHTML += singleContactOverviewHTML(indexOfId)
}


/**
 * Renders the content only in desktop view.
 * @param {function} functionName - The function to be executed in desktop view.
 */
function renderOnlyInDesktopView(functionName) {
    if (window.innerWidth < 1024) {
        functionName
    }
}


/**
 * Renders a slide-in message in the specified element.
 *
 * @param {string} elementId - The ID of the element where the message will be rendered.
 * @param {string} msg - The message to be rendered.
 */
function renderSlideInMsg(elementId, msg) {
    rightSlideAnimation(elementId, slideInMessageHTML(msg));
    setTimeout(() => {
        slideBackAnimation(elementId);
    }, 1000);
    setTimeout(() => {
        document.getElementById(elementId).innerHTML = "";
    }, 1220);
}
