// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Section navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).classList.add('active');
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            const navList = document.querySelector('.nav-links');
            if (navList.classList.contains('show')) {
                navList.classList.remove('show');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Scroll to top of section
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navList = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        navList.classList.toggle('show');
        if (navList.classList.contains('show')) {
            this.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Player count simulation
    const playerCountElement = document.getElementById('player-count');
    const modCountElement = document.getElementById('mod-count');
    
    function updatePlayerCount() {
        const baseCount = 24;
        const fluctuation = Math.floor(Math.random() * 10) - 5;
        const newCount = Math.max(5, baseCount + fluctuation);
        playerCountElement.textContent = newCount;
        
        // Update mod count based on player count
        const modCount = Math.max(2, Math.floor(newCount / 5));
        modCountElement.textContent = modCount;
    }
    
    // Update player count every 30 seconds
    updatePlayerCount();
    setInterval(updatePlayerCount, 30000);
    
    // Leaderboard functionality
    const skillSelect = document.getElementById('skill-select');
    const playerSearch = document.getElementById('player-search');
    const leaderboardBody = document.getElementById('leaderboard-body');
    const originalRows = leaderboardBody.innerHTML;
    
    // Sort leaderboard by selected skill
    skillSelect.addEventListener('change', function() {
        filterLeaderboard();
    });
    
    // Search players in leaderboard
    playerSearch.addEventListener('input', function() {
        filterLeaderboard();
    });
    
    function filterLeaderboard() {
        const skill = skillSelect.value;
        const searchTerm = playerSearch.value.toLowerCase();
        
        // For a real implementation, this would fetch data from the server
        // For this demo, we'll just simulate filtering
        
        if (searchTerm) {
            // This is a simplified simulation - in a real app we'd have full data
            const rows = leaderboardBody.getElementsByTagName('tr');
            for (let row of rows) {
                const playerName = row.cells[1].textContent.toLowerCase();
                if (playerName.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        } else {
            leaderboardBody.innerHTML = originalRows;
        }
    }
    
    // Form submission handling
    const messageForm = document.getElementById('message-form');
    const formMessage = document.getElementById('form-message');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real implementation, this would send data to a server
        // For this demo, we'll just show a success message
        
        // Show success message
        formMessage.textContent = 'Thank you for your message! We will respond within 24 hours.';
        formMessage.className = 'success';
        
        // Reset form
        messageForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
    
    // Gallery image hover effect enhancement
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Initialize with home section active
    document.querySelector('#home').classList.add('active');
});
