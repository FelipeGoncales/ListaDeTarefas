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
                <div class="div-input">
                    <input type="text" class='text-input' id="text-input${contador}" value='${tarefa.nome}' disabled>
                    <input type="checkbox" class='check-input' id="check-input${contador}" onclick="verificar()">
                    <input type="date" class='date-input' id="date-input${contador}" value='${tarefa.data}' disabled>
                    <i class="fa-solid fa-pen-to-square" onclick='editar(${contador})'></i>
                    <i class="fa-regular fa-trash-can" onclick='deletar()'></i>
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

    if (descricaoTarefa.disabled === false || dataTarefa.disabled === false) {
        dataTarefa.style.right = '';
        descricaoTarefa.disabled = true;
        dataTarefa.disabled = true;
    } else {
        dataTarefa.style.right = '80px';
        descricaoTarefa.disabled = false;
        dataTarefa.disabled = false;
    }
}

function verificar() {
    for (let tarefa of tarefas) {

    }
}

function detelar() {

}