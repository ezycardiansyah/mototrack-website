// ============================================================
// NAVBAR HAMBURGER MENU
// ============================================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// ============================================================
// FAQ ACCORDION
// ============================================================
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// ============================================================
// FEEDBACK FORM
// ============================================================
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Harap isi semua field!');
        return;
    }

    // Simpan feedback ke console (nanti bisa diintegrasikan ke backend)
    console.log('Feedback:', { name, email, message });

    // Tampilkan sukses
    this.style.display = 'none';
    document.getElementById('feedbackSuccess').style.display = 'block';
});

// ============================================================
// SCROLL ANIMATION (Smooth)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu
            navMenu.classList.remove('active');
        }
    });
});

// ============================================================
// NAVBAR TRANSPARENCY ON SCROLL
// ============================================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 13, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(13, 13, 26, 0.9)';
    }
});