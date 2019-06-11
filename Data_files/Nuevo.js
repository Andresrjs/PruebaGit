/*//-----------------------------------------------------------------------------------------------//

createSenateTable();

function createSenateTable(){

    var elSenateTable = document.getElementById('table-data');
    tableEl = addTableToHTML(miFiltro(data.results[0].members));

    elSenateTable.innerHTML = tableEl;

}


//--------------------------------------------------------------------------------------------------------//
function addTableToHTML(arrayDeMiembros) {
    var elementoHtml = '<thead class="thead-dark"><tr><th>Full Name</th><th>Party</th><th>State</th><th>Seniority</th><th>Percentage of votes with party</th></tr></thead>';
    elementoHtml += '<tbody>';

    arrayDeMiembros.forEach(function (member) {
        elementoHtml += '<tr>';
        if (member.middle_name === null) {
            elementoHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.last_name + '</td>';
        } else {
            elementoHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.middle_name + ' ' + member.last_name + '</a></td>';
        }
        elementoHtml += '<td class="party">' + member.party + '</td>';
        elementoHtml += '<td class="state">' + member.state + '</td>';
        elementoHtml += '<td>' + member.seniority + '</td>';
        elementoHtml += '<td> % ' + member.votes_with_party_pct + '</td>';
        elementoHtml += '</tr>';
    });
    elementoHtml += '</tbody>';
    return elementoHtml;
}

function miFiltro(arrayBruto) {
    //console.log("filtros:", arrayBruto);

    let valoresTildados = document.querySelectorAll("input[name=party-filter]:checked");
    let selected = document.querySelector('#select-states').value;
    console.log(selected);

    console.log(valoresTildados);
    valoresTildados = Array.from(valoresTildados);
    console.log(valoresTildados);
    valoresTildados = valoresTildados.map(function (input) {
        return input.value
    });
    console.log(valoresTildados);
    listaFiltrada = []

    if (selected !== 'ALL') {
        for (let i = 0; i < arrayBruto.length; i++) {

            if (valoresTildados.includes(arrayBruto[i].party) && (arrayBruto[i].state === selected)) {
                listaFiltrada.push(arrayBruto[i])
            }

        }
    } else {
        for (let i = 0; i < arrayBruto.length; i++) {

            if (valoresTildados.includes(arrayBruto[i].party)) {
                listaFiltrada.push(arrayBruto[i])
            }

        }
    }

    console.log( listaFiltrada)
    return listaFiltrada
}

*/


var url = "";
if (document.title == "Senate starter page") {
    url = 'https://api.propublica.org/congress/v1/113/senate/members.json'
} else {
    url = 'https://api.propublica.org/congress/v1/113/house/members.json'
};

onload = (function () {
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'X-API-Key': 'cWbop5wBqK2HIQRT1rgkM8VgkpuDI5vZsiPnHvRh',
        })
    })
        .then((resp) => resp.json())
        .then(data => {
            vueF.miembrosVue = data.results[0].members;
        }).catch(err => console.log(err))
})