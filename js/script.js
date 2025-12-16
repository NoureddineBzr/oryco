const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


gsap.registerPlugin(ScrollTrigger);

const heroTl = gsap.timeline();
heroTl.from(".hero-title", {
    y: 100,
    skewY: 7,
    duration: 1.5,
    stagger: 0.1,
    ease: "power4.out"
})
.to(".hero-subtitle", { opacity: 1, y: 0, duration: 1 }, "-=1")
.to(".hero-cta", { opacity: 1, y: 0, duration: 1 }, "-=0.8");

gsap.to(".hero-bg", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    yPercent: 30,
    scale: 1.1
});

gsap.from(".reveal-image", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

ScrollTrigger.matchMedia({
    "(min-width: 769px)": function() {
        const section = document.querySelector(".horizontal-scroll");
        const track = document.querySelector(".animation-wrap");

        function getScrollAmount() {
            let trackWidth = track.scrollWidth;
            return -(trackWidth - window.innerWidth + (window.innerWidth * 0.4));
        }

        const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
        });

        ScrollTrigger.create({
            trigger: ".horizontal-scroll",
            start: "top top",
            end: () => `+=${Math.abs(getScrollAmount())}`, 
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true,
        });
    }
});

ScrollTrigger.matchMedia({
    "(min-width: 1025px)": function() {
        const details = gsap.utils.toArray(".text-block");
        const photos = gsap.utils.toArray(".photo");

        details.forEach((detail, index) => {
            ScrollTrigger.create({
                trigger: detail,
                start: "top center",
                end: "bottom center",
                onEnter: () => updatePhoto(index),
                onEnterBack: () => updatePhoto(index),
            });
        });

        function updatePhoto(index) {
            photos.forEach(photo => photo.classList.remove("active"));
            if(photos[index]) {
                photos[index].classList.add("active");
            }
        }
    }
});


gsap.set(".price-card", { y: 50, opacity: 0 });

ScrollTrigger.batch(".price-card", {
    start: "top 85%",
    onEnter: batch => gsap.to(batch, {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power2.out",
        overwrite: true 
    })
});

gsap.from(".footer-col", {
    scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out"
});

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});


const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    bodyElement.classList.add(currentTheme);
}

if(themeToggleBtn){
    themeToggleBtn.addEventListener('click', () => {
        bodyElement.classList.toggle('light-mode');
        
        if (bodyElement.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
        } else {
            localStorage.removeItem('theme'); 
        }
    });
}