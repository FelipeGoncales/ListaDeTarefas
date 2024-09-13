let tarefas = [];

function bandeja(sectionID) {
    let divTitle = document.getElementById('div-title'+sectionID);
    let divLista = document.getElementById('div-lista-'+sectionID);
    let iconeBandeja = document.getElementById('icone-bandeja-'+sectionID);

    if (divLista.style.display == 'none') {
        iconeBandeja.style.rotate = '90deg';
        divLista.style.display = 'flex';
    } else {
        iconeBandeja.style.rotate = '0deg';
        divLista.style.display = 'none';
    }
}

function adicionar() {
    let descricaoTarefa = document.getElementById('text-input').value;
    let dataTarefa = document.getElementById('date-input').value
    let secParaFazer = document.getElementById('div-lista-sec-a-fazer'); 
    let divLista = document.getElementById('div-lista-sec-a-fazer');
    let iconeBandeja = document.getElementById('icone-bandeja-sec-a-fazer');

    if (descricaoTarefa == '' || dataTarefa == '') {
        alert('É necessário informar todos os dados da tarefa')
    } else {
        let objeto = {
            nome: `${descricaoTarefa}`,
            data: `${dataTarefa}`
        }
        tarefas.push(objeto)

        let mensagem = ``;
        contador = 0;
        for (let tarefa of tarefas) {
            contador++
            mensagem += `
                <div class="div-input" id='div-input${contador}'>
                    <input type="text" class='text-input' id="text-input${contador}" value='${tarefa.nome}' disabled>
                    <input type="checkbox" class='check-input' id="check-input${contador}" onclick="verificar(${contador})">
                    <input type="date" class='date-input' id="date-input${contador}" value='${tarefa.data}' disabled>
                    <i class="fa-solid fa-pen-to-square" id='edit-icon${contador}' onclick='editar(${contador})'></i>
                    <i class="fa-regular fa-trash-can" onclick='deletar(${contador})'></i>
                </div>
            `
        }
        secParaFazer.innerHTML = mensagem;

        divLista.style.display = 'flex';
        iconeBandeja.style.rotate = '90deg';
    }
}

function editar(id) {
    let descricaoTarefa = document.getElementById('text-input'+id);
    let dataTarefa = document.getElementById('date-input'+id);
    let editarIcon = document.getElementById('edit-icon'+id);

    if (descricaoTarefa.disabled === false || dataTarefa.disabled === false) {
        dataTarefa.style.right = '';
        descricaoTarefa.disabled = true;
        dataTarefa.disabled = true;
        editarIcon.classList.remove('fa-check');
        editarIcon.classList.add('fa-pen-to-square');
    } else {
        dataTarefa.style.right = '80px';
        descricaoTarefa.disabled = false;
        dataTarefa.disabled = false;
        editarIcon.classList.remove('fa-pen-to-square');
        editarIcon.classList.add('fa-check');
    }
}

function verificar(id) {
    let divListaFazer = document.getElementById('div-lista-sec-a-fazer');
    let divListaConcluidas = document.getElementById('div-lista-sec-concluidas');
    let divInput = document.getElementById('div-input'+id);
    let checkInput = document.getElementById('check-input'+id);

    if (divListaConcluidas.innerHTML.trim() === `<p>Nenhuma tarefa disponível</p>`) {
        divListaConcluidas.innerHTML = ``;
    }

    if (checkInput.checked) {
        divListaConcluidas.appendChild(divInput);
        divInput.style.opacity = 0.8;
    } else {
        divListaFazer.appendChild(divInput);
        divInput.style.opacity = 1;
    }


    if (divListaFazer.childElementCount === 0) {
        divListaFazer.innerHTML = `
            <p>Nenhuma tarefa disponível</p>
        `;
    }
    if (divListaConcluidas.childElementCount === 0) {
        divListaConcluidas.innerHTML = `
            <p>Nenhuma tarefa disponível</p>
        `
    }
}

function deletar(id) {
    let divInput = document.getElementById('div-input'+id);
    divInput.remove();
    tarefas.splice(id-1,1)

    let divListaFazer = document.getElementById('div-lista-sec-a-fazer');
    let divListaConcluidas = document.getElementById('div-lista-sec-concluidas');
    if (divListaFazer.innerHTML.trim() === '') {
        divListaFazer.innerHTML = `
            <p>Nenhuma tarefa disponível</p>
        `;
    }
    if (divListaConcluidas.innerHTML.trim() === '') {
        divListaConcluidas.innerHTML = `
            <p>Nenhuma tarefa disponível</p>
        `
    }
}