document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const loginLink = document.querySelector('.login-link');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    window.location.href = '../../../Dashboard/dashboard.html';
  });

  loginLink.addEventListener('click', () => {
    console.log('Navigate to login page');
    window.location.href = '../Log-in/loginIndex.html';
  });

  // Social login handlers
  const socialButtons = document.querySelectorAll('.social-button');
  socialButtons.forEach(button => {
    button.addEventListener('click', () => {
      const provider = button.querySelector('span').textContent;
      console.log(`${provider} login clicked`);
      window.location.href = '../../../Dashboard/dashboard.html';
    });
  });
});