document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('form-response');
    const loadingIndicator = document.getElementById('loading-indicator'); // Loading indicator element
    const ctaButton = document.querySelector('.cta-button');
    const heroTitle = document.querySelector('#hero h1');
    const themeToggle = document.getElementById('theme-toggle');
  
    // Function to show loading indicator
    function showLoading() {
        loadingIndicator.style.display = 'block';  // Show the loading indicator
        formResponse.textContent = '';            // Clear any previous messages
    }
  
    // Function to hide loading indicator
    function hideLoading() {
        loadingIndicator.style.display = 'none';   // Hide the loading indicator
    }
  
    // Function to validate the form
    function validateForm() {
        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm.querySelector('[name="email"]');
        const message = contactForm.querySelector('[name="message"]');
  
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            formResponse.textContent = 'All fields are required!';
            return false;
        }
  
        // Simple email validation regex
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email.value.trim())) {
            formResponse.textContent = 'Please enter a valid email address.';
            return false;
        }
  
        return true;  // Form is valid
    }
  
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
  
        if (!validateForm()) {
            return;  // Stop submission if validation fails
        }
  
        const formData = new FormData(contactForm);
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyX9DWBAKAShvfQwwu0seXApeSjY9tM8ELdzyHzYiqEccXH8EsIZbTobegDjzqJZCpp/exec'; // Replace with your Google Apps Script URL
  
        showLoading(); // Show the loading indicator
  
        fetch(scriptURL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            hideLoading(); // Hide the loading indicator after response
  
            if (data.result === 'success') {
                formResponse.textContent = 'Message sent successfully!';
                contactForm.reset();
            } else {
                formResponse.textContent = 'Error sending message. Please try again .';
            }
        })
        .catch((error) => {
            hideLoading(); // Hide the loading indicator if an error occurs
            console.error('Error!', error);
            formResponse.textContent = 'Error sending message. Please try again .';
        });
    });
  
    document.addEventListener('DOMContentLoaded', function () {
        const ctaButton = document.querySelector('.cta-button');
        const portfolioSection = document.getElementById('portfolio');
      
        if (ctaButton && portfolioSection) {
          ctaButton.addEventListener('click', function () {
            portfolioSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          });
        }
      });
      
  
    // Theme toggle logic
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-theme');
  
    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('light-theme');
      if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }
    });
  });
  