
//DISPLAY START ==========================================================

// manages the display of the nav in low resolutions

function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//DISPLAY END ==========================================================



//REGEX START ==========================================================

function regexTournament(event) {
  //only numbers 0 to 9
  event.target.value = event.target.value.replace([0-9], '');

  //maximum 2 numbers
  if (event.target.value.length > 2) {
    event.target.value = event.target.value.slice(0,2);
  }
}

//REGEX END ==========================================================



//MODAL FORM START =======================================================================================================================================

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
  
  
  
  //INPUT FIELD MANAGEMENT START ==========================================================
  
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
      

      // inputFieldName is a dom element (inputfield) ==> object. 
      // The start/end method is a string method. So we have to convert the dom element into a string.
      // For this we retrieve the value of inputfieldname with .value and we call start/end method with this value.
      let inputValue = inputFieldName.value;
      if (inputValue.startsWith ('-') || inputValue.endsWith ('-')) {
        inputFieldName.setCustomValidity(entryError.hyphen_not_allowed_at_the_start_or_end);}
    })
  }
  

  // Validation of the email field start
  function validateElementEmail(inputFieldName, entryError) {
    
    inputFieldName.addEventListener('input', function() {
      
      if(inputFieldName.validity.typeMismatch || inputFieldName.validity.patternMismatch) {
        inputFieldName.setCustomValidity(entryError.email_format);
        console.log(entryError.email_format)
      } else {
        inputFieldName.setCustomValidity("");
      }
      // console.log('IN  ' + inputFieldName.value)
    })
  }

  function validateElementEmail2(inputFieldName2, entryError) {
    
    inputFieldName2.addEventListener('input', function() {
      
      if(inputFieldName2.validity.typeMismatch || inputFieldName2.validity.patternMismatch) {
        inputFieldName2.setCustomValidity(entryError.email_format);
        console.log(entryError.email_format)
      } else {
        inputFieldName2.setCustomValidity("");
      }
      // console.log('IN2  ' + inputFieldName2.value)
    })
  }



function identicalEmail(inputFieldName, inputFieldName2, entryError) {

  inputFieldName.addEventListener('input', function() {

    if (inputFieldName.value != inputFieldName2.value) {
      inputFieldName.setCustomValidity(entryError.email_are_not_identical);
      console.log('email != confirmartion')
    } else {
      inputFieldName.setCustomValidity("");
      console.log('email = confirmation')
    }
    // console.log(inputFieldName.value + ' ID ' + inputFieldName2.value)
  })
}



function identicalEmail2(inputFieldName, inputFieldName2, entryError) {

  inputFieldName2.addEventListener('input', function() {

    if (inputFieldName2.value != inputFieldName.value) {
      inputFieldName2.setCustomValidity(entryError.email_are_not_identical);
      console.log('email != confirmartion')
    } else {
      inputFieldName2.setCustomValidity("");
      console.log('email = confirmation')
    }
    // console.log(inputFieldName2.value + ' ID2 ' + inputFieldName.value)
  })
}

// function identicalEmail(inputFieldName, inputFieldName2, entryError) {

//   inputFieldName.addEventListener('input', function() {

//     if ((inputFieldName.value != inputFieldName2.value) || (inputFieldName2.value != inputFieldName.value)) {
//       inputFieldName.setCustomValidity(entryError.email_are_not_identical);
//       console.log('email != confirmartion')

//     } else if ((inputFieldName.value = inputFieldName2.value) || (inputFieldName2.value = inputFieldName.value)) {
//       inputFieldName.setCustomValidity(entryError.email_are_not_identical);
//       console.log('email != confirmartion')
//     } 
//   })
// }


// const email =  document.getElementById('email');
// const emailConfirmation = document.getElementById('email-confirmation');
// function validateEmail(inputFieldName, inputFieldName2, entryError) {

//   if (inputFieldName.value !== inputFieldName2.value) {
//     inputFieldName2.setCustomValidity(entryError.email_are_not_identical);
//   } else {
//     inputFieldName.setCustomValidity('');
//   }
// }

// email.addEventListener('input', validateEmail);
// emailConfirmation.addEventListener('input', validateEmail);


 //Validation of the email field end
  

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



  //BIRTHDATE MINORS NOT ALLOWED START

  //retrieve today's date
  let todaysDate = new Date();
  // let dateOfTheDay = todaysDate.toLocaleString('fr-FR',{  //why date of the day not working with => .getFulleYear() .getMonth() .getDate() ?
  //   year: 'numeric',
  //   month: 'numeric',
  //   day: 'numeric',
  // });

  let year = todaysDate.getFullYear();
  let monthIndexJS = todaysDate.getMonth();
  let month = monthIndexJS + 1;
  let day = todaysDate.getDate();

  
  //retrieve user birthdate
  const userBirthdate = document.getElementById('birthdate');
  userBirthdate.addEventListener('input', (event) => {
    let userBirthDateValue = event.target.value;
    
    
    let dateInUserBirthDateValue = new Date(userBirthDateValue);
    // console.log(`dateInUserBirthDateValue : `, dateInUserBirthDateValue)
  
    let yearInUserBirthDateValue = dateInUserBirthDateValue.getFullYear();
    // console.log (`yearInUserBirthDateValue : `, yearInUserBirthDateValue);
  
    let monthIndexJsUserBirthDateValue = dateInUserBirthDateValue.getMonth();
    let monthInUserBirthDateValue = monthIndexJsUserBirthDateValue + 1;
    // console.log (`monthInUserBirthDateValue : `, monthInUserBirthDateValue);
  
    let dayInUserBirthdateValue = dateInUserBirthDateValue.getDate();
    // console.log (`dayInUserBirthdateValue : `, dayInUserBirthdateValue);
    

    if (year - yearInUserBirthDateValue < 18) {
      // console.log('minors are not allowed 1st');

    } else if (((year - yearInUserBirthDateValue) === 18) && ((month - monthInUserBirthDateValue) < 0)) {
      // console.log('minors are not allowed 2nd');

    } else if (((year - yearInUserBirthDateValue) === 18) && ((month - monthInUserBirthDateValue) === 0) && ((day - dayInUserBirthdateValue) < 0)) {
      // console.log('minors are not allowed 3rd');
    
      // nan => because for example 31 april doesn't exist. If the date doesn't exist it returns NaN.
    } else if (isNaN(dayInUserBirthdateValue, monthInUserBirthDateValue, yearInUserBirthDateValue) === true) {
      // console.log('date error');

    } else { 
      console.log('you are allowed');
    }

    // let yearInBirthdayNewEntry = birthDateNewEntry.getFullYear();     //?????????????? why doesn't work ?????? object matter?
    // console.log (`dateInBirthdayNewEntry : `, yearInBirthdayNewEntry);
  });

  //BIRTHDATE MINORS NOT ALLOWED END 

  //INPUT FIELD MANAGEMENT END ==========================================================



  
  //ERROR MESSAGES CONTENT DISPLAY START ================================================================
  
  //FIRSTNAME FIELD
  //modal firstname error messages
  const firstname = document.getElementById('firstname');
  validateElementsName(firstname, error_message);
  hyphenFirstandLastNameManager(firstname);

  
  //LASTNAME FIELD 
  //modal lastname error messages
  const lastname = document.getElementById('lastname');
  validateElementsName(lastname, error_message)
  hyphenFirstandLastNameManager(lastname);
  
  
  //EMAIL FIELD 
  // modal email error message
  let email =  document.getElementById('email');
  let emailConfirmation = document.getElementById('email-confirmation');
  validateElementEmail(email, error_message);
  validateElementEmail2(emailConfirmation, error_message);
  identicalEmail(email, emailConfirmation, error_message);
  identicalEmail2(email, emailConfirmation, error_message);
  // validateEmail(email,emailConfirmation, error_message);


  //BIRTHDATE FIELD 
  //modal birthdate error message
  const birthdate = document.getElementById('birthdate');
  validateElementBirthdateAndTournament(birthdate, error_message);
  
  //TOURNAMENT FIELD 
  //modal tournament error message
  const tournament = document.getElementById('tournament-quantity');
  validateElementBirthdateAndTournament(tournament, error_message);


  //ERROR MESSAGES CONTENT DISPLAY END ================================================================
  



  //LOCATION CHECKBOX START =====================================================================

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
    
  //LOCATION CHECKBOX END =====================================================================



  //SUBMIT MODAL FORM START ===========================================================

  //modal submit validation form negative or positive  

  let formSub = document.getElementById('form-submit');

  formSub.addEventListener('click', function (canSubmit){

    validateLocation()
    // console.log(locChecked)

    if (locChecked !=true) {
      canSubmit.preventDefault();
      // console.log(`can't submit`);

    } else {
      // console.log('submit');
      

  //     //modal submit validation message

  //     //validation message display container
  //     const myBody = document.querySelector("body");
  //     const myDivContainer = document.createElement("div");
  //     myBody.appendChild(myDivContainer);
  //     myDivContainer.classList.add("submitok");
  //     setTimeout(() => {myDivContainer.style.display = "none"}, 2000);


  //     //validation message --> text message
  //     const myDiv = document.createElement("div");
  //     myDivContainer.appendChild(myDiv);
  //     myDiv.classList.add("submitok__message");
  //     myDiv.textContent = data.validation.submit_validation_message;


  //     //delays the reloading of the dom after validation of the form
  //     const form = document.querySelector('form');
  //     form.addEventListener('submit', (event) => {
  //       event.preventDefault();
  //       setTimeout(() => {window.location.reload();}, 2000);
  //     });
    }
  });
  
  //SUBMIT MODAL FORM END ===========================================================






  //DEV START
  
  //modal automatic spawn (simulates a click automatically)
  const btnClick = document.querySelector('.btn-signup.modal-btn');
  btnClick.click();


  // //form all values befor user entry
  // const form = document.querySelector('form');
  // const inputsValue = form.querySelectorAll('input');
  
  // inputsValue.forEach(inputsValue => {
  //   console.log(inputsValue.value);
  // });

  // //form all values after user entry
  // form.addEventListener('input', (event) => {
  //   console.log(event.target.value);
  // });


  // //value before user entry for birthdate
  // const birthDate = document.getElementById('birthdate').value;
  // console.log(`Before entry : ` , birthDate);


  // // value after user entry for birthdate
  //   const devBirthDateAfter = document.getElementById('birthdate');
  //   devBirthDateAfter.addEventListener('input', (event) => {
  //     let devBirthDateNewEntry = event.target.value;
  //     console.log(`After entry : ` , devBirthDateNewEntry);
  //   });
    

  //DEV END


} //END OF DO IT FUNCTION




//CONTENT.JSON START ==========================================================

// recovery of error or validation messages in content.json
window.onload = async ()=>{
  fetch('./content.json')
  .then(response => response.json())
  .then(data => doIt(data));
}

//CONTENT.JSON END ==========================================================

//MODAL FORM END =======================================================================================================================================