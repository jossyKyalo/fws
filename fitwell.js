document.addEventListener('DOMContentLoaded', function () {
  const createAccountForm = document.getElementById('createAccountForm');

  createAccountForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const phoneNumber = document.getElementById('phoneNumber').value;
      const password = document.getElementById('password').value;

     
      fetch('/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              fullName: fullName,
              email: email,
              phoneNumber: phoneNumber,
              password: password,
          }),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
         
      })
      .catch((error) => {
          console.error('Error:', error);
          
      });
  });
});
