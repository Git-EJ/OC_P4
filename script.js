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



// REGEX TOURNAMENT START ==========================================================
function regexTournament(event) {
  const target = event.target;
  // only numbers 0 to 9
  target.value = target.value.replace([0 - 9], '');

  // maximum 2 numbers
  if (target.value.length > 2) {
    target.value = target.value.slice(0, 2);
  }
}
// REGEX TOURNAMENT END ==========================================================



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

  // Before and After value entry for valueMissing
  const allInputs = document.querySelectorAll('input[required]');
  Validator.fieldRequiredBeforeUserEntry(allInputs, error_message);
  Validator.fieldRequiredAfterUserEntry(error_message);


  //FIRSTNAME FIELD
  const firstname = document.getElementById('firstname');
  // firstname.addEventListener('input', () => { Validator.elementsName(firstname, error_message) } )
  Validator.elementsListenerName( firstname, error_message )
  hyphenFirstandLastNameManager(firstname);


  //LASTNAME FIELD 
  const lastname = document.getElementById('lastname');
  lastname.addEventListener('input', () => { Validator.elementsName(lastname, error_message)})
  Validator.elementsName(lastname, error_message)
  hyphenFirstandLastNameManager(lastname);


  //EMAIL FIELD 
  let emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach((emailInput) => {
    emailInput.addEventListener('input', function (event) {
      if(!Validator.email(emailInput, error_message)) event.stopPropagation()
      if(!Validator.emailIdentical(emailInputs[0], emailInputs[1], error_message)) event.stopPropagation()

    })
  })
  

  //BIRTHDATE FIELD 
  const birthdate = document.getElementById('birthdate');
  birthdate.addEventListener('input', function (event)  {
    if (!Validator.elementBirthdate(birthdate)) event.stopPropagation()
    if (!Validator.isMajor(birthdate, error_message)) event.stopPropagation()
  })


  //TOURNAMENT FIELD 
  const tournament = document.getElementById('tournament-quantity');
  tournament.addEventListener('input', () => { Validator.elementTournament(tournament)})
  Validator.elementTournament(tournament)
  

  // LOCATION FIELD
  const checkboxes = document.querySelectorAll("input[name='location']");
  const invalidLocationBorderColor = document.querySelectorAll('.checkbox-label .checkbox-icon');
  const emptyLocationMessage = error_message;
 
  
  //TERMS AND CONDITIONS FIELD
  const term = document.getElementById('checkbox1');
  const termStyle = document.getElementById('terms-style');
  const emptyTermMessage = error_message;

  //ERROR MESSAGES CONTENT DISPLAY END ==================================================================


  
  //LOCATION CHECKBOX START =====================================================================
  // location checkboxes listenner
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () =>{
      Validator.location (checkboxes, invalidLocationBorderColor, emptyLocationMessage)
    }); 
  });
  //LOCATION CHECKBOX END =====================================================================


  // //TERMS AND CONDITIONS CHECKBOX START =====================================================================
  // terms checkboxes listenner
  term.addEventListener('click', () =>{
    Validator.elementTerm (term, termStyle, emptyTermMessage)
  });
  // TERMS AND CONDITIONS CHECKBOX END =======================================================================

  


  //SUBMIT MODAL FORM START ===========================================================

  //modal submit validation

  let formSub = document.getElementById('form-submit');
  
  // for checkbox fields
  const invalidateEvent = (event) => {
    event.preventDefault()
    event.stopPropagation()
    return null
  }


  // for input fields 
  const stopPropagation = (event) => {
    event.stopPropagation()
    return null
  }


  formSub.addEventListener('click', function (event) {

    //firstname fields validation
    if (!Validator.elementsName(firstname, error_message)) {
      return stopPropagation(event)
    }

    //lastname fields validation
    if (!Validator.elementsName(lastname, error_message)) {
      return stopPropagation(event)
    }

    //email fields validation
    let confirmMail = true
    emailInputs.forEach((emailInput) => {
      if (!Validator.email(emailInput, error_message)) {
        confirmMail = false
        return null
      }
    })
    if (!confirmMail) 
      return stopPropagation(event)

    if (!Validator.emailIdentical(emailInputs[0], emailInputs[1], error_message)) 
        return stopPropagation(event)


    //birthdate field validation
    if(!Validator.elementBirthdate(birthdate, error_message))
      return stopPropagation(event)

    if(!Validator.isMajor(birthdate, error_message))
      return stopPropagation(event)

    //tournament field validation
    if (!Validator.elementTournament(tournament, error_message))
      return stopPropagation(event)

    // location field validation
    if (!Validator.location (checkboxes, invalidLocationBorderColor, emptyLocationMessage)) 
      return invalidateEvent(event)
    

    // terms field validation
    if (!Validator.elementTerm(term, termStyle, emptyTermMessage)) 
      return invalidateEvent(event)
    
    


    // modal submit validation message

    // validation message display container
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

  });

  //SUBMIT MODAL FORM END ===========================================================


  //DEV START

  //modal automatic spawn (simulates a click automatically)
  document.querySelector('.btn-signup.modal-btn').click();

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