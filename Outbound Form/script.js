const steps = document.querySelectorAll('.step');
let currentStep = 0;
const formData = {};
const phoneInput = document.getElementById("phone");

// Initialize intl-tel-input
const iti = window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// Get the country dial code
function getCountryCode() {
  const countryData = iti.getSelectedCountryData();
  return countryData.dialCode; // Returns the country dial code (e.g., "1" for the US)
}


// Function to show the current step
function showStep(step) {
  steps.forEach((el, index) => el.style.display = index === step ? 'block' : 'none');
  checkInputs(); // Check inputs every time a step is shown
}

// Validate website URL
function isValidWebsite() {
  const websiteField = document.getElementById('website');
  const errorField = document.getElementById('websiteError');
  const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-]*)*$/i;

  if (!urlPattern.test(websiteField.value.trim()) && websiteField.value.trim() !== "") {
    errorField.textContent = "Please enter a valid website URL (e.g., https://example.com).";
    errorField.style.color = "#FF5733";
    websiteField.style.borderColor = "#FF5733";
    return false;
  } else {
    errorField.textContent = "";
    websiteField.style.borderColor = "#00D9FF";
    return true;
  }
}

// Validate  text pattern
function isValidCompanyName() {
  const companyNameField = document.getElementById('companyName');
  const errorField = document.getElementById('company-name-error');
  const namePattern = /^[a-zA-Z\s0-9]+$/; // Allows letters, spaces, and numbers but no symbols


  if (!namePattern.test(companyNameField.value.trim()) && companyNameField.value.trim() !== "") {
    errorField.textContent = "No Symbols Allowed";
    errorField.style.color = "#FF5733";
    companyNameField.style.borderColor = "#FF5733";
    return false;
  } else {
    errorField.textContent = "";
    companyNameField.style.borderColor = "#00D9FF";
    return true;
  }
}

function isValidFirstName() {
  const companyNameField = document.getElementById('firstName');
  const errorField = document.getElementById('firstName-error');
  const namePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces

  if (!namePattern.test(companyNameField.value.trim()) && companyNameField.value.trim() !== "") {
    errorField.textContent = "No Number or Symbols Allowed";
    errorField.style.color = "#FF5733";
    companyNameField.style.borderColor = "#FF5733";
    return false;
  } else {
    errorField.textContent = "";
    companyNameField.style.borderColor = "#00D9FF";
    return true;
  }
}
function isValidlastName() {
  const companyNameField = document.getElementById('lastName');
  const errorField = document.getElementById('lastName-error');
  const namePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces

  if (!namePattern.test(companyNameField.value.trim()) && companyNameField.value.trim() !== "") {
    errorField.textContent = "No Number or Symbols Allowed";
    errorField.style.color = "#FF5733";
    companyNameField.style.borderColor = "#FF5733";
    return false;
  } else {
    errorField.textContent = "";
    companyNameField.style.borderColor = "#00D9FF";
    return true;
  }
}

function isValidNumber() {
  const phoneNumberField = document.getElementById('phone');
  const errorField = document.getElementById('numberEror');
  const phonePattern = /^[0-9]+$/; // Only digits

  if (!phonePattern.test(phoneNumberField.value.trim()) && phoneNumberField.value.trim() !== "") {
    errorField.textContent = "No Letters or Symbols Allowed";
    errorField.style.color = "#FF5733";
    phoneNumberField.style.borderColor = "#FF5733";
    return false;
  } else {
    errorField.textContent = "";
    phoneNumberField.style.borderColor = "#00D9FF";
    return true;
  }
}

// Check if all required inputs in the current step are valid
function checkInputs() {
  const currentStepInputs = steps[currentStep].querySelectorAll('input[required], select[required], textarea[required]');
  const nextButton = steps[currentStep].querySelector('button.next');

  let allValid = true;

  currentStepInputs.forEach(input => {
    if (!input.value.trim()) {
      allValid = false;
    }
  });

  // Validate website field specifically if it's on the current step
  if (currentStep === 0) {
    allValid = allValid && isValidWebsite();
  }

  // Enable or disable the Next button based on validation
  if (nextButton) {
    nextButton.disabled = !allValid;
  }

  return allValid;
}

// Attach event listeners to dynamically validate inputs
document.querySelectorAll('input[required], select[required]').forEach(input => {
  input.addEventListener('input', checkInputs);
});

// all input validation listener
document.getElementById('website').addEventListener('input', isValidWebsite);
document.getElementById('companyName').addEventListener('input', isValidCompanyName);
document.getElementById('firstName').addEventListener('input', isValidFirstName);
document.getElementById('lastName').addEventListener('input', isValidlastName);
document.getElementById('phone').addEventListener('input', isValidNumber);




document.querySelector('#prev-to-step-1').addEventListener('click',previousStep1());
// Navigation button event listeners
document.querySelector('#next-to-step-2').addEventListener('click', () => {
  
  if (checkInputs() && isValidCompanyName()  ) {
    currentStep = 1; // Move to Step 2
    showStep(currentStep);
    updateProgress(1);
    captureData(1);
    
    document.getElementById('business-objectivesSelect').value.trim() 
    // completedSteps = 2;
  }else{
    showErrorModal("Oops! Please make sure to fill out all the required fields correctly in step 1 before proceeding.");
  }
});



document.querySelector('#next-to-step-3').addEventListener('click', () => {
  const phoneInput = document.getElementById('phone');
  const countryCode = iti.getSelectedCountryData().dialCode; // Get country code
  const isPhoneValid = iti.isValidNumber(); // Validate the phone number

  if (
    // document.getElementById('fullName').value.trim() &&
    document.getElementById('department').value.trim() &&
    isValidEmail() && // Ensure email is valid before proceeding
    isPhoneValid && // Ensure phone number is valid
    countryCode && // Ensure country code is selected
    phoneInput.value.trim() && // Ensure phone input is not empty
    isValidFirstName() &&
    isValidlastName()
  ) {
    currentStep = 2; // Proceed to Step 3
    showStep(currentStep);
    updateProgress(2);
    captureData(2);
    completedSteps = 3;
  } else {
    showErrorModal(
      "Oops! Please make sure to fill out all the required fields correctly, including a valid phone number with a country code, before proceeding."
    );
  }
});



document.querySelector('#submit').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
  const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
  const consentCheckbox = document.getElementById('followup-consent').checked;

  if (checkInputs() && isChecked && consentCheckbox) {
    submitForm();
    completedSteps = 4;
    
  } else {
      showErrorModal("Oops! Please make sure to fill out all the required fields before proceeding.");
    if (!consentCheckbox) {
      showErrorModal("You must agree to be contacted by FYNIXS to proceed.");
    
    } else {
      showErrorModal("Oops! Please make sure to fill out all the required fields before proceeding.");
    }
  }
});




function previousStep1(){
  document.querySelector('#prev-to-step-1').addEventListener('click', () => {
    currentStep = 0;
    showStep(currentStep);
    updateProgress(0);
    navigateToStep(0);
  
  });
}


document.querySelector('#prev-to-step-2').addEventListener('click', () => {
  currentStep = 1;
  showStep(currentStep);
  updateProgress(1);
  navigateToStep(1);
});

// Initialize the first step
showStep(currentStep);



  

  // Email validation
document.getElementById("contactEmail").addEventListener("input", function () {
  const emailField = this;
  const emailErrorField = document.getElementById("emailError");
  const nextButton = document.getElementById("next-to-step-2");
  
  // Regex to validate an email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailField.value.match(emailPattern) && emailField.value.trim() !== "") {
    emailErrorField.textContent = "Please enter a valid email address (e.g., info@fynxs.com).";
    emailErrorField.style.color = "#FF5733"; // Error text color
    emailField.style.borderColor = "#FF5733"; // Highlight input in red
    nextButton.disabled = true; // Disable the button
  } else if (emailField.value.match(emailPattern)) {
    emailErrorField.textContent = "";
    emailField.style.borderColor = "#00D9FF"; // Reset border color to valid
    nextButton.disabled = false; // Enable the button
  } else {
    nextButton.disabled = true; // Disable the button for empty input
  }
});



function isValidEmail() {
  const emailField = document.getElementById("contactEmail");
  const emailErrorField = document.getElementById("emailError");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(emailField.value.trim())) {
    emailErrorField.textContent = "Please enter a valid email address (e.g., example@example.com).";
    emailErrorField.style.color = "#FF5733"; // Error text color
    emailField.style.borderColor = "#FF5733"; // Highlight input in red
    return false;
  } else {
    emailErrorField.textContent = "";
    emailField.style.borderColor = "#00D9FF"; // Reset border color to valid
    return true;
  }
} 
// country validation
document.getElementById("country").addEventListener("input", function () {
    const countryField = this;
    const countryErrorField = document.getElementById("emailError");
    const nextButton = document.getElementById("next-to-step-2");
    
    if (!countryField.value) {
      countryErrorField.textContent = "Please select a valid country.";
      countryErrorField.style.color = "#FF5733"; // Error text color
      countryField.style.borderColor = "#FF5733"; // Highlight input in red
      return false;
    } else {
      countryErrorField.textContent = "";
      countryField.style.borderColor = "#00D9FF"; // Reset border color to valid
      return true;
    }
  });
  
  function isValidCountry() {
    const countryField = document.getElementById("country");
    const countryErrorField = document.getElementById("countryError");
    const countryList = Array.from(document.querySelectorAll("#country-list option")).map(
      (option) => option.value
    );
  
    if (!countryList.includes(countryField.value)) {
      countryErrorField.textContent = "Please select a valid country from the list.";
      countryErrorField.style.color = "#FF5733"; // Error text color
      countryField.style.borderColor = "#FF5733"; // Highlight input in red
      return false;
    } else {
      countryErrorField.textContent = "";
      countryField.style.borderColor = "#00D9FF"; // Reset border color to valid
      return true;
    }
  }

  // document.getElementById('currentChallenges').addEventListener('input', function () {
  //   const textArea = this;
  //   const errorField = document.getElementById('challengesError'); // Add an element for error display if not already there
  //   const minLength = 50;
  
  //   if (textArea.value.trim().length < minLength) {
  //     errorField.textContent = `Please enter at least ${minLength} characters.`;
  //     errorField.style.color = "#FF5733";
  //     textArea.style.borderColor = "#FF5733";
  //   } else {
  //     errorField.textContent = "";
  //     textArea.style.borderColor = "#00D9FF"; // Reset to valid border color
  //   }
  // });
  
  // function isValidChallenges() {
  //   const textArea = document.getElementById('currentChallenges');
  //   const errorField = document.getElementById('challengesError');
  //   const minLength = 50;
  
  //   if (textArea.value.trim().length < minLength) {
  //     errorField.textContent = `Please enter at least ${minLength} characters.`;
  //     errorField.style.color = "#FF5733";
  //     textArea.style.borderColor = "#FF5733";
  //     return false;
  //   } else {
  //     errorField.textContent = "";
  //     textArea.style.borderColor = "#00D9FF"; // Reset border color
  //     return true;
  //   }
  // }
  
  document.getElementById('industry').addEventListener('change', function () {
    const otherIndustryInput = document.getElementById('other-industry-container');
    const otherIndustryField = document.getElementById('other-industry');
    const selectedIndustry = this.value;
  
    // Show the input field and make it required if "Other" is selected
    if (selectedIndustry === 'other') {
      otherIndustryInput.style.display = 'block';
      otherIndustryField.setAttribute('required', 'true');  // Make it required
    } else {
      otherIndustryInput.style.display = 'none';
      // otherIndustryField.removeAttribute('required');  // Remove the required attribute
    }
  });




// Select all progress bars and the progress line
const bars = document.querySelectorAll(".bar");
const progressBar = document.querySelector(".progress-bar");



// Update progress bar
function updateProgress(currentStep) {
  const totalSteps = bars.length;

  // Update progress bar width
  const progressPercent = (currentStep / (totalSteps - 1)) * 90;
  progressBar.style.width = progressPercent + "%";

  // Update bar states
  bars.forEach((bar, index) => {
    if (index < currentStep) {
      bar.classList.add("completed");
      bar.classList.remove("active");
    } else if (index === currentStep) {
      bar.classList.add("active");
      bar.classList.remove("completed");
    } else {
      bar.classList.remove("active", "completed");
    }
  });
}

function captureData(stepNumber) {
  // Capture data from the current step inputs
  const step = document.getElementById(`step-${stepNumber}`);
  const inputs = step.querySelectorAll("input, select,textarea"); // Ensure we include select
  inputs.forEach(input => {
    formData[input.name] = input.value;
  });
}

function submitForm() {
  // Capture data from the final step
  captureData(3);

  // Define your Zapier webhook URL

  // https://cors-anywhere.herokuapp.com/
  const url = "https://hooks.zapier.com/hooks/catch/20862443/2ir9bsz/";

  const dialCode = getCountryCode();
  const phoneNumber = phoneInput.value;



  // Prepare the data for submission
  const formData = {
    CompanyName: document.getElementById("companyName").value,
    Industry: document.getElementById("industry").value,
    otherIndustry: document.getElementById("other-industry-container").style.display === "block" 
      ? document.querySelector("#other-industry-container input").value 
      : null,
    CompanyWebsite: document.getElementById("website").value,
    CompanySize: document.getElementById("companySize").value,
    BusinessObjective: document.getElementById("business-objectivesSelect").value,
    OtherBusinessObjective: document.getElementById("other-objective").value,
    PainPoints: document.getElementById("pain-points").value,
    Country: document.getElementById("country").value,
    FirstName: document.getElementById("firstName").value,
    LastName: document.getElementById("lastName").value,
    department: document.getElementById("department").value,
    contactEmail: document.getElementById("contactEmail").value,
    CountryCode: dialCode,
    phoneNumber: phoneNumber,
    // currentChallenges: document.getElementById('currentChallenges').value,
    referral: document.getElementById('referral').value,
    otherServices: document.getElementById('other-services').value,
    Services: Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked')).map(checkbox => checkbox.id),
   additionalComments:document.getElementById('additionalComments').value,
   NewsletterConsent: document.getElementById("newsletter-consent").checked // Check if the checkbox is checked

  };
  
  // Send the data via fetch
  fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      // Show the modal with the success message
      showModal("Your form has been submitted successfully!");
  
      // Redirect to thankyou.html after 5 seconds
      setTimeout(() => {
          window.location.href = "thankyou.html";
      }, 1000); // 5000 milliseconds = 5 seconds
    } else {
      console.log(response)
        throw new Error("Network response was not ok.");
    }
  
  })
  .catch(error => {
      console.error("Error submitting form:", error.message);
      alert("There was an error submitting the form. Please try again.");
  });
}

const businessObjectivesSelect = document.getElementById('business-objectivesSelect');
const otherObjectiveInput = document.getElementById('other-objective');

// Add an event listener to check when the user changes the dropdown
businessObjectivesSelect.addEventListener('change', function() {
  // Check if the selected value is "Other"
  if (businessObjectivesSelect.value === 'other') {
    otherObjectiveInput.style.display = 'block'; // Show the "Other" input
  } else {
    otherObjectiveInput.style.display = 'none'; // Hide the "Other" input
  }
});


// Get references to the checkbox and the "Other" input container
const otherCheckbox = document.getElementById('other-checkbox');
const otherServicesContainer = document.getElementById('other-services-container');

// Add an event listener to the checkbox
otherCheckbox.addEventListener('change', function () {
  if (this.checked) {
    // Show the "Other" input container when the checkbox is checked
    otherServicesContainer.style.display = 'block';
  } else {
    // Hide the "Other" input container when the checkbox is unchecked
    otherServicesContainer.style.display = 'none';
  }
});



// Show modal function
function showModal() {
  const modal = document.getElementById("success-modal");
  modal.style.display = "flex"; // Set to flex to make it visible and centered
}

// Close modal function
function closeModal() {
  const modal = document.getElementById("success-modal");
  modal.style.display = "none"; // Hide the modal
}


// Add event listener to the close button
document.querySelector(".close-button").addEventListener("click", closeModal);

// Close the modal when clicking outside the content
window.addEventListener("click", function (event) {
  const modal = document.getElementById("popupModal");
  if (event.target === modal) {
    closeModal();
  }
});


function showErrorModal(message) {
  const errorModal = document.getElementById("error-modal");
  const errorMessage = document.getElementById("error-message");

  // Set the error message
  errorMessage.textContent = message;

  // Show the modal
  errorModal.style.display = "flex";


  errorModal.addEventListener('click' , () => {

  errorModal.style.display = "none";
  })
}

function hideErrorModal() {
  const errorModal = document.getElementById("error-modal");
  errorModal.style.display = "none";
}


function handleIndustryChange(select) {
  const localServiceContainer = document.getElementById("local-service-business-container");
  const otherIndustryContainer = document.getElementById("other-industry-container");
  const localServiceSelect = document.getElementById("local-service-type");
  const otherIndustryInput = document.getElementById("other-industry");

  // Show or hide the local service business dropdown
  if (select.value === "LocalServiceBusiness") {
    localServiceContainer.style.display = "block";
    localServiceSelect.setAttribute("required", "required");
  } else {
    localServiceContainer.style.display = "none";
    localServiceSelect.removeAttribute("required");
  }

  // Show or hide the 'Other' industry input
  if (select.value === "Other") {
    otherIndustryContainer.style.display = "block";
    otherIndustryInput.setAttribute("required", "required");
  } else {
    otherIndustryContainer.style.display = "none";
    otherIndustryInput.removeAttribute("required");
  }
}

function handleLocalServiceChange(select) {
  const otherLocalServiceContainer = document.getElementById("local-service-other-container");
  const otherLocalServiceInput = document.getElementById("local-service-other");

  // Show or hide the input for 'Other' local service type
  if (select.value === "Other") {
    otherLocalServiceContainer.classList.remove("hidden");
    otherLocalServiceInput.setAttribute("required", "required");
  } else {
    otherLocalServiceContainer.classList.add("hidden");
    otherLocalServiceInput.removeAttribute("required");
  }
}

// Get references to the select dropdown and the "Other" input field
const referralSelect = document.getElementById("referral");
const otherReferralContainer = document.getElementById("other-referral-container");
const otherReferralInput = document.getElementById("other-referral");

// Listen for changes to the dropdown
referralSelect.addEventListener("change", () => {
  if (referralSelect.value === "other") {
    // Show the 'Other' input field and make it required
    otherReferralContainer.style.display = "block";
    // otherReferralInput.setAttribute("required", "true");
  } else {
    // Hide the 'Other' input field and remove its required attribute
    otherReferralContainer.style.display = "none";
    otherReferralInput.removeAttribute("required");
    otherReferralInput.value = ""; // Clear the input field
  }
});
