document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });

    let tarefasPendentes = JSON.parse(localStorage.getItem('tarefasPendentes') || '[]');
    let tarefasConcluidas = JSON.parse(localStorage.getItem('tarefasConcluidas') || '[]')

    tarefasPendentes.forEach(li => {
        criarTarefa('ul1', li.texto, li.data, false)
    })

    tarefasConcluidas.forEach(li => {
        criarTarefa('ul2', li.texto, li.data, true)
    })
    
    const btnLimpar = document.getElementById('btn-limpar');
    btnLimpar.addEventListener('click', function() {
        const ulConcluidas = document.getElementById('ul2');
        const lis = ulConcluidas.querySelectorAll('li');
        lis.forEach(function(li) {
            li.remove()
        })
        this.style.display = 'none';
        addMensagem(ulConcluidas.id);

        salvarItens(2);
    })

    document.getElementById('ul2').style.display = 'none';

    const btnSubmit = document.getElementById('btn-submit')
    btnSubmit.addEventListener('click', function() {
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

                removerMensagem(ulTarefas.id);
                removerMensagem(ulConcluidas.id);

                salvarItens(1);
                salvarItens(2);
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

                let num = parseInt(ul.id.replace('ul',''))
                salvarItens(num)
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

            salvarItens(1);
        }   
    });

    document.querySelector('.div-btn-bg').addEventListener('click', function() {
        const icon = document.getElementById('iconMoonSun');
        const btnBg = document.getElementById('btn-dark-clear');
        const root = document.documentElement;

        let corSecundaria = getComputedStyle(root).getPropertyValue('--cor-secundaria').trim();
        const corSecundariaHex = corSecundaria.startsWith('rgb') ? rgbParaHex(corSecundaria) : corSecundaria;

        if (icon.classList.contains('fa-moon')) {
            icon.style.left = '100%';
            btnBg.style.paddingLeft = '8px';
            btnBg.style.paddingRight = '20px';
            btnBg.innerHTML = 'Light mode';
            icon.classList.replace('fa-moon', 'fa-sun');
            btnBg.style.backgroundColor = '#FFFFFF';
            btnBg.style.color = 'var(--cor-principal)';
            icon.style.backgroundColor = '#FFFFFF';
            icon.style.color = 'var(---cor-principal)'

            root.style.setProperty('--cor-secundaria', '#16171b');
            root.style.setProperty('--bg-color', '#252529');
            root.style.setProperty('--cor-texto', '#FFFFFF')
        } else {
            icon.style.left = '0%';
            btnBg.style.paddingRight = '8px';
            btnBg.style.paddingLeft = '20px';
            btnBg.innerHTML = 'Dark mode';
            icon.classList.replace('fa-sun', 'fa-moon');
            btnBg.style.backgroundColor = 'var(--cor-principal)';
            btnBg.style.color = '#FFFFFF';
            icon.style.backgroundColor = 'var(--cor-principal)';
            icon.style.color = '#FFFFFF'

            root.style.setProperty('--cor-secundaria', '#ffffff');
            root.style.setProperty('--bg-color', '#f6f6f6');
            root.style.setProperty('--cor-texto', '#000000')
        }
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

function removerMensagem(ulId) {
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


function criarTarefa(ulID, texto, data, checkInputCheck) {
    const ul = document.getElementById(ulID);
    const li = document.createElement('li');
    
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = texto;
    textInput.disabled = true;
    textInput.maxLength = 30;
    
    const checkInput = document.createElement('input');
    checkInput.type = 'checkbox';
    checkInput.checked = checkInputCheck;
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
        
        removerMensagem(ulTarefas.id);
        removerMensagem(ulConcluidas.id);
        
        salvarItens(1);
        salvarItens(2);
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
        
        let num = parseInt(ul.id.replace('ul',''))
        salvarItens(num)
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

function salvarItens(ulID) {
    const ul = document.getElementById('ul'+ulID);
    let tarefas = [];

    if (ul) {
        ul.querySelectorAll('li').forEach(li => {
            const tarefaTexto = li.querySelector('input[type="text"]').value;
            const tarefaData = li.querySelector('input[type="datetime-local"]').value;
            tarefas.push({'texto': tarefaTexto, 'data': tarefaData});       
        })
        
        if (ulID === 1) {
            console.log('Tarefas pendentes salvas')
            localStorage.setItem('tarefasPendentes', JSON.stringify(tarefas));
        } else if (ulID === 2) {
            console.log('Tarefas concluídas salvas')
            localStorage.setItem('tarefasConcluidas', JSON.stringify(tarefas));
        }
    }
}