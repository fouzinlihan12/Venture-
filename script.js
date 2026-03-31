document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
    });

    // Navbar & Scroll Progress Effect
    const navbar = document.querySelector('.navbar');
    const scrollBar = document.getElementById('scrollBar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollBar) {
            scrollBar.style.width = scrolled + "%";
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a.nav-link[href^="#"], a.btn[href^="#"], a.floating-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navCollapse = document.querySelector('.navbar-collapse');
                if (navCollapse && navCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navCollapse);
                    bsCollapse.hide();
                }

                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animated Counter
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');
        if (!trigger || !panel) return;

        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            faqItems.forEach(otherItem => {
                const otherTrigger = otherItem.querySelector('.faq-trigger');
                const otherPanel = otherItem.querySelector('.faq-panel');
                otherItem.classList.remove('is-open');
                if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                if (otherPanel) otherPanel.hidden = true;
            });

            if (!isOpen) {
                item.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
                panel.hidden = false;
            }
        });
    });

    // ======== MODERN 3D & INTERACTIVE FEATURES ========

    // 1. MOUSE PARALLAX EFFECT ON HERO IMAGE
    const heroWrapper = document.querySelector('.hero-image-wrapper');
    if (heroWrapper) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth) * 20 - 10;
            const mouseY = (e.clientY / window.innerHeight) * 20 - 10;
            heroWrapper.style.transform = `perspective(1000px) rotateX(${mouseY * 0.5}deg) rotateY(${mouseX * 0.5}deg)`;
        });
    }

    // 2. ANIMATED GRADIENT BACKGROUND
    const hasGradientElements = document.querySelectorAll('.gradient-animate');
    hasGradientElements.forEach(el => {
        el.style.backgroundSize = '400% 400%';
    });

    // 3. ENHANCED 3D CARD HOVER
    document.querySelectorAll('.group').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) * 0.02;
            const rotateY = -(x - rect.width / 2) * 0.02;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });

    // 4. SCROLL-BASED PARALLAX WITH PERFORMANCE OPTIMIZATION
    let lastScrollY = 0;
    let animationId = null;

    const updateParallax = () => {
        const elements = document.querySelectorAll('.floating-img, hero-image-wrapper img');
        elements.forEach(el => {
            const scrollPosition = window.scrollY;
            const rate = scrollPosition * 0.05;
            el.style.transform = `translateY(${rate}px) rotate(${rate * 0.02}deg)`;
        });
        animationId = null;
    };

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!animationId) {
            animationId = requestAnimationFrame(updateParallax);
        }
    }, { passive: true });

    // 5. TEXT REVEAL ANIMATION ON SCROLL
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('text-reveal');
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    textElements.forEach(el => {
        textObserver.observe(el);
    });

    // 6. CURSOR GLOW EFFECT FOLLOWING MOUSE
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(139,48,94,0.15) 0%, rgba(139,48,94,0) 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        filter: blur(40px);
        display: none;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.display = 'block';
        cursorGlow.style.left = (e.clientX - 150) + 'px';
        cursorGlow.style.top = (e.clientY - 150) + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.display = 'none';
    });

    // 7. BUTTON RIPPLE EFFECT
    document.querySelectorAll('button, .btn, a.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (e.touches) return;
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 8. ADD CSS ANIMATION FOR RIPPLE
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 9. STAGGER ANIMATIONS FOR LIST ITEMS
    document.querySelectorAll('.stagger-item').forEach((item, index) => {
        item.style.animationDelay = (index * 0.1) + 's';
    });

    // 10. SCROLL PROGRESS CIRCLE
    const progressCircle = document.querySelector('.scroll-progress-bar');
    if (progressCircle) {
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            if (scrollPercent > 20) {
                progressCircle.style.boxShadow = `0 0 20px rgba(139, 48, 94, ${scrollPercent / 100})`;
            }
        });
    }

    // ======== SWIPER CAROUSEL INITIALIZATION ========
    // FIX: Single initialization only, with autoHeight: true so slides size to content
    const serviceCarousel = new Swiper('.service-carousel', {
        loop: true,
        speed: 4500,
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        allowTouchMove: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.service-carousel-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.service-carousel-next',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        },
    });

    const serviceCarouselNext = document.querySelector('.service-carousel-next');
    if (serviceCarouselNext && serviceCarousel) {
        serviceCarouselNext.addEventListener('click', () => {
            serviceCarousel.slideNext(600);
            if (serviceCarousel.autoplay) {
                serviceCarousel.autoplay.stop();
                setTimeout(() => serviceCarousel.autoplay.start(), 800);
            }
        });
    }

    // ======== FOOTER SLIDE-IN IMAGE ANIMATION ========
    const footerSlideImage = document.getElementById('footer-slide-image');
    if (footerSlideImage) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footerSlideImage.style.animation = 'footer-fade-in 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                    footerObserver.unobserve(footerSlideImage);
                }
            });
        }, { threshold: 0.1 });

        footerObserver.observe(footerSlideImage);
    }

    // ======== ENHANCED CYCLING TEXT WITH ICONS ========
    document.querySelectorAll('.cycle-text, .mandoob-cycle-text').forEach((cycleText) => {
        const words = (cycleText.dataset.words || '')
            .split(',')
            .map(word => word.trim())
            .filter(Boolean);

        const iconMap = {
            'Transparency': 'fa-eye',
            'Time Efficiency': 'fa-rocket',
            'Legal Compliance': 'fa-gavel',
            'Cost Saving': 'fa-coins',
            'Fast Coordination': 'fa-handshake',
            'Operational Clarity': 'fa-magnifying-glass-chart'
        };

        if (words.length > 1) {
            let currentWordIndex = 0;

            const updateWord = () => {
                const currentWord = words[currentWordIndex];
                const icon = iconMap[currentWord] || '';
                
                if (cycleText.classList.contains('cycle-text') && icon) {
                    cycleText.innerHTML = `<span class="cycle-word-wrapper"><i class="fas ${icon} cycle-word-icon"></i><span>${currentWord}</span></span>`;
                } else {
                    cycleText.textContent = currentWord;
                }
                
                cycleText.classList.remove('is-changing');
                void cycleText.offsetWidth;
                cycleText.classList.add('is-changing');
            };

            updateWord();

            setInterval(() => {
                currentWordIndex = (currentWordIndex + 1) % words.length;
                updateWord();
            }, 2200);
        }
    });

    // Offering Cycle Text
    const offeringCycleText = document.querySelector('.offering-cycle-text .cycle-word');
    const offeringDescriptionText = document.getElementById('offering-description-text');
    const offeringIcon = document.querySelector('.offering-icon');
    const indicators = document.querySelectorAll('.indicator');
    
    if (offeringCycleText && offeringDescriptionText) {
        const offerings = [
            { text: 'Business Compliance', icon: 'fa-shield-halved', description: 'Comprehensive regulatory solutions tailored to your business needs' },
            { text: 'Tax Advisory', icon: 'fa-calculator', description: 'Expert tax planning and FTA compliance services' },
            { text: 'License Support', icon: 'fa-certificate', description: 'Complete business licensing and permit assistance' },
            { text: 'Financial Consulting', icon: 'fa-chart-line', description: 'Strategic financial guidance for sustainable growth' },
            { text: 'Legal Documentation', icon: 'fa-file-contract', description: 'Professional legal document preparation and review' }
        ];
        
        let currentOfferingIndex = 0;
        
        function updateOffering() {
            const offering = offerings[currentOfferingIndex];
            
            offeringIcon.style.transform = 'rotate(360deg) scale(0.8)';
            offeringIcon.style.opacity = '0';
            setTimeout(() => {
                offeringIcon.className = `fa-solid ${offering.icon} offering-icon`;
                offeringIcon.style.color = '#8B305E';
                offeringIcon.style.transform = 'rotate(0deg) scale(1)';
                offeringIcon.style.opacity = '1';
            }, 300);
            
            offeringCycleText.style.transform = 'translateY(-20px)';
            offeringCycleText.style.opacity = '0';
            setTimeout(() => {
                offeringCycleText.textContent = offering.text;
                offeringCycleText.style.transform = 'translateY(0)';
                offeringCycleText.style.opacity = '1';
            }, 300);
            
            offeringDescriptionText.style.transform = 'translateY(10px)';
            offeringDescriptionText.style.opacity = '0';
            setTimeout(() => {
                offeringDescriptionText.textContent = offering.description;
                offeringDescriptionText.style.transform = 'translateY(0)';
                offeringDescriptionText.style.opacity = '1';
            }, 400);
            
            indicators.forEach((indicator, index) => {
                if (index === currentOfferingIndex) {
                    indicator.style.background = '#8B305E';
                    indicator.style.transform = 'scale(1.2)';
                } else {
                    indicator.style.background = 'rgba(139, 48, 94, 0.3)';
                    indicator.style.transform = 'scale(1)';
                }
            });
        }
        
        offeringIcon.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        offeringCycleText.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        offeringDescriptionText.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        indicators.forEach(indicator => {
            indicator.style.transition = 'all 0.3s ease';
        });
        
        updateOffering();
        
        setInterval(() => {
            currentOfferingIndex = (currentOfferingIndex + 1) % offerings.length;
            updateOffering();
        }, 3500);
    }

});