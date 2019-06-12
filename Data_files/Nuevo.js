//-----------------------------------------------------------------------------------------------//

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



/*

const url = 'https://api.propublica.org/congress/v1/113/house/members.json';
const init_str = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'L6x2Gbl9kawrKwFw4kQp75kCXLgCQokZEtDC1zFN',
  },
  mode: 'cors',
};


fetch(url, init_str)
  .then(response => response.json())
  .then(json => {
    app.miembros = json.results[0].members
    app.miembrosFiltered = json.results[0].members
  })
  .catch(error => console.log(error))



  var app = new Vue({
    el: '#app',
    data: {
      miembros: [],
      miembrosFiltered: [],
      listState: 'All',
    },
    computed: {
      listaEstados: function () {
        // devuelve el listado de estados único para colocar en el select
        return this.miembros.map(element => element.state).sort().filter((item, index, array) => array.indexOf(item) === index);
      },
      totalMiembros: function() {
        return this.miembrosFiltered.length
      }
    },
    methods: {
      filter: function() {
        let aux = []
        let result = []
        this.miembrosFiltered = this.miembros
        var checkedBoxes = document.querySelectorAll('input[name=party]:checked');
        var partidos = Array.from(checkedBoxes).map(element => element.value)
        var listState = document.querySelector("#state").value
        partidos.forEach(partido => {
          if(listState === 'All') {
            aux = this.miembrosFiltered.filter(miembro => miembro.party === partido)
          }
          else {
          aux = this.miembrosFiltered.filter(miembro => miembro.party === partido && miembro.state === listState)
          }
          result = result.concat(aux)
        })
        result.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
        return this.miembrosFiltered = result
      }
    }
  });

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