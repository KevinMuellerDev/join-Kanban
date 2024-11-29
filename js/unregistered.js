/**
 * function to check if user is unregistered, if yes unregistered style is aplied
 * 
 * @author Kevin Mueller
 */
async function initUnregistered(){
    logedInUser = localStorage.getItem("username");
    console.log(logedInUser);
    
    
    if (logedInUser === null) {
        addCss('../styles/unregistered.css');
    }else{
        renderLogedUser(logedInUser);
    }
}


/**
 * function to apply css for unregistered user
 * 
 * @param {string} fileName - href destination
 * @author Kevin Mueller
 */
function addCss(fileName) {
    let head = document.head;
    let link = document.createElement("link");
  
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;
  
    head.appendChild(link);
}
  
