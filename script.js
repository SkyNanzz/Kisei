// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Server IP Copy Functionality
const copyBtn = document.getElementById('copy-btn');
const serverIp = document.getElementById('server-ip');
const originalBtnText = copyBtn.innerHTML;

copyBtn.addEventListener('click', () => {
    serverIp.select();
    document.execCommand('copy');
    
    // Visual feedback
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    copyBtn.style.background = 'var(--success)';
    
    // Reset after 2 seconds
    setTimeout(() => {
        copyBtn.innerHTML = originalBtnText;
        copyBtn.style.background = '';
    }, 2000);
});

// Form Submission Handling
const contactForm = document.getElementById('kisei-form');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Player count animation
function animatePlayerCount() {
    const playerCountElement = document.querySelector('.player-count');
    if (!playerCountElement) return;
    
    let count = parseInt(playerCountElement.textContent.replace(',', ''));
    const maxCount = 1500;
    const minCount = 1200;
    const updateInterval = 2000;
    
    setInterval(() => {
        // Randomly increase or decrease the count within bounds
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        count = Math.max(minCount, Math.min(maxCount, count + change));
        
        // Format with comma
        playerCountElement.textContent = count.toLocaleString();
    }, updateInterval);
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    animatePlayerCount();
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(20, 20, 20, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(42, 42, 42, 0.95)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.5)';
        }
    });
    
    // Add hover effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
});
