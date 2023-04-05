//DEV 

//modal automatic spawn (simulates a click automatically)

window.addEventListener('load', function() {
  const btnClick = document.querySelector('.btn-signup.modal-btn');
  btnClick.click();
});

//DEV END




// manages the display of the nav in low resolutions
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

//close modal event
modalClose.forEach((toto) => toto.addEventListener("click",closeModal));


//close modal form
function closeModal(){
  modalBg.style.display = "none";
}


//modal location validation

let locChecked = document.querySelectorAll("input[name='location']");
console.log(locChecked);

locChecked.forEach((location) => location.addEventListener("click",isLocated));


function isLocated(){
  if (locChecked = true) {
    console.log("1");
}
}
  
//modal submit validation
let formsub = document.querySelector("input[type='submit']");

formsub.addEventListener('click', function (canSubmit){

  if (locChecked !=true){
    canSubmit.preventDefault();
    console.log(`can't submit`)
  } else {
    console.log('submit')
  }
});


