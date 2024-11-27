const steps = document.querySelectorAll('.step');
let currentStep = 0;
const formData = {};


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

function isValidFullName() {
  const companyNameField = document.getElementById('fullName');
  const errorField = document.getElementById('fullName-error');
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
  const phoneNumberField = document.getElementById('phoneNumber');
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
document.getElementById('fullName').addEventListener('input', isValidFullName);
document.getElementById('phoneNumber').addEventListener('input', isValidNumber);

// Navigation button event listeners
document.querySelector('#next-to-step-2').addEventListener('click', () => {
  if (checkInputs() && isValidCompanyName() && isValidFullName() && isValidNumber()) {
    currentStep = 1; // Move to Step 2
    showStep(currentStep);
    updateProgress(1);
    captureData(1);
    nextStep(1);
  }
});





document.querySelector('#next-to-step-3').addEventListener('click', () => {
  if (
    document.getElementById('fullName').value.trim() &&
    document.getElementById('department').value.trim() &&
    document.getElementById('phoneNumberSelection').value.trim() &&
    isValidEmail() // Ensure email is valid before proceeding
  ) {
    currentStep = 2; // Proceed to Step 3
    showStep(currentStep);
    updateProgress(2);
    captureData(2);
    nextStep(2);
  } else {
    alert('Please complete all required fields with valid information in Step 2.');
  }
});


document.querySelector('#submit').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
  const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
  const consentCheckbox = document.getElementById('t&c').checked;

  if (checkInputs() && isChecked && isValidChallenges() && consentCheckbox) {
    submitForm();
  } else {
    if (!consentCheckbox) {
      alert('You must agree to be contacted by FYNIXS to proceed.');
    } else if (!isChecked) {
      alert('Please select at least one service.');
    } else {
      alert('Please complete all required fields with valid information in Step 3.');
    }
  }
});





document.querySelector('#prev-to-step-1').addEventListener('click', () => {
  currentStep = 0;
  showStep(currentStep);
  updateProgress(0);
  navigateToStep(0);
});

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
  document.getElementById('currentChallenges').addEventListener('input', function () {
    const textArea = this;
    const errorField = document.getElementById('challengesError'); // Add an element for error display if not already there
    const minLength = 50;
  
    if (textArea.value.trim().length < minLength) {
      errorField.textContent = `Please enter at least ${minLength} characters.`;
      errorField.style.color = "#FF5733";
      textArea.style.borderColor = "#FF5733";
    } else {
      errorField.textContent = "";
      textArea.style.borderColor = "#00D9FF"; // Reset to valid border color
    }
  });
  
  function isValidChallenges() {
    const textArea = document.getElementById('currentChallenges');
    const errorField = document.getElementById('challengesError');
    const minLength = 50;
  
    if (textArea.value.trim().length < minLength) {
      errorField.textContent = `Please enter at least ${minLength} characters.`;
      errorField.style.color = "#FF5733";
      textArea.style.borderColor = "#FF5733";
      return false;
    } else {
      errorField.textContent = "";
      textArea.style.borderColor = "#00D9FF"; // Reset border color
      return true;
    }
  }
  
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
  const url = "https://cors-anywhere.herokuapp.com/https://hooks.zapier.com/hooks/catch/20714053/2rj11nk/";


  // Prepare the data for submission
  const formData = {
    companyName: document.getElementById("companyName").value,
    industry: document.getElementById("industry").value,
    otherIndustry: document.getElementById("other-industry-container").style.display === "block" 
      ? document.querySelector("#other-industry-container input").value 
      : null,
    website: document.getElementById("website").value,
    companySize: document.getElementById("companySize").value,
    country: document.getElementById("country").value,
    fullName: document.getElementById("fullName").value,
    department: document.getElementById("department").value,
    contactEmail: document.getElementById("contactEmail").value,
    phoneNumberSelection: document.getElementById("phoneNumberSelection").value,
    phoneNumber: document.querySelector(".phone-number input").value,
    currentChallenges: document.getElementById('currentChallenges').value,
    referral: document.getElementById('referral').value,
   additionalComments:document.getElementById('additionalComments').value
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
          // Redirect to submit.html upon successful submission
          window.location.href = "thankyou.html";
      } else {
          throw new Error("Network response was not ok.");
      }
  })
  .catch(error => {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
  });
}


// Select all progress bar steps
const progressSteps = document.querySelectorAll('.bar');

let completedSteps = 0; // Update this variable as steps are completed

// Function to navigate to a specific step
function navigateToStep(stepNumber) {
  // Update the current step
  currentStep = stepNumber;

  // Show the requested step (you'll need to implement this)
  showStep(currentStep);

  // Update the progress bar UI to reflect the active step
  updateProgress(currentStep);
}

// Function to show the step (update form display based on step number)
function showStep(stepNumber) {
  const steps = document.querySelectorAll('.form-step'); // Replace with your step containers
  steps.forEach((step, index) => {
    step.style.display = index === stepNumber ? 'block' : 'none';
  });
}

// Function to update progress bar states
function updateProgress(stepNumber) {
  progressSteps.forEach((step, index) => {
    // Add 'completed' class for all steps before and including the current step
    if (index <= stepNumber) {
      step.classList.add('completed');
    } else {
      step.classList.remove('completed');
    }

    // Add 'active' class to the current step only
    if (index === stepNumber) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
}
