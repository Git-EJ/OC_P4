
//DISPLAY ==========================================================

// manages the display of the nav in low resolutions

function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


//REGEX ==========================================================

function regexTournament(event) {
  //only numbers 0 to 9
  event.target.value = event.target.value.replace([0-9], '');

  //maximum 2 numbers
  if (event.target.value.length > 2) {
    event.target.value = event.target.value.slice(0,2);
  }
}



//MODAL FORM ==========================================================


function doIt(data) {
  
  const error_message = data.error;
  
  //LAUNCH & CLOSE MODAL FORM ==========================================================
  
  const modalBg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const modalClose = document.querySelector(".close");
  
  const launchModal = (modal) => { modal.style.display = "block"; }
  const closeModal = (modal) => { modal.style.display = "none"; }
  
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener('click', ()=>launchModal(modalBg)));
  
  //close modal event
  modalClose.addEventListener('click', ()=>closeModal(modalBg));
  
  
  
  //INPUT FIELD MANAGEMENT ==========================================================
  

  // Before value entry for valueMissing
  let inputs = document.querySelectorAll('input');
  
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === ""){
      inputs[i].setCustomValidity(error_message.required_field);
    }
  };
  
   // After value entry for valueMissing
  document.addEventListener('input' , function(event) {

    if (event.target.value === ""){
      event.target.setCustomValidity(error_message.required_field);
    }
  });

  
  //Hyphen management for first and last name fields
  function hyphenFirstandLastNameManager(inputFieldName) {
    inputFieldName.addEventListener('input', (event) => {
      let name = event.target.value
      let name1 = name.replace('--','-')
      if (name.length!==name1.length) {
        event.target.value = name1
      }
    })
  };


// function test (inputFieldName, entryError) {

//   inputFieldName.addEventListener('input', function() {

//     let inputValue = inputFieldName.value;

//     if (inputValue.startsWith ('-') || inputValue.endsWith ('-')) {
//       inputFieldName.setCustomValidity(entryError.hyphen_not_allowed_at_the_start_or_end);
//     }
//   })
// }
  
  
  //Validation of the first and last name fields
  function validateElementsName(inputFieldName, entryError) {

    inputFieldName.addEventListener('input', function() {
      
      
      if (inputFieldName.validity.tooShort){
        inputFieldName.setCustomValidity(entryError.two_letters_minimum);
        
      } else if (inputFieldName.validity.patternMismatch){
        inputFieldName.setCustomValidity(entryError.authorized_characters);
        
      } else if (inputFieldName.validity.patternMismatch && inputFieldName.validity.tooShort){
        inputFieldName.setCustomValidity(entryError.two_letters_and_authorized_characters);
        
      } else if (inputValue.startsWith ('-') || inputValue.endsWith ('-')) {
        inputFieldName.setCustomValidity(entryError.hyphen_not_allowed_at_the_start_or_end);
        
      } else {
        inputFieldName.setCustomValidity("");
      }
      
      let inputValue = inputFieldName.value;
      if (inputValue.startsWith ('-') || inputValue.endsWith ('-')) {
        inputFieldName.setCustomValidity(entryError.hyphen_not_allowed_at_the_start_or_end);}
    })
  }
  

  //Validation of the email field
  function validateElementEmail(inputFieldName, entryError) {
    
    inputFieldName.addEventListener('input', function() {
      
      if(inputFieldName.validity.typeMismatch || inputFieldName.validity.patternMismatch){
        inputFieldName.setCustomValidity(entryError.email_format);
        
      } else {
        inputFieldName.setCustomValidity("");
      }
    })
  }
  

  //Validation of the birthdate and tournament fields
  function validateElementBirthdateAndTournament(inputFieldName) {

    inputFieldName.addEventListener('input', function() {
      
      const birthdateValue = document.getElementById('birthdate').value;
      const tournamentValue = document.getElementById('tournament-quantity').value;
      
      if (birthdateValue.length > 0 || tournamentValue.length > 0) {  //without this condition, the error message is displayed when the field is empty or not empty
        inputFieldName.setCustomValidity("");
      }
    })
  }
  

  
  //FIRSTNAME FIELD ===========================================================
  //modal firstname error messages
  const firstname = document.getElementById('firstname');
  validateElementsName(firstname, error_message);
  hyphenFirstandLastNameManager(firstname);
  // test(firstname, error_message);
  
  
  
  //LASTNAME FIELD ===========================================================
  //modal lastname error messages
  const lastname = document.getElementById('lastname');
  validateElementsName(lastname, error_message)
  hyphenFirstandLastNameManager(lastname);
  
  
  
  //EMAIL FIELD ===========================================================
  // modal email error message
  const email = document.getElementById('email');
  validateElementEmail(email, error_message);


  //BIRTHDATE FIELD ===========================================================
  //modal birthdate error message
  const birthdate = document.getElementById('birthdate');
  validateElementBirthdateAndTournament(birthdate, error_message);
  
  //TOURNAMENT FIELD ===========================================================
  //modal tournament error message
  const tournament = document.getElementById('tournament-quantity');
  validateElementBirthdateAndTournament(tournament, error_message);


  
  // //LOCATION CHECKBOX ===========================================================

  //modal location validation
  let locChecked = false;

  function validateLocation() {
    let checkboxes = document.querySelectorAll("input[name='location']");

    locChecked = false;
    checkboxes.forEach( (checkbox) => isLocated(checkbox) );
  }

  function isLocated(checkbox){
    locChecked = checkbox.checked || locChecked;
  }
    


  //SUBMIT MODAL FORM ===========================================================

  //modal submit validation form negative or positive  

  let formSub = document.getElementById('form-submit');

  formSub.addEventListener('click', function (canSubmit){

    validateLocation()
    console.log(locChecked)

    if (locChecked !=true) {
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
      myDiv.textContent = data.validation.submit_validation_message;


      //delays the reloading of the dom after validation of the form
      const form = document.querySelector('form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        setTimeout(() => {window.location.reload();}, 2000);
      });
    }
  });






  //DEV START
  
  //modal automatic spawn (simulates a click automatically)
  const btnClick = document.querySelector('.btn-signup.modal-btn');
  btnClick.click();


  //value befor user entry
  const form = document.querySelector('form');
  const inputsValue = form.querySelectorAll('input');
  
  inputsValue.forEach(inputsValue => {
    console.log(inputsValue.value);
  });

  //value after user entry
  form.addEventListener('input', (event) => {
    console.log(event.target.value);
  });

  //DEV END

}



//CONTENT.JSON ==========================================================

// recovery of error or validation messages in content.json
window.onload = async ()=>{
  fetch('./content.json')
  .then(response => response.json())
  .then(data => doIt(data));
}
