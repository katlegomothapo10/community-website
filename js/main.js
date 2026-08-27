// ============================================================
// PREMIUM BACKGROUND
// ============================================================
(function initPremiumBG() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    const gridSize = 60;
    const cols = Math.ceil(w / gridSize);
    const rows = Math.ceil(h / gridSize);
    
    let offsetX = 0;
    let offsetY = 0;
    let mouseX = w/2;
    let mouseY = h/2;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            r: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.3 + 0.05,
            type: Math.random() > 0.7 ? 'gold' : 'iron'
        });
    }
    
    const sparkles = [];
    for (let i = 0; i < 20; i++) {
        sparkles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.04,
            vy: (Math.random() - 0.5) * 0.04,
            size: Math.random() * 3 + 1,
            phase: Math.random() * Math.PI * 2
        });
    }
    
    function drawGrid() {
        ctx.clearRect(0, 0, w, h);
        
        const targetX = (mouseX / w - 0.5) * 20;
        const targetY = (mouseY / h - 0.5) * 20;
        offsetX += (targetX - offsetX) * 0.008;
        offsetY += (targetY - offsetY) * 0.008;
        
        ctx.strokeStyle = 'rgba(212, 168, 83, 0.015)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= cols; i++) {
            const x = i * gridSize + offsetX % gridSize;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let i = 0; i <= rows; i++) {
            const y = i * gridSize + offsetY % gridSize;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
        
        ctx.strokeStyle = 'rgba(212, 168, 83, 0.025)';
        ctx.lineWidth = 0.8;
        for (let i = 0; i <= cols; i += 5) {
            const x = i * gridSize + offsetX % gridSize;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let i = 0; i <= rows; i += 5) {
            const y = i * gridSize + offsetY % gridSize;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
        
        ctx.fillStyle = 'rgba(212, 168, 83, 0.01)';
        for (let i = 0; i <= cols; i += 5) {
            for (let j = 0; j <= rows; j += 5) {
                const x = i * gridSize + offsetX % gridSize;
                const y = j * gridSize + offsetY % gridSize;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            const color = p.type === 'gold' ? '212, 168, 83' : '106, 106, 122';
            ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
        
        sparkles.forEach(s => {
            s.x += s.vx + Math.sin(Date.now() * 0.001 + s.phase) * 0.02;
            s.y += s.vy + Math.cos(Date.now() * 0.001 + s.phase) * 0.02;
            if (s.x < 0 || s.x > w) s.vx *= -1;
            if (s.y < 0 || s.y > h) s.vy *= -1;
            const glow = Math.sin(Date.now() * 0.002 + s.phase) * 0.3 + 0.7;
            ctx.shadowColor = 'rgba(212, 168, 83, 0.2)';
            ctx.shadowBlur = 8 * glow;
            ctx.fillStyle = `rgba(212, 168, 83, ${0.025 * glow})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * glow, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }
    
    function animate() {
        drawGrid();
        requestAnimationFrame(animate);
    }
    animate();
})();

// ============================================================
// CURSOR GLOW
// ============================================================
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';
    });
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .btn-primary, .btn-accent, .btn-outline, .btn-premium, .philosophy-card, .plan-card, .membership-card, .img-placeholder, .hero-video')) {
            cursorGlow.classList.add('active');
        } else {
            cursorGlow.classList.remove('active');
        }
    });
}

// ============================================================
// SCROLL PROGRESS
// ============================================================
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });
}

// ============================================================
// TOAST
// ============================================================
const toastContainer = document.getElementById('toastContainer');
function showToast(message, duration = 4000) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}
window.showToast = showToast;

// ============================================================
// HEADER SCROLL
// ============================================================
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    });
}

// ============================================================
// BACK TO TOP
// ============================================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.pageYOffset > 500);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// MOBILE MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

if (hamburger && mobileMenu && overlay) {
    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        overlay.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }
    
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) toggleMenu();
        });
    });
}

// ============================================================
// FAQ
// ============================================================
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.question');
    if (question) {
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    }
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
// JOIN BUTTONS
// ============================================================
document.querySelectorAll('.join-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const messages = {
            free: '⚔️ Redirecting to the free community...',
            paid: '🔒 Redirecting to the membership page...',
            vip: '👑 Redirecting to the Inner Circle application...'
        };
        showToast(messages[btn.dataset.tier] || 'Redirecting...');
    });
});

['joinNavBtn', 'joinMobileBtn', 'joinHeroBtn', 'finalCtaBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('⚔️ Entering The Iron...');
        });
    }
});

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]:not(.join-btn)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================================
// EXIT INTENT
// ============================================================
let exitIntentShown = false;
document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && !exitIntentShown) {
        exitIntentShown = true;
        showToast('⚔️ Wait! Don\'t leave without entering The Iron.', 6000);
    }
});

console.log('=== ⚔️ THE IRON ===');
console.log('Build a life you respect.');
console.log('Plan your life. Build accordingly.');
console.log('================================');
