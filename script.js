document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(function (error) {
        error.style.display = 'none';
    });

    // Validate form fields
    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '') {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    if (email === '' || !validateEmail(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    if (message === '') {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Submit form to Formspree
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                document.getElementById('successMessage').style.display = 'block';
                this.reset();
            } else {
                alert('Oops! Something went wrong. Please try again.');
            }
        })
        .catch(error => {
            alert('Oops! Something went wrong. Please try again.');
        });
    }
});

// Email validation function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}