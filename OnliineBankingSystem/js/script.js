// Utility Functions

/**
 * Calculate the user's age based on their date of birth.
 * @param {string} dob - Date of birth in YYYY-MM-DD format.
 * @returns {number} - Age of the user.
 */
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

/**
 * Validate a password based on criteria:
 * - At least 8 characters long
 * - Contains uppercase, lowercase, number, and special character
 * @param {string} password - Password string to validate.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Add a transaction to the user's profile.
 * @param {number} amount - Transaction amount.
 * @param {string} type - Type of transaction ('credit' or 'debit').
 */
function addTransaction(amount, type) {
  const loggedInUserEmail = localStorage.getItem('loggedInUser');
  if (!loggedInUserEmail) return;

  const user = JSON.parse(localStorage.getItem(loggedInUserEmail));
  user.transactions = user.transactions || [];
  user.transactions.push({ amount, type, date: new Date().toLocaleString() });
  localStorage.setItem(loggedInUserEmail, JSON.stringify(user));
}

// Event Listeners for Forms

// Registration
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

  if (localStorage.getItem(email)) {
    alert('Email is already registered. Please log in.');
    return;
  }

  const user = { name, email, dob, gender, password, transactions: [] };
  localStorage.setItem(email, JSON.stringify(user));
  alert('Registration Successful!');
  window.location.href = 'login.html';
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const user = JSON.parse(localStorage.getItem(email));
  if (user && user.password === password) {
    localStorage.setItem('loggedInUser', email);
    window.location.href = 'profile.html';
  } else {
    alert('Invalid email or password.');
  }
});

// Profile Page
if (window.location.pathname.includes('profile.html')) {
  const loggedInUserEmail = localStorage.getItem('loggedInUser');
  if (!loggedInUserEmail) {
    alert('You must log in first.');
    window.location.href = 'login.html';
  } else {
    const user = JSON.parse(localStorage.getItem(loggedInUserEmail));
    document.getElementById('userName').innerText = user.name;
    document.getElementById('userEmail').innerText = user.email;

    const transactionList = document.getElementById('transactionList');
    if (user.transactions?.length > 0) {
      user.transactions.forEach((txn) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${txn.date}: ₹${txn.amount} (${txn.type})`;
        transactionList.appendChild(listItem);
      });
    } else {
      transactionList.innerHTML = '<li>No transactions yet.</li>';
    }
  }
}

// Logout
function logout() {
  localStorage.removeItem('loggedInUser');
  alert('You have been logged out.');
  window.location.href = 'login.html';
}
