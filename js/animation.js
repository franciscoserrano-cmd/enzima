const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            entry.target.classList.add('observed');
        }
    });
}, { threshold: 0.2 });

function observeReveals() {
    document.querySelectorAll('.disclose, .disclose-left, .disclose-up, .disclose-right').forEach(el => {
        if (!el.classList.contains('observed') && !el.classList.contains('hide')) {
            observer.observe(el);
        }
    });
}

window.observeReveals = observeReveals;
observeReveals();
window.addEventListener('load', observeReveals);
window.setTimeout(observeReveals, 300);


