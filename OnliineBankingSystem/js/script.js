// Calculate Age
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Validate Password
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Register
document.getElementById('registerForm')?.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const dob = document.getElementById('dob').value;
  const gender = document.getElementById('gender').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (calculateAge(dob) < 18) {
    alert('You must be at least 18 years old to register.');
    return;
  }

  if (!validatePassword(password)) {
    alert('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  const user = { name, email, dob, gender, password };
  localStorage.setItem(email, JSON.stringify(user));
  alert('Registration Successful! You can now login.');
  window.location.href = 'login.html';
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const user = JSON.parse(localStorage.getItem(email));
  if (user && user.password === password) {
    alert('Login Successful!');
    localStorage.setItem('loggedInUser', email);
    window.location.href = 'profile.html';
  } else {
    alert('Invalid email or password.');
  }
});

// Profile
if (window.location.pathname.includes('profile.html')) {
  const loggedInUserEmail = localStorage.getItem('loggedInUser');
  if (!loggedInUserEmail) {
    alert('You must log in first.');
    window.location.href = 'login.html';
  } else {
    const user = JSON.parse(localStorage.getItem(loggedInUserEmail));
    document.getElementById('userName').innerText = user.name;
    document.getElementById('userEmail').innerText = user.email;
  }
}

// Logout
function logout() {
  localStorage.removeItem('loggedInUser');
  alert('You have been logged out.');
  window.location.href = 'login.html';
}
