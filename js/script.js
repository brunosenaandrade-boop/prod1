// ================================================
// LANDING PAGE EMOCIONAL - SCRIPTS
// ================================================

// COUNTDOWN DE URGÊNCIA
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    // Pega ou cria a data de expiração no localStorage
    let expireTime = localStorage.getItem('offerExpireTime');

    if (!expireTime) {
        // Define expiração para 24 horas a partir de agora
        const now = new Date();
        now.setHours(now.getHours() + 24);
        expireTime = now.getTime();
        localStorage.setItem('offerExpireTime', expireTime);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = expireTime - now;

        if (distance < 0) {
            // Reinicia o contador quando expira
            const newExpire = new Date();
            newExpire.setHours(newExpire.getHours() + 24);
            expireTime = newExpire.getTime();
            localStorage.setItem('offerExpireTime', expireTime);
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.textContent =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ ACCORDION
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Fecha todos os outros
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle o atual
            item.classList.toggle('active');
        });
    });
}

// SMOOTH SCROLL
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 60; // Compensar a barra de urgência
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ANIMAÇÕES DE SCROLL (Fade In)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Para de observar após animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todos os elementos com fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// EFEITO DE PARALLAX SUAVE NO HERO (opcional)
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = rate + 'px';
        }
    });
}

// TRACKING DE CLIQUES NOS CTAs (para analytics)
function initCTATracking() {
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('click', function() {
            // Pode adicionar integração com Google Analytics, Facebook Pixel, etc.
            console.log('CTA clicked:', this.textContent.trim());

            // Exemplo para Google Analytics 4:
            // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': this.textContent.trim() });

            // Exemplo para Facebook Pixel:
            // fbq('track', 'InitiateCheckout');
        });
    });
}

// EFEITO DE "SHAKE" NO CTA QUANDO USUÁRIO ESTÁ PARA SAIR
function initExitIntent() {
    let triggered = false;

    document.addEventListener('mouseout', function(e) {
        if (triggered) return;

        // Se o mouse saiu pela parte superior da página
        if (e.clientY < 10) {
            triggered = true;

            // Adiciona efeito de atenção no CTA principal
            const mainCTA = document.querySelector('.hero .cta-button');
            if (mainCTA) {
                mainCTA.style.animation = 'none';
                mainCTA.offsetHeight; // Trigger reflow
                mainCTA.style.animation = 'shake 0.5s ease-in-out 3';
            }

            // Reset após alguns segundos para poder triggar novamente
            setTimeout(() => {
                triggered = false;
            }, 30000);
        }
    });
}

// DESTAQUE NO PREÇO (pequena animação)
function initPriceHighlight() {
    const priceBox = document.querySelector('.price-box');
    if (!priceBox) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceValue = priceBox.querySelector('.price-value');
                if (priceValue) {
                    priceValue.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        priceValue.style.transform = 'scale(1)';
                    }, 300);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(priceBox);
}

// NÚMERO DE PESSOAS VISUALIZANDO (PROVA SOCIAL DINÂMICA)
function initDynamicSocialProof() {
    const socialProofText = document.querySelector('.social-proof-text strong');
    if (!socialProofText) return;

    // Simula pequenas variações no número
    setInterval(() => {
        const baseNumber = 2847;
        const variation = Math.floor(Math.random() * 20) - 10;
        const newNumber = baseNumber + variation;
        socialProofText.textContent = '+' + newNumber.toLocaleString('pt-BR') + ' mulheres';
    }, 5000);
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initCTATracking();
    initExitIntent();
    initPriceHighlight();
    initDynamicSocialProof();
});

// Adiciona estilos para a animação de shake
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);
