// ============================================================
// LOADING SCREEN
// ============================================================
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hide');
        }, 500);
    }
});

// ============================================================
// NAVBAR HAMBURGER MENU
// ============================================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ============================================================
// FAQ ACCORDION
// ============================================================
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    }
});

// ============================================================
// FEEDBACK FORM
// ============================================================
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Harap isi semua field!');
            return;
        }

        console.log('Feedback:', { name, email, message });

        this.style.display = 'none';
        const success = document.getElementById('feedbackSuccess');
        if (success) {
            success.style.display = 'block';
        }
    });
}

// ============================================================
// BACK TO TOP
// ============================================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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
            if (navMenu) {
                navMenu.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        }
    });
});

// ============================================================
// NAVBAR TRANSPARENCY ON SCROLL
// ============================================================
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 13, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(13, 13, 26, 0.9)';
        }
    });
}

// ============================================================
// RATING PAGE - STAR RATING
// ============================================================
let selectedRating = 0;
const stars = document.querySelectorAll('.star-rating .star');

if (stars.length > 0) {
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.value);
            updateStars(selectedRating);
        });

        star.addEventListener('mouseenter', function() {
            const val = parseInt(this.dataset.value);
            updateStars(val);
        });

        star.addEventListener('mouseleave', function() {
            updateStars(selectedRating);
        });
    });
}

function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.textContent = '⭐';
            star.classList.add('active');
        } else {
            star.textContent = '☆';
            star.classList.remove('active');
        }
    });
}

// ============================================================
// RATING PAGE - FORM SUBMIT
// ============================================================
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('reviewName').value.trim();
        const comment = document.getElementById('reviewComment').value.trim();

        if (selectedRating === 0) {
            alert('Silakan pilih rating bintang terlebih dahulu!');
            return;
        }

        if (!name || !comment) {
            alert('Harap isi semua field!');
            return;
        }

        console.log('Review:', { rating: selectedRating, name, comment });

        this.style.display = 'none';
        const success = document.getElementById('successMessage');
        if (success) {
            success.style.display = 'block';
        }

        const reviewList = document.getElementById('reviewList');
        if (reviewList) {
            const newReview = document.createElement('div');
            newReview.className = 'review-card';
            newReview.innerHTML = `
                <div class="review-header">
                    <span class="review-name">${name}</span>
                    <span class="review-stars">${'⭐'.repeat(selectedRating)}</span>
                </div>
                <div class="review-date">Baru saja</div>
                <div class="review-text">${comment}</div>
            `;
            reviewList.prepend(newReview);
        }

        updateRatingStats(selectedRating);
    });
}

// ============================================================
// RATING PAGE - UPDATE STATS
// ============================================================
function updateRatingStats(newRating) {
    const totalEl = document.getElementById('totalReviews');
    const avgEl = document.getElementById('avgRating');

    if (!totalEl || !avgEl) return;

    const counts = {
        1: parseInt(document.getElementById('count1')?.textContent || '0'),
        2: parseInt(document.getElementById('count2')?.textContent || '0'),
        3: parseInt(document.getElementById('count3')?.textContent || '0'),
        4: parseInt(document.getElementById('count4')?.textContent || '0'),
        5: parseInt(document.getElementById('count5')?.textContent || '0')
    };

    counts[newRating] = (counts[newRating] || 0) + 1;

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const sum = Object.entries(counts).reduce((acc, [key, val]) => acc + (parseInt(key) * val), 0);
    const avg = total > 0 ? (sum / total) : 0;

    totalEl.textContent = total;
    avgEl.textContent = avg.toFixed(1);

    for (let i = 1; i <= 5; i++) {
        const countEl = document.getElementById(`count${i}`);
        const barEl = document.getElementById(`bar${i}`);
        if (countEl) countEl.textContent = counts[i];
        if (barEl) {
            const percentage = total > 0 ? (counts[i] / total) * 100 : 0;
            barEl.style.width = percentage + '%';
        }
    }
}