
// DISPLAY START ==========================================================

// manages the display of the nav in low resolutions

function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DISPLAY END ==========================================================



// REGEX START ==========================================================

function regexTournament(event) {
  // only numbers 0 to 9
  event.target.value = event.target.value.replace([0 - 9], '');

  // maximum 2 numbers
  if (event.target.value.length > 2) {
    event.target.value = event.target.value.slice(0, 2);
  }
}

// REGEX END ==========================================================



// MODAL FORM START =======================================================================================================================================

function doIt(data) {

  const error_message = data.error;

  // LAUNCH & CLOSE MODAL FORM START

  const modalBg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const modalClose = document.querySelector(".close");

  const launchModal = (modal) => { modal.style.display = "block"; }
  const closeModal = (modal) => { modal.style.display = "none"; }

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener('click', () => launchModal(modalBg)));

  //close modal event
  modalClose.addEventListener('click', () => closeModal(modalBg));

  // LAUNCH & CLOSE MODAL FORM END



  //INPUT FIELD MANAGEMENT START 

  // Hyphen management for first and last name fields
  function hyphenFirstandLastNameManager(inputFieldName) {
    inputFieldName.addEventListener('input', (event) => {
      let name = event.target.value
      let name1 = name.trim()
      let name2 = name1.replace('--', '-')
      if (name.length !== name2.length) {
        inputFieldName.value = name2
        inputFieldName.dispatchEvent(new Event('input', { bubbles: true }))
      }
    })
  }

  // INPUT FIELD MANAGEMENT END ==========================================================




  //ERROR MESSAGES CONTENT DISPLAY START ================================================================

  // After value entry for valueMissing
  Validator.fieldRequired(error_message);

  //FIRSTNAME FIELD
  //modal firstname error messages
  const firstname = document.getElementById('firstname');
  Validator.elementsName(firstname, error_message);
  hyphenFirstandLastNameManager(firstname);


  //LASTNAME FIELD 
  //modal lastname error messages
  const lastname = document.getElementById('lastname');
  Validator.elementsName(lastname, error_message)
  hyphenFirstandLastNameManager(lastname);


  //EMAIL FIELD 
  // modal email error message
  let emailInputs = document.querySelectorAll('input[type="email"]');
  Validator.email(emailInputs, error_message);
  Validator.emailIdentical(emailInputs, error_message);




  //BIRTHDATE FIELD 
  //modal birthdate error message
  const birthdate = document.getElementById('birthdate');
  Validator.validateElementBirthdateAndTournament(birthdate, error_message);
  Validator.isMajor(birthdate, error_message);

  //TOURNAMENT FIELD 
  //modal tournament error message
  const tournament = document.getElementById('tournament-quantity');
  Validator.validateElementsBirthdateAndTournament(tournament, error_message);


  //ERROR MESSAGES CONTENT DISPLAY END ================================================================




  //LOCATION CHECKBOX START =====================================================================

  //modal location validation
  let locChecked = false;

  function validateLocation() {
    let checkboxes = document.querySelectorAll("input[name='location']");

    locChecked = false;
    checkboxes.forEach((checkbox) => isLocated(checkbox));
  }

  function isLocated(checkbox) {
    locChecked = checkbox.checked || locChecked;
  }

  //LOCATION CHECKBOX END =====================================================================



  //SUBMIT MODAL FORM START ===========================================================

  //modal submit validation form negative or positive  

  let formSub = document.getElementById('form-submit');

  formSub.addEventListener('click', function (canSubmit) {

    validateLocation()
    // console.log(locChecked)

    if (locChecked != true) {
      canSubmit.preventDefault();
      // console.log(`can't submit`);

    } else {
      // console.log('submit');


      //modal submit validation message

      //validation message display container
      const myBody = document.querySelector("body");
      const myDivContainer = document.createElement("div");
      myBody.appendChild(myDivContainer);
      myDivContainer.classList.add("submitok");
      setTimeout(() => { myDivContainer.style.display = "none" }, 2000);


      //validation message --> text message
      const myDiv = document.createElement("div");
      myDivContainer.appendChild(myDiv);
      myDiv.classList.add("submitok__message");
      myDiv.textContent = data.validation.submit_validation_message;


      //delays the reloading of the dom after validation of the form
      const form = document.querySelector('form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        setTimeout(() => { window.location.reload(); }, 2000);
      });
    }
  });

  //SUBMIT MODAL FORM END ===========================================================






  //DEV START

  // [DEBUG] modal automatic spawn (simulates a click automatically)
  document.querySelector('.btn-signup.modal-btn').click();


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
window.onload = async () => {
  fetch('./content.json')
    .then(response => response.json())
    .then(data => doIt(data));
}

//CONTENT.JSON END ==========================================================

//MODAL FORM END =======================================================================================================================================