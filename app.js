document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });

    let btnSubmit = document.getElementById('btn-submit')
    btnSubmit.addEventListener('click', () => {
        const nome = document.getElementById('text-input').value.trim();
        const data = document.getElementById('date-input').value.trim();
        
        if (!nome || !data) {
            alert('É necessário informar a data e título da tarefa para continuar');
        } else {
            const ul = document.getElementById('ul1');
            const li = document.createElement('li');

            let textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = nome;
            textInput.disabled = true;

            let checkInput = document.createElement('input');
            checkInput.type = 'checkbox';
            checkInput.addEventListener('click', function() {
                let ulTarefas = document.getElementById('ul1');
                let ulConcluidas = document.getElementById('ul2');

                let li = this.parentNode;
                if (this.checked) {
                    ulConcluidas.appendChild(li);
                } else {
                    ulTarefas.appendChild(li)
                }

                if (ulTarefas.children.length === 0) {
                    addMensagem(ulTarefas.id);
                }
                if (ulConcluidas.children.length === 0) {
                    addMensagem(ulConcluidas.id)
                } 

                removeMensagem(ulTarefas.id);
                removeMensagem(ulConcluidas.id);
            })

            let dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.value = data;
            dateInput.disabled = true;

            let lixeiraIcon = document.createElement('i');
            lixeiraIcon.classList.add('fa-regular', "fa-trash-can");
            lixeiraIcon.addEventListener("click", function() {
                let li = this.parentNode;
                let ul = li.parentNode;
                li.remove();
                if (ul.children.length === 0) {
                    addMensagem(ul.id);
                }
            })

            let editIcon = document.createElement('i');
            editIcon.classList.add('fa-solid', 'fa-pen-to-square');
            editIcon.addEventListener('click', function() {
                let icon = this;
                let li = icon.parentNode;
                let inputText = li.querySelector('input[type="text"]');
                let inputDate = li.querySelector('input[type="date"]');

                if (inputText.disabled === true || inputDate.disabled === true) {
                    inputText.disabled = false;
                    inputDate.disabled = false;
                    icon.classList.replace('fa-pen-to-square', 'fa-check');
                } else {
                    inputText.disabled = true;
                    inputDate.disabled = true;
                    icon.classList.replace('fa-check', 'fa-pen-to-square');
                }
            })

            li.classList.add('container');
            li.append(checkInput, textInput, dateInput, editIcon, lixeiraIcon);

            ul.appendChild(li);

            if (ul.firstElementChild.nodeName === 'P') {
                ul.firstElementChild.remove();
            }

            let ulDisplay = window.getComputedStyle(ul).display;
            let seta = document.getElementById('seta1');
            if (ulDisplay == 'none') {
                ul.style.display = 'flex';
                seta1.style.transform = 'rotate(90deg)';
            }
        }
    });
});

function removeMensagem(ulId) {
    const ul = document.getElementById(ulId);
    const p = ul.querySelector('.mensagem-vazio');
    if (ul.children.length > 1 && p) {
        p.remove()
    }
}

function addMensagem(ulId) {
    const ul = document.getElementById(ulId);
    if (ul.children.length === 0) {
        const p = document.createElement('p');
        p.innerText = 'Nenhuma tarefa encontrada';
        p.classList.add('mensagem-vazio');
        ul.appendChild(p);
    }
}

function bandeja(n) {
    const ul = document.getElementById('ul' + n);
    const seta = document.getElementById('seta' + n);

    const ulDisplay = window.getComputedStyle(ul).display;

    if (ulDisplay == 'none') {
        ul.style.display = 'flex';
        seta.style.transform = 'rotate(90deg)';
    } else {
        ul.style.display = 'none';
        seta.style.transform = 'rotate(0)';
    }
}
