//DEV 

//modal automatic spawn (simulates a click automatically)

window.addEventListener('load', function() {
  const btnClick = document.querySelector('.btn-signup.modal-btn');
  btnClick.click();
});

//DEV END



//DISPLAY ==========================================================

// manages the display of the nav in low resolutions
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}



//LAUNCH & CLOSE MODAL ORM ==========================================================

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");  //????????
const modalClose = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

//close modal event
modalClose.forEach((toto) => toto.addEventListener('click',closeModal));


//close modal form
function closeModal(){
  modalBg.style.display = "none";
}



//FIRSTNAME ===========================================================

// //modal firstname error message
// const firstname = document.getElementById('firstname');

// firstname.addEventListener('keyup', function() {
//   if(firstname.validity.typeMismatch){
//     firstname.setCustomValidity(`Veuillez entrer au minimum 2 lettres`);
//   } else {
//   firstname.setCustomValidity("");
//   }
// });



//EMAIL ===========================================================

//modal email error message

const email = document.getElementById('email');

email.addEventListener('keyup', function() {
  if(email.validity.typeMismatch){
    email.setCustomValidity(`Veuillez entrer une adresse email correcte de type: "link@zelda.com"`);
  } else {
    email.setCustomValidity("");
  }
});



//LOCATION ===========================================================

//modal location validation
let locChecked = document.querySelectorAll("input[name='location']");
console.log(locChecked);

locChecked.forEach((location) => location.addEventListener('click',isLocated));

function isLocated(){
  if (locChecked = true) {
    console.log("1");
  }
}
  


//SUBMIT MODAL FORM ===========================================================


// recovery of error or validation messages in the .json

let submit_validation_message;

fetch('./content.json')
.then(response => response.json())
.then(data => {
    submit_validation_message = data.messages.submit_validation_message;
    console.log(submit_validation_message);
})


//modal submit validation form negative or positive  
let formSub = document.querySelector("input[type='submit']");

formSub.addEventListener('click', function (canSubmit){

  if (locChecked !=true){
    canSubmit.preventDefault();
    console.log(`can't submit`);

  } else {
    console.log('submit');
    
    //modal submit validation message

    //validation message display container
    const myBody = document.querySelector("body");
    const myDivContainer = document.createElement("div");
    myBody.appendChild(myDivContainer);
    myDivContainer.classList.add("submitok");
    setTimeout(() => {myDivContainer.style.display = "none"}, 2000);

    //validation message --> text message
    const myDiv = document.createElement("div");
    myDivContainer.appendChild(myDiv);
    myDiv.classList.add("submitok__message");
    myDiv.textContent = submit_validation_message;


    //delays the reloading of the dom after validation of the form
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      setTimeout(() => {window.location.reload();}, 2000);
    });
  }
});




