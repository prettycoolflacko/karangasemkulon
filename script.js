document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Sticky & Mobile Menu Toggle
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger to X (Optional)
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. Hero Background Carousel
    const heroSlides = document.querySelectorAll('.hero-carousel .slide');
    let currentHeroSlide = 0;

    function nextHeroSlide() {
        heroSlides[currentHeroSlide].classList.remove('active');
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        heroSlides[currentHeroSlide].classList.add('active');
    }

    // Change hero background every 5 seconds
    setInterval(nextHeroSlide, 5000);

    // 3. Mini Carousel (Tentang Desa)
    const miniSlides = document.querySelectorAll('.mini-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentMiniSlide = 0;
    let miniCarouselInterval;

    function showMiniSlide(index) {
        // Handle bounds
        if (index >= miniSlides.length) currentMiniSlide = 0;
        else if (index < 0) currentMiniSlide = miniSlides.length - 1;
        else currentMiniSlide = index;

        // Update classes
        miniSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        miniSlides[currentMiniSlide].classList.add('active');
        dots[currentMiniSlide].classList.add('active');
    }

    function nextMiniSlide() {
        showMiniSlide(currentMiniSlide + 1);
    }

    function prevMiniSlide() {
        showMiniSlide(currentMiniSlide - 1);
    }

    // Event Listeners for Mini Carousel
    nextBtn.addEventListener('click', () => {
        nextMiniSlide();
        resetMiniCarouselInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevMiniSlide();
        resetMiniCarouselInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showMiniSlide(index);
            resetMiniCarouselInterval();
        });
    });

    // Auto-advance Mini Carousel
    function startMiniCarousel() {
        miniCarouselInterval = setInterval(nextMiniSlide, 4000);
    }

    function resetMiniCarouselInterval() {
        clearInterval(miniCarouselInterval);
        startMiniCarousel();
    }

    startMiniCarousel();

    // 4. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

});
