const reveals = document.querySelectorAll(".disclose, .disclose-left, .disclose-up , .disclose-right");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));


