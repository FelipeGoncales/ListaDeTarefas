document.addEventListener('DOMContentLoaded', () => {
    const nomeTarefa = document.getElementById('text-input').value;
    const btnSubmit = document.getElementById('btn-submit');

    btnSubmit.addEventListener('click', (event) => {

        const nome = document.getElementById('text-input').value.trim();
        const data = document.getElementById('date-input').value.trim()
        
        if (!nome || !data) {
            alert('É necessário informar a data e título da tarefa para continuar');
        } else {
            let ul = document.getElementById('ul1');
            let li = document.createElement('li');

            let textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = nome;
            textInput.disabled = true;

            let checkInput = document.createElement('input');
            checkInput.type = 'checkbox';

            let dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.value = data;

            li.classList.add('container');
            li.append(checkInput, textInput, dateInput);

            ul.appendChild(li);
        }
    }
    )
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