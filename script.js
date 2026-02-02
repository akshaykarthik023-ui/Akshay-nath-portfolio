document.addEventListener('DOMContentLoaded', () => {
    // Add any future interactivity here
    console.log("Portfolio loaded successfully");

    // Optional: Add simple intersection observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // If we add a .fade-in class to elements in HTML, this would trigger it
    // For now, it's a foundation for future animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Here you would typically send the data to a backend or service (like Formspree)
            // For now, we'll just show a success message
            alert('Thank you for your message! (This is a demo form)');
            contactForm.reset();
        });
    }
});
