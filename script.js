document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Menu category filtering
    const menuTabs = document.querySelectorAll('.nav-link');
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-bs-target').substring(1);
            const menuItems = document.querySelectorAll('.tab-pane');
            menuItems.forEach(item => {
                if (item.id === targetCategory) {
                    item.classList.add('show', 'active');
                } else {
                    item.classList.remove('show', 'active');
                }
            });
        });
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value;

        if (name && email && phone && date && time && message) {
            alert('Form submitted successfully!');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
});
