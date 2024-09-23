document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
    const btnLimpar = document.getElementById('btn-limpar');
    btnLimpar.addEventListener('click', function() {
        const ulConcluidas = document.getElementById('ul2');
        const lis = ulConcluidas.querySelectorAll('li');
        lis.forEach(function(li) {
            li.remove()
        })
        this.style.display = 'none';
        addMensagem(ulConcluidas.id);
    })

    const btnSubmit = document.getElementById('btn-submit')
    btnSubmit.addEventListener('click', () => {
        const nome = document.getElementById('text-input').value.trim();
        const data = document.getElementById('date-input').value.trim();
        
        if (!nome || !data) {
            alert('É necessário informar a data e título da tarefa para continuar');
        } else {
            const ul = document.getElementById('ul1');
            const li = document.createElement('li');

            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = nome;
            textInput.disabled = true;

            const checkInput = document.createElement('input');
            checkInput.type = 'checkbox';
            checkInput.addEventListener('click', function() {
                const ulTarefas = document.getElementById('ul1');
                const ulConcluidas = document.getElementById('ul2');
                const li = this.parentNode;

                const textInput = li.querySelector('input[type="text"');
                const btnLimpar = document.getElementById('btn-limpar');
                if (this.checked) {
                    ulConcluidas.appendChild(li);
                    textInput.style.textDecoration = 'line-through';
                    if (ulConcluidas.style.display === 'flex') {
                        btnLimpar.style.display = 'block';
                    }
                } else {
                    ulTarefas.appendChild(li);
                    textInput.style.textDecoration = '';
                    if (ulConcluidas.querySelectorAll('li').length === 0) {
                        btnLimpar.style.display = 'none';
                    }
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

            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.value = data;
            dateInput.disabled = true;

            const lixeiraIcon = document.createElement('i');
            lixeiraIcon.classList.add('fa-regular', "fa-trash-can");
            lixeiraIcon.addEventListener("click", function() {
                const li = this.parentNode;
                const ul = li.parentNode;
                const btnLimpar = document.getElementById('btn-limpar');

                li.remove();
                if (ul.children.length === 0) {
                    addMensagem(ul.id);
                    btnLimpar.style.display = 'none';
                }
            })

            const editIcon = document.createElement('i');
            editIcon.classList.add('fa-solid', 'fa-pen-to-square');
            editIcon.addEventListener('click', function() {
                const icon = this;
                const li = icon.parentNode;
                const inputText = li.querySelector('input[type="text"]');
                const inputDate = li.querySelector('input[type="date"]');

                if (inputText.disabled === true || inputDate.disabled === true) {
                    inputText.disabled = false;
                    inputDate.disabled = false;
                    icon.classList.replace('fa-pen-to-square', 'fa-check');
                    inputText.style.textDecoration = '';
                } else {
                    inputText.disabled = true;
                    inputDate.disabled = true;
                    icon.classList.replace('fa-check', 'fa-pen-to-square');
                    if (li.parentNode.id === 'ul2') {
                        inputText.style.textDecoration = 'line-through'
                    }
                }
            })

            li.classList.add('container');
            li.append(checkInput, textInput, dateInput, editIcon, lixeiraIcon);

            ul.appendChild(li);

            if (ul.firstElementChild.nodeName === 'P') {
                ul.firstElementChild.remove();
            }

            const ulDisplay = window.getComputedStyle(ul).display;
            const seta = document.getElementById('seta1');
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
    const p = ul.querySelector('.mensagem-vazio');
    const seta = document.getElementById('seta' + n);

    const ulDisplay = window.getComputedStyle(ul).display;
    const btnLimpar = document.getElementById('btn-limpar')

    if (n == 2 && (ul.querySelectorAll('li').length > 0)) {
        if (ulDisplay == 'none') {
            ul.style.display = 'flex';
            seta.style.transform = 'rotate(90deg)';
            btnLimpar.style.display = 'block';
        } else {
            ul.style.display = 'none';
            seta.style.transform = 'rotate(0)';
            btnLimpar.style.display = 'none';
        }
    } else {
        btnLimpar.style.display = 'none';   
        if (ulDisplay == 'none') {
            ul.style.display = 'flex';
            seta.style.transform = 'rotate(90deg)';
        } else {
            ul.style.display = 'none';
            seta.style.transform = 'rotate(0)';
        }
    }
}
