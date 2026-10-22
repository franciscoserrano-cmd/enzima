const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.classList.add('observed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 })
    : null;

function observeReveals() {
    document.querySelectorAll('.disclose, .disclose-left, .disclose-up, .disclose-right').forEach(el => {
        if (!el.classList.contains('observed') && !el.classList.contains('hide')) {
            if (observer) {
                observer.observe(el);
            } else {
                el.classList.add('show', 'observed');
            }
        }
    });
}

window.observeReveals = observeReveals;
observeReveals();
window.addEventListener('load', observeReveals);
window.setTimeout(observeReveals, 300);


