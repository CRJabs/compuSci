document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-btn');
    const getStartedBtn = document.querySelector('.primary-btn');
    const learnMoreBtn = document.querySelector('.secondary-btn');
    
    loginBtn.addEventListener('click', () => {
      console.log('Navigate to login page');
      // Add login navigation logic
    });
    
    getStartedBtn.addEventListener('click', () => {
      console.log('Navigate to sign up page');
      // Add sign up navigation logic
    });
    
    learnMoreBtn.addEventListener('click', () => {
      console.log('Scroll to features section');
      const featuresSection = document.querySelector('#features');
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    });
  
    // Add scroll effect for navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
    
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
  });