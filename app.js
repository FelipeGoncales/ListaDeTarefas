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
            textInput.maxLength = 30;

            const checkInput = document.createElement('input');
            checkInput.type = 'checkbox';
            checkInput.addEventListener('click', function() {
                const ulTarefas = document.getElementById('ul1');
                const ulConcluidas = document.getElementById('ul2');
                const li = this.parentNode;

                desabilitarOutrosCheckInput('none');

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
            dateInput.type = 'datetime-local';
            dateInput.value = data;
            dateInput.disabled = true;

            const lixeiraIcon = document.createElement('i');
            lixeiraIcon.classList.add('fa-regular', "fa-trash-can");
            lixeiraIcon.addEventListener("click", function() {
                const li = this.parentNode;
                const ul = li.parentNode;
                const btnLimpar = document.getElementById('btn-limpar');

                li.remove();
                if (document.getElementById('ul2').children.length === 0) {
                    addMensagem('ul2');
                    btnLimpar.style.display = 'none';
                }
                if (ul.children.length === 0) {
                    addMensagem(ul.id);
                }
            })

            const editIcon = document.createElement('i');
            editIcon.classList.add('fa-solid', 'fa-pen-to-square');
            editIcon.addEventListener('click', function() {
                const icon = this;
                const li = icon.parentNode;
                const ul = li.parentNode;
                const inputText = li.querySelector('input[type="text"]');
                const inputDate = li.querySelector('input[type="datetime-local"]');
                const checkInput = li.querySelector('input[type="checkbox"]')

                desabilitarOutrosCheckInput(li);

                if (inputText.disabled === true || inputDate.disabled === true) {
                    inputText.disabled = false;
                    inputDate.disabled = false;
                    icon.classList.replace('fa-pen-to-square', 'fa-check');
                    inputText.style.textDecoration = '';
                    checkInput.disabled = true;
                } else {
                    inputText.disabled = true;
                    inputDate.disabled = true;
                    icon.classList.replace('fa-check', 'fa-pen-to-square');
                    checkInput.disabled = false;
                    if (li.parentNode.id === 'ul2') {
                        inputText.style.textDecoration = 'line-through'
                    }
                }
            });

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

    document.querySelector('.div-btn-bg').addEventListener('click', function() {
        const icon = document.getElementById('iconMoonSun');
        const btnBg = document.getElementById('btn-dark-clear');
        const root = document.documentElement;

        let corSecundaria = getComputedStyle(root).getPropertyValue('--cor-secundaria').trim();
        const corSecundariaHex = corSecundaria.startsWith('rgb') ? rgbParaHex(corSecundaria) : corSecundaria;

        if (corSecundariaHex === '#FFFFFF') {
            icon.style.left = '100%';
            btnBg.style.paddingLeft = '8px';
            btnBg.style.paddingRight = '20px';
            btnBg.style.borderRadius = '30px 0 0 30px';
            btnBg.innerHTML = 'Light mode';
            icon.classList.replace('fa-moon', 'fa-sun');
            btnBg.style.backgroundColor = '#FFFFFF';
            btnBg.style.color = 'var(--cor-principal)';
            icon.style.backgroundColor = '#FFFFFF';
            icon.style.color = 'var(---cor-principal)'

            root.style.setProperty('--cor-secundaria', '#000000');
            root.style.setProperty('--bg-color', '#f6f6f6');
        }

        root.style.setProperty('--cor-principal', '#0f0139');
        root.style.setProperty('--cor-secundaria', '#FFFFFF');
        root.style.setProperty('--bg-color', '#f6f6f6');




        /* Cor Claro
            --cor-principal: #0f0139;
            --cor-secundaria: #ffffff;
            --cor-texto: #000000;
            --bg-color: #f4f4f4;
        */

        /* Cor escuro
            --cor-principal: #0f0139;
            --cor-secundaria: #2a2929;
            --cor-texto: #FFFFFF;
            --bg-color: #313131;
        */
    })
});

function desabilitarOutrosCheckInput(liAtual) {
    const allLi = document.body.querySelectorAll('li');
    allLi.forEach(li => {
        if (li !== liAtual) {
            const dateInput = li.querySelector('input[type="datetime-local"]');
            const textInput = li.querySelector('input[type="text"]');
            const checkInput = li.querySelector('input[type="checkbox"]')
            const editIcon = li.querySelector('.fa-pen-to-square, .fa-check')

            if (dateInput || textInput.disabled === false) {
                dateInput.disabled = true;
                textInput.disabled = true;
                checkInput.disabled = false;
                editIcon.classList.replace('fa-check', 'fa-pen-to-square')
            }
        }
    })
}

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
