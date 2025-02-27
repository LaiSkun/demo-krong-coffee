// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuContent = document.getElementById('mobileMenuContent');

    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenuContent.classList.remove('translate-x-full');
        }, 10);
    } else {
        mobileMenuContent.classList.add('translate-x-full');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Intersection Observer for lazy loading animations
    const animateOnScroll = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll(
        '.text-center.mb-12, .bg-white.p-6, .space-y-4 p, .w-24.h-24.mx-auto, .grid.grid-cols-1 > div'
    );

    // Initialize elements with opacity 0 and observe them
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        animateOnScroll.observe(element);
    });

    // Intersection Observer for about section image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(aboutImage);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (!document.getElementById('mobileMenu').classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });

    // Add scroll event listener for parallax effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.bg-[url]').forEach(element => {
            const speed = 0.5;
            element.style.backgroundPositionY = `${scrolled * speed}px`;
        });
    });

   
});