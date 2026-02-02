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

            // Submit the form data to Google Forms via hidden iframe
            const formData = new FormData(contactForm);
            const iframe = document.createElement('iframe');
            iframe.name = 'hidden_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            contactForm.target = 'hidden_iframe';
            contactForm.submit();

            // Show success popup
            showSuccessPopup();

            // Reset form after a brief delay
            setTimeout(() => {
                contactForm.reset();
                contactForm.target = '';
            }, 500);
        });
    }
});

// Success Popup Function
function showSuccessPopup() {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;

    // Create popup box
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: var(--card-bg);
        border: 2px solid var(--accent-green);
        border-radius: 16px;
        padding: 3rem 2.5rem;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: slideUp 0.4s ease;
    `;

    popup.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        </div>
        <h3 style="color: var(--text-primary); font-size: 1.8rem; margin-bottom: 1rem; font-weight: 700;">Message Sent!</h3>
        <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">
            Thank you for reaching out! I'll get back to you as soon as possible.
        </p>
        <button id="closePopup" style="
            background: var(--accent-orange);
            color: #000;
            border: none;
            padding: 0.8rem 2rem;
            font-size: 1rem;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s ease;
        ">Got it!</button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        #closePopup:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);

    // Close popup on button click or overlay click
    const closePopup = () => {
        overlay.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.head.removeChild(style);
        }, 300);
    };

    document.getElementById('closePopup').addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });
}
