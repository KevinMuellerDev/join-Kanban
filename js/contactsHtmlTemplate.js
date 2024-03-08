/**
 * Renders the first letter of the contact array
 * @param {number} index - Array index required to display the first letter
 * @returns - HTML
 */
function contactDataHTML(index) {
    return /*html*/ `
        <div class="contacts-content">
            <div class="list">
                <span class="list-char">${contacts[index].name.charAt(0).toUpperCase()}</span>
            </div>
            <div class="underline"></div>
        </div>
    `
}


/**
 * together with a for loop can render all contacts
 * @param {number} index - Array index required to display the contact
 * @returns - HTML
 */
function contactUserCardHtml(index) {
    return /*html*/ `
        <div class="contact-data pointer" id="contact-data-${index}" onclick="renderSingleContactOverview(${index})">
            <div class="initials-circle ${contacts[index].circleColor}">
                <span>${contacts[index].initials}</span>
            </div>
            <div class="user-data-container">
                <div class="user-Data" id="user-Data-${index}">
                    <span>${contacts[index].name + " " + contacts[index].lastname}</span>
                    <a href="#">${contacts[index].email}</a>
                </div>
            </div>
        </div>
    `
}


/**
 * Renders the large display when clicking on a contact in Contacts
 * @param {number} index - array index of the person to be displayed
 * @returns - HTML
 */
function singleContactOverviewHTML(index) {
    return /*html*/ `
        <div class="single-data-headline">
            <div class="big-circle ${contacts[index].circleColor}" id="big-circle">
                ${contacts[index].initials}
            </div>
            <div class="single-contact-name-card">
                <span class="single-contacts-name">${contacts[index].name + " " + contacts[index].lastname}</span>
                <div class="contacts-icon-container dnone" id="contacts-icon-container">
                    <div class="icons-contacts pointer" id="single-contact-edit" onclick="renderEditContact(${contacts[index].id}, ${index})">
                        <svg class="icons-contacts" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_145489_3992" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_145489_3992)">
                                <path id="hoverPath" d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                            </g>
                        </svg>
                        <span>Edit</span>
                    </div>
                    <div class="icons-contacts pointer" id="single-contact-delete" onclick="deleteContact(${contacts[index].id})">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_145489_3997" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                            <rect x="0.5" width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_145489_3997)">
                            <path id="hoverSecPath" d="M7.5 21C6.95 21 6.47917 20.8042 6.0875 20.4125C5.69583 20.0208 5.5 19.55 5.5 19V6C5.21667 6 4.97917 5.90417 4.7875 5.7125C4.59583 5.52083 4.5 5.28333 4.5 5C4.5 4.71667 4.59583 4.47917 4.7875 4.2875C4.97917 4.09583 5.21667 4 5.5 4H9.5C9.5 3.71667 9.59583 3.47917 9.7875 3.2875C9.97917 3.09583 10.2167 3 10.5 3H14.5C14.7833 3 15.0208 3.09583 15.2125 3.2875C15.4042 3.47917 15.5 3.71667 15.5 4H19.5C19.7833 4 20.0208 4.09583 20.2125 4.2875C20.4042 4.47917 20.5 4.71667 20.5 5C20.5 5.28333 20.4042 5.52083 20.2125 5.7125C20.0208 5.90417 19.7833 6 19.5 6V19C19.5 19.55 19.3042 20.0208 18.9125 20.4125C18.5208 20.8042 18.05 21 17.5 21H7.5ZM7.5 6V19H17.5V6H7.5ZM9.5 16C9.5 16.2833 9.59583 16.5208 9.7875 16.7125C9.97917 16.9042 10.2167 17 10.5 17C10.7833 17 11.0208 16.9042 11.2125 16.7125C11.4042 16.5208 11.5 16.2833 11.5 16V9C11.5 8.71667 11.4042 8.47917 11.2125 8.2875C11.0208 8.09583 10.7833 8 10.5 8C10.2167 8 9.97917 8.09583 9.7875 8.2875C9.59583 8.47917 9.5 8.71667 9.5 9V16ZM13.5 16C13.5 16.2833 13.5958 16.5208 13.7875 16.7125C13.9792 16.9042 14.2167 17 14.5 17C14.7833 17 15.0208 16.9042 15.2125 16.7125C15.4042 16.5208 15.5 16.2833 15.5 16V9C15.5 8.71667 15.4042 8.47917 15.2125 8.2875C15.0208 8.09583 14.7833 8 14.5 8C14.2167 8 13.9792 8.09583 13.7875 8.2875C13.5958 8.47917 13.5 8.71667 13.5 9V16Z" fill="#2A3647"/>
                        </g>
                    </svg>
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-info-headline">
            <span>Contact Information</span>
        </div>
        <div class="contact-info-card" >
            <div class="contact-info-value">
                <span class="single-contact-data-headline-font">Email</span>
                <a href="mailto:${contacts[index].email}">${contacts[index].email}</a>
            </div>
            <div class="contact-info-value">
                <span class="single-contact-data-headline-font">Phone</span>
                <a href="tel:${contacts[index].phone}" class="second-cart-font">${formatPhoneNumber(contacts[index].phone)}</a>
            </div>
        </div>
    `
}


/**
 * Is required to display the form fields
 * @param {String} cardName - Heading of the card
 * @param {String}  secondText - additional text to be displayed
 * @param {String} functionName - function name to be used renderAddNewContact or renderEditContact
 * @returns - HTML
 */
function contactsCardHTML({ cardName, secondText, functionName, secontFunction, deleteOrClosebtn, saveOrCreateContact, index } = formConfig) {
    return /*html*/ `
        <div class="edit-card slideInAnimation">
            <div class="edit-card-headline">
                <img src="./assets/img/icons/join-logo.png" alt="">
                <div class="edit-card-header">
                    <span class="no-textwarap">${cardName}</span>
                    <span class="small-card-text no-textwarap dnone">${secondText}</span>
                </div>
                <div class="small-underline"></div>
            </div>
            <div class="close-btn pointer" onclick="closeRenderContactCardSlide()">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="closeBtn" d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="#2A3647"/>
                </svg>

            </div>
            <div class="edit-card-form">
                <div class="mobileCirclePosition small-screen-display-none" id="circle-color">
                </div>
                <div class="edit-card-form-input">
                    <form onsubmit="${functionName}; return false" id="contacts-form">
                        <input onkeyup="disabledBtn()" class="edit-card-from-input" type="text" placeholder="Name" id="name" autocomplete="off" required>
                        <input onkeyup="disabledBtn()" class="edit-card-from-input" type="email" placeholder="E-Mail" id="email" autocomplete="off" required>
                        <input onkeyup="disabledBtn(),checkIfOnlyNumbers('phone')" class="edit-card-from-input" type="tel" placeholder="Phone" id="phone" autocomplete="off" pattern="[+]?[0-9]+" maxlength="11" required>
                        <div class="edit-card-btn-wrapper">
                            <div id="delete-btn">
                                <button class="edit-card-btn white-btn pointer mobile-btn-font-size" id="delete" onclick="${secontFunction}">${deleteOrClosebtn}</button>
                            </div>
                            <button class="edit-card-btn main-btn-color font-color pointer" type="submit" id="submitContact" onclick="ifEmailIsValisAddorEditContacts(${functionName})" disabled>
                                <span class="mobile-btn-font-size">${saveOrCreateContact}</span>
                                <img class="small-screen-display-none" src="./assets/img/icons/check.png" alt="">
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
}


function slideInMessageHTML(message) {
    return /*html*/ `
        <div class="add-success">
            <span>${message}</span>
        </div>
    `
}


function addContactIconHTML() {
    return /*html*/ `
        <div class="big-circle guest">
            <img src="./assets/img/icons/person.png" alt="">
        </div>
    `
}


function contactsCardCircleHTML(index) {
    return  /*html*/ `
        <div class="big-circle card-circle-center ${contacts[index].circleColor}" id="circle-icon">
            <span>${contacts[index].initials}</span>
        </div>
    `
}


function menuContactMobileIconHTML(index) {
    return /*html*/ `
        <div class="btn-container" id="btn-container">
            <button class="add-contacts-btn add-contact-btn-mobile main-btn-color" onclick="renderEditOrDelete(${index})" id="add-or-eddit">
                <img src="./assets/img/icons/more_vert.png" />
            </button>
        </div>
        <div id="renderOrDelete"></div>
    `
}


function renderEditOrDeleteHTML(index) {
    return /*html*/ `
        <div class="icons-contacts" id="single-contact-edit" onclick="renderEditContact(${contacts[index].id}, ${index})">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_145489_3992" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_145489_3992)">
                <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                </g>
            </svg>
            <span>Edit</span>
        </div>
        <div class="icons-contacts" id="single-contact-delete" onclick="deleteContact(${contacts[index].id})">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_145489_3997" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                        <rect x="0.5" width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_145489_3997)">
                        <path id="hoverSecPath" d="M7.5 21C6.95 21 6.47917 20.8042 6.0875 20.4125C5.69583 20.0208 5.5 19.55 5.5 19V6C5.21667 6 4.97917 5.90417 4.7875 5.7125C4.59583 5.52083 4.5 5.28333 4.5 5C4.5 4.71667 4.59583 4.47917 4.7875 4.2875C4.97917 4.09583 5.21667 4 5.5 4H9.5C9.5 3.71667 9.59583 3.47917 9.7875 3.2875C9.97917 3.09583 10.2167 3 10.5 3H14.5C14.7833 3 15.0208 3.09583 15.2125 3.2875C15.4042 3.47917 15.5 3.71667 15.5 4H19.5C19.7833 4 20.0208 4.09583 20.2125 4.2875C20.4042 4.47917 20.5 4.71667 20.5 5C20.5 5.28333 20.4042 5.52083 20.2125 5.7125C20.0208 5.90417 19.7833 6 19.5 6V19C19.5 19.55 19.3042 20.0208 18.9125 20.4125C18.5208 20.8042 18.05 21 17.5 21H7.5ZM7.5 6V19H17.5V6H7.5ZM9.5 16C9.5 16.2833 9.59583 16.5208 9.7875 16.7125C9.97917 16.9042 10.2167 17 10.5 17C10.7833 17 11.0208 16.9042 11.2125 16.7125C11.4042 16.5208 11.5 16.2833 11.5 16V9C11.5 8.71667 11.4042 8.47917 11.2125 8.2875C11.0208 8.09583 10.7833 8 10.5 8C10.2167 8 9.97917 8.09583 9.7875 8.2875C9.59583 8.47917 9.5 8.71667 9.5 9V16ZM13.5 16C13.5 16.2833 13.5958 16.5208 13.7875 16.7125C13.9792 16.9042 14.2167 17 14.5 17C14.7833 17 15.0208 16.9042 15.2125 16.7125C15.4042 16.5208 15.5 16.2833 15.5 16V9C15.5 8.71667 15.4042 8.47917 15.2125 8.2875C15.0208 8.09583 14.7833 8 14.5 8C14.2167 8 13.9792 8.09583 13.7875 8.2875C13.5958 8.47917 13.5 8.71667 13.5 9V16Z" fill="#2A3647"/>
                    </g>
                </svg>
            <span>Delete</span>
        </div>
    `
}


function contactsWelcomHTML() {
    return /*html*/ `
        <div class="single-contact-headline small-underline">
            <h1>Contacts</h1>
            <span>Better with a Team</span>
            <!-- <div class="small-underline desktop-none"></div> -->
        </div>
    `
}


function mobileDeleteOrEditBtnHTML(index) {
    return /*html*/ `
        <div class="icon-container-mobile slideInMobile">
            <div class="icons-contacts" onclick="renderEditContact(${contacts[index].id}, ${index})">
                <img src="./assets/img/icons/edit.png" alt="">
                <span>Edit</span>
            </div>
            <div class="icons-contacts" id="single-contact-delete}" onclick="deleteContact(${contacts[index].id})">
                <img src="./assets/img/icons/delete.png" alt="">
                <span>Delete</span>
            </div>
        </div>
    `
}


function addNewContactMobileHTML() {
    return /*html*/ `
        <div class="add-contacts-btn add-contact-btn-mobile main-btn-color" onclick="renderAddNewContact()">
            <img src="./assets/img/icons/person_add.png" />
        </div>
    `
}


function goBackToContactlistHTML() {
    return /*html*/ `
        <div class="back-btn-container pointer" onclick="goBackToContactListMobile()">
            <img src="./assets/img/back_arrow.png" alt="" >
        </div>
    `
}
