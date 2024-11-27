// all input validation listener
document.getElementById('website').addEventListener('input', isValidWebsite);
document.getElementById('fullName').addEventListener('input', isValidFullName);
document.getElementById('email').addEventListener('input', isValidEmail);
document.getElementById('companyName').addEventListener('input', isValidcompanyName);

const formData = {};

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

  function isValidEmail() {
    const emailField = document.getElementById("email");
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

  function isValidcompanyName() {
    const nameField = document.getElementById("companyName");
    const nameErrorField = document.getElementById("compamyName-error");
    const namePattern = /^[a-zA-Z\s0-9]+$/; // Allows letters, spaces, and numbers but no symbols
  
    if (!namePattern.test(nameField.value.trim())) {
      nameErrorField.textContent = "Enter a Valid Company Name, No Symbols Allowed";
      nameErrorField.style.color = "#FF5733"; // Error text color
      nameField.style.borderColor = "#FF5733"; // Highlight input in red
      return false;
    } else {
      nameErrorField.textContent = "";
      nameField.style.borderColor = "#00D9FF"; // Reset border color to valid
      return true;
    }
  } 

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

function showStep(step) {
    // Hide all steps
    const steps = document.querySelectorAll('.form-step');
    steps.forEach((stepDiv) => stepDiv.style.display = 'none');
    
    // Show the current step
    document.getElementById(`step-${step}`).style.display = 'block';
  }

  function nextStep(next) {
    showStep(next);
    
  }

  function prevStep(previous) {
    showStep(previous);
    updateProgress(-1);
}

  // Initialize by showing the first step
  showStep(1);


// Create a reusable function to manage toggling
function setupToggleForOthers(checkboxIds, inputIds) {
  for (let i = 0; i < checkboxIds.length; i++) {
    const checkbox = document.getElementById(checkboxIds[i]);
    const input = document.getElementById(inputIds[i]);

    // Add an event listener for each checkbox
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        input.classList.remove("hidden");
      } else {
        input.classList.add("hidden");
        input.value = ""; // Clear the input field when hiding
      }
    });
  }
}

// List of checkbox IDs and their corresponding input IDs
const checkboxIds = ["challenge-other1", "challenge-other2", "challenge-other3"];
const inputIds = ["challenge-other-input1", "challenge-other-input2", "challenge-other-input3"];

// Initialize the toggles
setupToggleForOthers(checkboxIds, inputIds);

// Generic reusable function for dropdowns with "Other" option
function initializeDropdownWithOther() {
  // Get all dropdowns with the data attribute
  const dropdowns = document.querySelectorAll(".dropdown[data-other-input]");

  dropdowns.forEach((dropdown) => {
    const otherInputId = dropdown.getAttribute("data-other-input");
    const otherInput = document.getElementById(otherInputId);

    // Add change event listener to each dropdown
    dropdown.addEventListener("change", () => {
      if (dropdown.value === "Other") {
        otherInput.classList.remove("hidden"); // Show "Other" input
      } else {
        otherInput.classList.add("hidden"); // Hide "Other" input
        otherInput.value = ""; // Clear the input when hidden
      }
    });
  });
}

// Call the function to initialize the behavior
initializeDropdownWithOther();


// Function to enforce character limits on textareas
function enforceTextareaLimit(textareaId, maxChars) {
  const textarea = document.getElementById(textareaId);
  textarea.addEventListener("input", () => {
    if (textarea.value.length > maxChars) {
      textarea.value = textarea.value.substring(0, maxChars); // Trim text to max length
    }
  });
}

// Apply character limits for Step 3 fields
enforceTextareaLimit("business-goals", 500);
enforceTextareaLimit("specific-outcomes", 500);
enforceTextareaLimit("success-vision", 500);

// Show/Hide text area for "If Yes, describe"
const aiYes = document.getElementById("ai-yes");
const aiNo = document.getElementById("ai-no");
const aiDescription = document.getElementById("ai-description");

aiYes.addEventListener("change", () => {
  aiDescription.classList.remove("hidden");
});
aiNo.addEventListener("change", () => {
  aiDescription.classList.add("hidden");
});


// Function to check if all required fields in Step 1 are valid and filled
function isStep1Valid() {
  // Collect all required inputs in Step 1
  const requiredFields = [
    document.getElementById("fullName"),
    document.getElementById("email"),
    document.getElementById("companyName"),
    document.getElementById("role"),
    document.getElementById("industry"),
  ];
  return true;
  let isValid = true;

  // Check if required fields are not empty
  requiredFields.forEach((field) => {
    if (field.tagName === "SELECT") {
      if (field.value === "" || field.value === null) {
        alert("Please select an option in " + field.name);
        field.focus();
        isValid = false;
      }
    } else if (field.value.trim() === "") {
      alert(`The field "${field.name}" is required.`);
      field.focus();
      isValid = false;
    }
  });

  // Check if "Other" industry input is filled when "Other" is selected
  const industryDropdown = document.getElementById("industry");
  const industryOtherInput = document.getElementById("industry-other-input");
  if (industryDropdown.value === "Other" && industryOtherInput.value.trim() === "") {
    alert("Please specify your industry.");
    industryOtherInput.focus();
    isValid = false;
  }

  // Return final validation status
  return isValid;
}

// Event Listener for the "Next" button
document.querySelector(".next-btn").addEventListener("click", function () {
  if(!isValidEmail() || !isValidFullName() || !isValidWebsite() || !isValidcompanyName()){
    alert("Make sure there is no error")
  }
  if (isStep1Valid() && isValidEmail() && isValidFullName() && isValidWebsite() && isValidcompanyName()) {
    // Proceed to Step 2 if validation is successful
    nextStep(2);
    updateProgress(1);
    formData.fullName = document.getElementById('fullName').value.trim();
    formData.email = document.getElementById('email').value.trim();
    formData.companyName = document.getElementById('companyName').value.trim();
    formData.companyName = document.getElementById('website').value.trim();
    formData.industry = document.getElementById('role').value;
    formData.teamSize = document.getElementById('industry').value;
    completedSteps = 2 ;
  }
});

// Function to validate Step 2
function isStep2Valid() {
  let isValid = true;
  return true;
  // 1. Validate at least one checkbox is selected for each group
  const challengeCheckboxes = document.querySelectorAll('input[name="challenges"]:checked');
  const timeConsumingCheckboxes = document.querySelectorAll('input[name="timeConsumingTasks"]:checked');
  const currentToolsCheckboxes = document.querySelectorAll('input[name="currentTools"]:checked');

  if (challengeCheckboxes.length === 0) {
    alert("Please select at least one challenge you are currently facing.");
    isValid = false;
  }

  if (timeConsumingCheckboxes.length === 0) {
    alert("Please select at least one time-consuming/repetitive area.");
    isValid = false;
  }

  if (currentToolsCheckboxes.length === 0) {
    alert("Please select at least one tool/software you currently use.");
    isValid = false;
  }

  // 2. Validate "Other" inputs when corresponding "Other" checkboxes are selected
  const challengeOtherCheckbox = document.getElementById("challenge-other1");
  const challengeOtherInput = document.getElementById("challenge-other-input1");
  if (challengeOtherCheckbox.checked && challengeOtherInput.value.trim() === "") {
    alert("Please specify the 'Other' challenge.");
    challengeOtherInput.focus();
    isValid = false;
  }

  const timeConsumingOtherCheckbox = document.getElementById("challenge-other2");
  const timeConsumingOtherInput = document.getElementById("challenge-other-input2");
  if (timeConsumingOtherCheckbox.checked && timeConsumingOtherInput.value.trim() === "") {
    alert("Please specify the 'Other' time-consuming area.");
    timeConsumingOtherInput.focus();
    isValid = false;
  }

  const currentToolsOtherCheckbox = document.getElementById("challenge-other3");
  const currentToolsOtherInput = document.getElementById("challenge-other-input3");
  if (currentToolsOtherCheckbox.checked && currentToolsOtherInput.value.trim() === "") {
    alert("Please specify the 'Other' tool or software.");
    currentToolsOtherInput.focus();
    isValid = false;
  }

  return isValid;
}

// Event Listener for the "Next" button in Step 2
document.querySelector("#step-2 .next-btn").addEventListener("click", function () {
  if (isStep2Valid()) {
    // Proceed to Step 3 if validation passes
    nextStep(3);
    updateProgress(2);
    formData.challenges = getCheckedValues('challenges');
    formData.timeConsumingTasks = getCheckedValues('timeConsumingTasks');
    formData.currentTools = getCheckedValues('currentTools');
    completedSteps = 3 ;
  }
});

// Initialize behavior for "Other" inputs
initializeDropdownWithOther(); // Reuse your existing dropdown/checkbox toggle setup

// Function to validate Step 3
function isStep3Valid() {
  return true;
  let isValid = true;

  // Validate textareas in Step 3
  const businessGoals = document.getElementById("business-goals").value.trim();
  const specificOutcomes = document.getElementById("specific-outcomes").value.trim();
  const successVision = document.getElementById("success-vision").value.trim();

  if (!businessGoals) {
    alert("Please enter your business goals.");
    document.getElementById("business-goals").focus();
    isValid = false;
  } else if (!specificOutcomes) {
    alert("Please specify the outcomes you hope to achieve with AI or automation.");
    document.getElementById("specific-outcomes").focus();
    isValid = false;
  } else if (!successVision) {
    alert("Please describe what success looks like for your business.");
    document.getElementById("success-vision").focus();
    isValid = false;
  }

  return isValid;
}

// Event Listener for the "Next" button in Step 3
document.querySelector("#step-3 .next-btn").addEventListener("click", function () {
  if (isStep3Valid()) {
    // Proceed to Step 4 if validation passes
    nextStep(4);
    updateProgress(3);
    formData.businessGoals = document.getElementById('business-goals').value.trim();
    formData.specificOutcomes = document.getElementById('specific-outcomes').value.trim();
    formData.successVision = document.getElementById('success-vision').value.trim();
  }
});



// Function to validate Step 4
function isStep4Valid() {
  return true;
  let isValid = true;

  // Validate the "AI implemented" question
  const aiImplementedYes = document.getElementById("ai-yes");
  const aiDescription = document.getElementById("ai-description");

  if (aiImplementedYes.checked && aiDescription.value.trim() === "") {
    alert("Please describe your previous AI or automation implementation.");
    aiDescription.focus();
    isValid = false;
  }

  // Validate "Automation processes" question
  const automationProcesses = document.querySelector('input[name="automation-processes"]:checked');
  if (!automationProcesses) {
    alert("Please indicate whether you have processes ready for automation.");
    isValid = false;
  }

  // Validate "Timeline" question
  const timeline = document.getElementById("timeline").value;
  if (!timeline) {
    alert("Please select a timeline for starting the project.");
    document.getElementById("timeline").focus();
    isValid = false;
  }

  // Validate "Decision-maker" question
  const decisionMaker = document.querySelector('input[name="decision-maker"]:checked');
  if (!decisionMaker) {
    alert("Please indicate whether you are the decision-maker for this project.");
    isValid = false;
  }

  return isValid;
}

// Event Listener for the "Next" button in Step 4
document.querySelector("#step-4 .next-btn").addEventListener("click", function () {
  if (isStep4Valid()) {
    // Proceed to Step 5 if validation passes
    nextStep(5);
    updateProgress(4);
    const aiImplemented = document.querySelector('input[name="ai-implemented"]:checked');
    formData.aiImplemented = aiImplemented ? aiImplemented.value : '';
    formData.aiDescription = document.getElementById('ai-description').value.trim();

    const automationProcesses = document.querySelector('input[name="automation-processes"]:checked');
    formData.automationProcesses = automationProcesses ? automationProcesses.value : '';

    formData.timeline = document.getElementById('timeline').value;
    
    const decisionMaker = document.querySelector('input[name="decision-maker"]:checked');
    formData.decisionMaker = decisionMaker ? decisionMaker.value : '';

  }
});

// Toggle visibility of the AI description input based on the selected radio button
document.getElementById("ai-yes").addEventListener("change", function () {
  document.getElementById("ai-description").classList.remove("hidden");
});
document.getElementById("ai-no").addEventListener("change", function () {
  document.getElementById("ai-description").classList.add("hidden");
  document.getElementById("ai-description").value = ""; // Clear input if hidden
});

function getCheckedValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map(checkbox => checkbox.value);
}

document.querySelector('#step-5 .next-btn').addEventListener('click', () => {
  formData.preferredTime = document.getElementById('preferred-time').value.trim();
  formData.timezone = document.getElementById('timezone').value;
  formData.tasksToAutomate = document.getElementById('tasks-to-automate').value.trim();
  formData.additionalInfo = document.getElementById('additional-info').value.trim();

  // Send data to Zapier webhook
  const zapierWebhookURL = 'https://cors-anywhere.herokuapp.com/https://hooks.zapier.com/hooks/catch/20714053/2i2irwe/';
  fetch(zapierWebhookURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        alert('Form data successfully submitted!');
        console.log('Form data sent:', formData);
        // Redirect to a thank-you page
        window.location.href = '/thank-you.html';
      } else {
        alert('There was an issue submitting your form. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    });
});


let currentStep = 1;
let completedSteps = 1; // Reflects the highest completed step

// Select all progress steps
const progressSteps = document.querySelectorAll('.bar');

// Click event listener for progress bar
progressSteps.forEach(step => {
  step.addEventListener('click', function () {
    const stepNumber = parseInt(this.dataset.step);

    // Only allow navigation to completed steps or the current step
    if (stepNumber <= completedSteps) {
      navigateToStep(stepNumber);
    } else {
      alert('Please complete the previous steps first.');
    }
  });
});

// Function to navigate to a specific step
function navigateToStep(stepNumber) {
  // Hide all form steps
  document.querySelectorAll('.form-step').forEach(step => {
    step.style.display = 'none';
  });

  // Show the selected form step
  document.querySelector(`#step-${stepNumber}`).style.display = 'block';

  // Update the current step
  currentStep = stepNumber;

  // Update the progress bar visuals
  updateProgressBar(stepNumber);
}

// Function to update progress bar state
function updateProgressBar(activeStep) {
  progressSteps.forEach((step, index) => {
    const stepNumber = index + 1;

    // Update classes for completed, active, or inactive states
    if (stepNumber < activeStep) {
      step.classList.add('completed');
      step.classList.remove('active');
    } else if (stepNumber === activeStep) {
      step.classList.add('active');
      step.classList.remove('completed');
    } else {
      step.classList.remove('completed', 'active');
    }
  });
}

function nextStep(nextStepNumber) {
  navigateToStep(nextStepNumber);
  completedSteps = Math.max(completedSteps, nextStepNumber); // Update the highest completed step
}

// Example function to get checked values from checkboxes
function getCheckedValues(groupName) {
  return Array.from(document.querySelectorAll(`input[name="${groupName}"]:checked`))
    .map(input => input.value);
}