document.addEventListener('DOMContentLoaded', () => {
    const nomeTarefa = document.getElementById('text-input').value;
    const btnSubmit = document.getElementById('btn-submit');
}
)

function bandeja(n) {
    const ul = document.getElementById('ul'+n);
    const seta = document.getElementById('seta'+n);

    const ulDisplay = window.getComputedStyle(ul).display;

    if (ulDisplay == 'none') {
        ul.style.display = 'flex';
        seta.style.transform = 'rotate(90deg)';
    } else {
        ul.style.display = 'none';
        seta.style.transform = 'rotate(0)';
    }
}