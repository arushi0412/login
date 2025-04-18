// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');
const loginButton = document.querySelector('.btn-primary');
const signUpButton = document.querySelector('.btn-secondary');
const forgotPasswordLink = document.querySelector('.forgot-password a');
const socialLinks = document.querySelectorAll('.social-icons a');

// Check if there are saved credentials
function checkSavedCredentials() {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }
}

// Save email if "Remember Me" is checked
function saveCredentials() {
    if (rememberMeCheckbox.checked) {
        localStorage.setItem('savedEmail', emailInput.value);
    } else {
        localStorage.removeItem('savedEmail');
    }
}

// Handle login form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Basic validation
    if (!emailInput.value || !passwordInput.value) {
        alert('Please fill in all fields');
        return;
    }
    
    // Save credentials if "Remember Me" is checked
    saveCredentials();
    
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value
        })
    })
    .then(res => {
        if (!res.ok) throw new Error('Invalid credentials');
        return res.json();
    })
    .then(data => {
        alert(data.message);
        // Redirect or load new content here
    })
    .catch(err => {
        alert('Login failed: ' + err.message);
    });
    
});

// Handle signup button click
signUpButton.addEventListener('click', function() {
    // Redirect to signup page or show signup form
    console.log('Signup requested');
    alert('Redirecting to signup page...');
});

// Handle forgot password link
forgotPasswordLink.addEventListener('click', function(event) {
    event.preventDefault();
    // Show password recovery form or redirect to recovery page
    console.log('Password recovery requested');
    alert('Password recovery process initiated');
});

// Handle social login clicks
socialLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const platform = this.textContent;
        console.log(`Login with ${platform} requested`);
        alert(`Redirecting to ${platform} authentication...`);
    });
});

// Check for saved credentials when page loads
document.addEventListener('DOMContentLoaded', checkSavedCredentials);

// Add navigation active state management
const navLinks = document.querySelectorAll('.navigation ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
    });
});