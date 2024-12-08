document.getElementById('website').addEventListener('input', isValidWebsite);
document.getElementById('email').addEventListener('input', function(){
  isValidEmail()
}) ;
// Add event listener to the close button
document.querySelector(".close-button").addEventListener("click", closeModal);
document.getElementById('firstName').addEventListener('input', function () {
  validateNoNumbers(this, 'firstName-error');
});
document.getElementById('lastName').addEventListener('input', function () {
  validateNoNumbers(this, 'lastName-error');
});
document.getElementById('companyName').addEventListener('input', function(){
  validateNoSymbols(this, 'company-name-error');
});

//variables
let currentStep = 1;

// Select all elements with class 'other1', 'other2', and 'other3'
const elements = Array.from(document.querySelectorAll('.other1, .other2, .other3'));

elements.forEach(element => {
  element.addEventListener('input', function() {
    // Determine the error field ID dynamically based on the class of the current element
    let errorFieldId;
    if (element.classList.contains('other1')) {
      errorFieldId = 'other1-error';
    } else if (element.classList.contains('other2')) {
      errorFieldId = 'other2-error';
    } else if (element.classList.contains('other3')) {
      errorFieldId = 'other3-error';
    }
    
    // Call validateField with the current input and the dynamically determined error field ID
    validateFields(this, errorFieldId);
  });
});

  

// document.getElementById('other-industry').addEventListener('input', function(){
//   validateOnlyLetters(this, 'other-industry-error')
// });
// document.getElementById('local-service-other').addEventListener('input', function(){
//   validateOnlyLetters(this, 'other-industryLS-error')
// });

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

function isValidWebsite(inputField, errorFieldId) {
  const errorField = document.getElementById(errorFieldId);
  const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-]*)*$/i;

  if (!urlPattern.test(inputField.value.trim()) && inputField.value.trim() !== "") {
    errorField.textContent = "Enter a valid URL (e.g., https://example.com).";
    errorField.style.color = "#FF5733";
    inputField.style.borderColor = "#FF5733";
    return false;
  } else {
    errorField.textContent = "";
    inputField.style.borderColor = "#00D9FF";
    return true;
  }
}

function isValidEmail(inputField, errorFieldId) {
  const errorField = document.getElementById(errorFieldId);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(inputField.value.trim())) {
    errorField.textContent = "Please enter a valid email.";
    errorField.style.color = "#FF5733";
    inputField.style.borderColor = "#FF5733";
    return false;
  } else {
    errorField.textContent = "";
    inputField.style.borderColor = "#00D9FF";
    return true;
  }
}


// Reusable Function to Validate No Numbers
function validateNoNumbers(inputField, errorFieldId) {
  const noNumbersPattern = /^[^0-9]+$/; // Disallow numbers
  const errorField = document.getElementById(errorFieldId);

  if (!noNumbersPattern.test(inputField.value.trim()) && inputField.value.trim() !== "") {
    errorField.textContent = "No numbers allowed.";
    errorField.style.color = "#FF5733"; // Error color
    inputField.style.borderColor = "#FF5733"; // Red border for invalid input
    return false;
  } else {
    errorField.textContent = "";
    inputField.style.borderColor = "#00D9FF"; // Blue border for valid input
    return true;
  }
}

// Function to check if the input contains only letters (ALLOWED)
function validateOnlyLetters(inputField, errorFieldId) {
  const onlyLettersPattern = /^[a-zA-Z\s]+$/; // Pattern to allow only letters and spaces
  const errorField = document.getElementById(errorFieldId);

  if (!onlyLettersPattern.test(inputField.value)) {
    errorField.textContent = "Only letters and spaces are allowed.";
    errorField.style.color = "#FF5733"; // Error color
    inputField.style.borderColor = "#FF5733"; // Red border
    return false;
  } else {
    errorField.textContent = "";
    inputField.style.borderColor = "#00D9FF"; // Valid border
    return true;
  }
}

function validateNoSymbols(inputField, errorFieldId) {
  const noSymbolsPattern = /^[a-zA-Z0-9\s]+$/; // Allows only letters, numbers, and spaces
  const errorField = document.getElementById(errorFieldId);

  if (!noSymbolsPattern.test(inputField.value.trim()) && inputField.value.trim() !== "") {
    errorField.textContent = "Symbols are not allowed.";
    errorField.style.color = "#FF5733"; // Error color
    inputField.style.borderColor = "#FF5733"; // Red border for invalid input
    return false;
  } else {
    errorField.textContent = "";
    inputField.style.borderColor = "#00D9FF"; // Blue border for valid input
    return true;
  }
}
  
// Close the modal when clicking outside the content
window.addEventListener("click", function (event) {
    const modal = document.getElementById("popupModal");
    if (event.target === modal) {
      closeModal();
    }
});
  
document.getElementById("role").addEventListener("change", function () {
  const otherRoleInput = document.getElementById("other-role");

  if (this.value === "Other") {
    // Show the "Other" input field
    otherRoleInput.style.display = "block";
    otherRoleInput.setAttribute("required", "required");
  } else {
    // Hide the "Other" input field and remove the required attribute
    otherRoleInput.style.display = "none";
    otherRoleInput.removeAttribute("required");
    otherRoleInput.value = ""; // Clear the input value if hidden
  }
});
  
function showErrorModal(message) {
    const errorModal = document.getElementById("error-modal");
    const errorMessage = document.getElementById("error-message");
  
    // Set the error message
    errorMessage.textContent = message;
  
    // Show the modal
    errorModal.style.display = "flex";
}
  
function hideErrorModal() {
    const errorModal = document.getElementById("error-modal");
    errorModal.style.display = "none";
}

// Function to handle changes in the "industry" dropdown
function handleIndustryChange(industryDropdown) {
    const otherIndustryContainer = document.getElementById("other-industry-container");
    const otherIndustryInput = document.getElementById("other-industry");
  
    const localServiceContainer = document.getElementById("local-service-business-container");
    const localServiceDropdown = document.getElementById("local-service-type");
  
    const localServiceOtherContainer = document.getElementById("local-service-other-container");
    const localServiceOtherInput = document.getElementById("local-service-other");
  
    // Reset visibility and requirements for all dynamic inputs
    otherIndustryContainer.style.display = "none";
    otherIndustryInput.required = false;
    otherIndustryInput.value = "";
  
    localServiceContainer.style.display = "none";
    localServiceDropdown.required = false;
    localServiceDropdown.value = "";
  
    localServiceOtherContainer.style.display = "none";
    localServiceOtherInput.required = false;
    localServiceOtherInput.value = "";
  
    // Handle visibility based on the selected industry
    if (industryDropdown.value === "other") {
      // Show and require the "Other Industry" input
      otherIndustryContainer.style.display = "block";
      otherIndustryInput.required = true;
    } else if (industryDropdown.value === "LocalServiceBusiness") {
      // Show and require the "Local Service Business" dropdown
      localServiceContainer.style.display = "block";
      localServiceDropdown.required = true;
    }
}
  
  // Function to handle changes in the "local service type" dropdown
function handleLocalServiceChange(localServiceDropdown) {
    const localServiceOtherContainer = document.getElementById("local-service-other-container");
    const localServiceOtherInput = document.getElementById("local-service-other");
  
    // Reset visibility and requirement for the "Other Local Service" field
    localServiceOtherContainer.style.display = "none";
    localServiceOtherInput.required = false;
    localServiceOtherInput.value = "";
  
    // Show and require the "Other Local Service" input only if "Other" is selected
    if (localServiceDropdown.value === "Other") {
      localServiceOtherContainer.style.display = "block";
      localServiceOtherInput.required = true;
    }
}

// Function to show the specific step
function showStep(step) {
  const steps = document.querySelectorAll('.form-step');
  steps.forEach((stepDiv) => stepDiv.style.display = 'none'); // Hide all steps
  document.getElementById(`step-${step}`).style.display = 'block'; // Show current step
}

// General validation function to check all fields
// Validate all fields
function validateFields() {
  let isValid = true; // Start with assuming all fields are valid

  // List of fields to validate
  const fieldsToValidate = [
    { input: document.getElementById('firstName'), errorId: 'firstName-error', validator: validateNoNumbers },
    { input: document.getElementById('lastName'), errorId: 'lastName-error', validator: validateNoNumbers },
    { input: document.getElementById('email'), errorId: 'emailError', validator: isValidEmail },
    { input: document.getElementById('companyName'), errorId: 'company-name-error', validator: validateNoSymbols },
    { input: document.getElementById('website'), errorId: 'websiteError', validator: isValidWebsite },
    { input: document.getElementById('role'), errorId: 'role-error', validator: validateDropdown },
    { input: document.getElementById('industry'), errorId: 'industry-error', validator: validateDropdown },
  ];

  // Validate each field in the list
  fieldsToValidate.forEach(({ input, errorId, validator }) => {
    if (input && input.offsetParent !== null) {
      // Validate only visible fields
      if (!validator(input, errorId)) {
        isValid = false; // Mark as invalid if validation fails
      }
    }
  });

  // Handle additional conditional fields (like 'other-role')
  const otherRoleInput = document.getElementById('other-role');
  if (otherRoleInput && otherRoleInput.offsetParent !== null) {
    if (!validateOnlyLetters(otherRoleInput, 'other-role-error')) {
      isValid = false;
    }
  }

  return isValid; // Return true only if all fields are valid
}


function validateInputField(inputField, errorFieldId) {
  const errorField = document.getElementById(errorFieldId);

  if (inputField.offsetParent !== null && inputField.value.trim() === "") {
    // Show error for empty visible fields
    errorField.textContent = "This field is required.";
    errorField.style.color = "#FF5733";
    inputField.style.borderColor = "#FF5733";
    return false;
  } else {
    errorField.textContent = "";
    inputField.style.borderColor = "#00D9FF";
    return true;
  }
}

// Function to move to the next step
function nextStep(next) {
  if (validateFields()) {
    currentStep = next; // Update global step tracker
    showStep(currentStep); // Show the next step
  } else {
    showErrorModal("Make sure all fields are correctly filled.");
  }
}

// Function to go to the previous step
function prevStep(previous) {
  showStep(previous); // Use the `previous` parameter to show the correct step
  updateProgress(-1); // Update progress bar if needed
}

// Event listener for next button click
document.querySelector('.next-btn').addEventListener('click', function () {
  nextStep(currentStep + 1); // Move to the next step, assuming `currentStep` is defined globally
});

// Event listener for previous button click
document.querySelector('.prev-btn').addEventListener('click', function () {
  prevStep(currentStep - 1); // Move to the previous step, assuming `currentStep` is defined globally
});

showStep(currentStep);

function validateDropdown(selectElement, errorFieldId) {
  const errorField = document.getElementById(errorFieldId);

  if (selectElement.offsetParent !== null && selectElement.value === "") {
    errorField.textContent = "Please select an option.";
    errorField.style.color = "#FF5733";
    selectElement.style.borderColor = "#FF5733";
    return false;
  } else {
    errorField.textContent = "";
    selectElement.style.borderColor = "#00D9FF";
    return true;
  }
}
