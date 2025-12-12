// 1. Initialize Lenis (The "Butter Smooth" Scroll)
const lenis = new Lenis({
    duration: 1.2, // Control speed
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    direction: 'vertical',
    smooth: true,
});

// Create the animation loop for Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation A: Hero Text Fade Up
gsap.from(".anim-text", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2, // Delay between elements
    ease: "power3.out"
});

// Animation B: Feature Cards appear when you scroll to them
gsap.from(".feature-card", {
    scrollTrigger: {
        trigger: ".features",
        start: "top 80%", // Animation starts when top of section hits 80% of viewport
        toggleActions: "play none none reverse", // Replays on scroll up
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// 3. Initialize Swiper (For your Pagination/Gallery)
const swiper = new Swiper('.mySwiper', {
    loop: true,
    speed: 600,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true, // "Cool" effect where dots resize
    },
    effect: 'coverflow', // 3D effect
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
});