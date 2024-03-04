// Fetch user data (simulated)
const currentUser = {
    name: "Blaise Kyalo",
    email: "blaise31kyalo@gmail.com",
    gender: "Male",
    password: "yourStrongPassword", // Store this securely in a real application
    height: 180,
    weight: 70
  };
  
  // DOM elements
  const displayName = document.getElementById("displayName");
  const displayEmail = document.getElementById("displayEmail");
  const displayGender = document.getElementById("displayGender");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight"); 
  const displayBmi = document.getElementById("displayBmi");
  const updateDetailsBtn = document.getElementById('updateDetailsBtn');
  const changePasswordBtn = document.getElementById('changePasswordBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const currentPassword = document.getElementById('currentPassword');
  const newPassword = document.getElementById('newPassword');
  const confirmPassword = document.getElementById('confirmPassword'); 
   //... (rest of the code below)
// ... (continued from above)

// Display user data on load
window.addEventListener('load', () => {
    displayName.textContent = currentUser.name;
    displayEmail.textContent = currentUser.email;
    displayGender.textContent = currentUser.gender;
    heightInput.value = currentUser.height;
    weightInput.value = currentUser.weight;
    calculateBMI(); 
  });
  
  // Calculate BMI
  function calculateBMI() {
    const height = parseFloat(heightInput.value) / 100; 
    const weight = parseFloat(weightInput.value); 
  
    if (height && weight) {
      const bmi = (weight / (height * height)).toFixed(2);
      displayBmi.textContent = bmi;
    }
  }
  
  // Event listeners
  updateDetailsBtn.addEventListener('click', () => {
    currentUser.height = heightInput.value;
    currentUser.weight = weightInput.value;
    calculateBMI();
    // In a real app, you would send the updated data to the server 
  });
  
  changePasswordBtn.addEventListener('click', () => {
     // Validate passwords before updating on the server
  });
  
  logoutBtn.addEventListener('click', () => {
    // Implement logout logic (clear session/local storage, redirect to login)
  });
  
  // Additional functionality for password validation, saving data to the server/database 
  
    