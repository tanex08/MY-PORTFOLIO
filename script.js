// Mobile menu functionality
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

// Mobile menu button listener
menuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    // Toggle mobile menu - implementation for mobile view
    console.log('Menu clicked');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        try {
            // Send to backend (when you set up FastAPI)
            const response = await fetch('http://localhost:8000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });
            
            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Failed to send message');
            }
        } catch (error) {
            console.log('Server not available - form data:', { name, email, message });
            alert('Message saved locally. Please set up FastAPI backend to send.');
            contactForm.reset();
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .exp-header, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Download CV
document.querySelector('.btn-cv')?.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8000/api/cv');
        
        if (response.ok) {
            // Get the filename from header or use default
            const filename = response.headers
                .get('content-disposition')
                ?.split('filename=')[1]
                ?.replace(/"/g, '') || 'Tristan_Jay_GAID_CV.pdf';
            
            // Create blob and download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else if (response.status === 404) {
            alert('CV not available. Please ask the developer to upload their CV.');
        } else {
            alert('Failed to download CV');
        }
    } catch (error) {
        console.error('Error downloading CV:', error);
        alert('Backend not running. Please start the FastAPI server to download CV.');
    }
});

// Contact button in sidebar
document.querySelector('.btn-contact-sidebar')?.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
});
