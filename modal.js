
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


//MODAL FORM ==========================================================

function doIt(data) {

  const error_message = data.error;
  
  
  //Hyphen management for first and last name fields

  function hyphenFirstandLastNameManager(inputFieldName){
    inputFieldName.addEventListener('input', (e) => {
      let name = e.target.value
      let name1 = name.replace('--','-')
      if (name.length!==name1.length) {
        e.target.value = name1
      }
    });
  }


  //Validation of the first and last name fields

  function validateElementString(inputFieldName, entryError) {
    
    inputFieldName.addEventListener('input', function() {

      if(inputFieldName.validity.valueMissing){
        inputFieldName.setCustomValidity(entryError.required_field);
      
      } else if(inputFieldName.validity.tooShort){
        inputFieldName.setCustomValidity(entryError.two_letters_minimum);
        
      } else if(inputFieldName.validity.patternMismatch){
        inputFieldName.setCustomValidity(entryError.authorized_characters);
        
      } else if(inputFieldName.validity.patternMismatch && inputFieldName.validity.tooShort){
          inputFieldName.setCustomValidity(entryError.two_letters_and_authorized_characters);

      } else {
        inputFieldName.setCustomValidity("");
      }
    })
  }


  
  
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
  


  //FIRSTNAME FIELD ===========================================================

  //modal firstname error message
  const firstname = document.getElementById('firstname');
  validateElementString(firstname, error_message);
  hyphenFirstandLastNameManager(firstname);
 


  //LASTNAME FIELD ===========================================================

  //modal lastname error message
  const lastname = document.getElementById('lastname');
  validateElementString(lastname, error_message)
  hyphenFirstandLastNameManager(lastname);



  //EMAIL FIELD ===========================================================

  // modal email error message

  const email = document.getElementById('email');
  console.log(email)

  email.addEventListener('keyup', function() {
    if(email.validity.typeMismatch){
      email.setCustomValidity(`Veuillez entrer une adresse email correcte de type: "link@zelda.com"`);
    }else {
      email.setCustomValidity("");
    }
  });



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


  //modal automatic spawn (simulates a click automatically)

  //DEV START

  const btnClick = document.querySelector('.btn-signup.modal-btn');
  btnClick.click();

  //DEV END

}



//CONTENT.JSON ==========================================================

// recovery of error or validation messages in the .json

window.onload = async ()=>{
  fetch('./content.json')
  .then(response => response.json())
  .then(data => doIt(data));
}