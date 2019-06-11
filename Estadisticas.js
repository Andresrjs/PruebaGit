var memberm = data.results[0].members
var diezporciento = Math.round(memberm.length * 10 / 100);

var statistics = {
  "number_of_democrats": 0,
  "number_of_republicans": 0,
  "number_of_independents": 0,
  "total": 0,
  "democrats_average_votes_with_party": 0,
  "republicans_average_votes_with_party": 0,
  "independents_average_votes_with_party": 0,
  "total_average": 0,
  "least_engaged": [],
  "most_engaged": [],
  "least_loyal": [],
  "most_loyal": [],
};


statistics.number_of_democrats = calcularm(memberm, "D");
statistics.number_of_independents = calcularm(memberm, "I");
statistics.number_of_republicans = calcularm(memberm, "R");
statistics.democrats_average_votes_with_party = calcularp(memberm, "D");
statistics.republicans_average_votes_with_party = calcularp(memberm, "R");
statistics.independents_average_votes_with_party = calcularp(memberm, "I");
statistics.total = calcularm(memberm, "D") + calcularm(memberm, "I") + calcularm(memberm, "R");
statistics.total_average = calcularptotal(memberm);
statistics.most_loyal = primeros(memberm, diezporciento, "perdido", "menores");
statistics.most_engaged = primeros(memberm, diezporciento, "voto", "menores");
statistics.least_engaged = primeros(memberm, diezporciento, "voto", "mayores");
statistics.least_loyal = primeros(memberm, diezporciento, "perdido", "mayores");

console.log(statistics.most_engaged);

/*-------------------------------Calcular Numero de miembros------------------------------*/

function calcularm(array, listarpartido) {
  let contador = array.filter(function (members) {
    return members.party === listarpartido;
  })

  return contador.length;

}

/*---------------------------------------Calcular porcentaje de votos---------------------------*/

function calcularp(arrayMembers, nombreDePartido) {
  let divisor = 0;
  let contador = 0;
  arrayMembers.forEach(element => {
    if (element.party === nombreDePartido) {
      contador += element.votes_with_party_pct;
      divisor++;
    }

  });
  return (contador / divisor).toFixed(2);
}

/*--------------------------Calcular total porcentaje de votos-----------------------------*/

function calcularptotal(arrayMembers) {
  let contador = 0;
  arrayMembers.forEach(element => {
    contador += element.votes_with_party_pct;
  }
  );
  return (contador / arrayMembers.length).toFixed(2);
}

var table1 = document.getElementById("table1");
if (table1 != undefined) {
  table1.innerHTML = addTable();
}

var table2 = document.getElementById("table2");
if (table2 != undefined) {
  table2.innerHTML = addTable1("menos");
}
var table3 = document.getElementById("table3");
if (table3 != undefined) {
  table3.innerHTML = addTable1("mas");
}
var table4 = document.getElementById("table4");
if (table4 != undefined) {
  table4.innerHTML = addTable2("mas");
}

var table5 = document.getElementById("table5");
if (table5 != undefined) {
  table5.innerHTML = addTable2("menos");
}

/*---------------------------Toma los Primeros---------------------------------------------------*/


function primeros(arraymiembros, porcentaje, votos, mayomen) {
  let menores = [];
  let contador = porcentaje;
  let ordenados = [];

  if (mayomen == "menores") {
    ordenados = ordenarmenormayor(arraymiembros, votos);
  }

  else {
    ordenados = ordenarmayormenor(arraymiembros, votos);
  }

  for (i = 0; i < porcentaje; i++) {
    menores.push(ordenados[i]);
  }

  if (votos == "perdido") {
    while (menores[porcentaje - 1].votes_with_party_pct == ordenados[contador].votes_with_party_pct) {
      menores.push(ordenados[contador]);
      contador++;
    }
  }
  else {
    while (menores[porcentaje - 1].missed_votes_pct == ordenados[contador].missed_votes_pct) {
      menores.push(ordenados[contador]);
      contador++;
    }
    
  }
  return menores;

}



/*------------------------------------------Ordena Menor a Mayor------------------------------------------------------*/

function ordenarmenormayor(arrayorden, votos) {
  let ordenados = arrayorden.sort(function (a, b) {
    if (votos == "perdido") {
      if (a.votes_with_party_pct > b.votes_with_party_pct) {
        return 1
      }

      if (a.votes_with_party_pct < b.votes_with_party_pct) {
        return -1
      }

      return 0;
    }

    else {
      if (a.missed_votes_pct > b.missed_votes_pct) {
        return 1
      }

      if (a.missed_votes_pct < b.missed_votes_pct) {
        return -1
      }

      return 0;
    }


  })

  return ordenados;
}


/*--------------------------------------Ordena de Mayor a Menor------------------------------------------ */

function ordenarmayormenor(arrayorden, votos) {
  let ordenados = arrayorden.sort(function (a, b) {
    if (votos == "perdido") {
      if (a.votes_with_party_pct < b.votes_with_party_pct) {
        return 1
      }

      if (a.votes_with_party_pct > b.votes_with_party_pct) {
        return -1
      }

      return 0;
    }

    else {
      if (a.missed_votes_pct < b.missed_votes_pct) {
        return 1
      }

      if (a.missed_votes_pct > b.missed_votes_pct) {
        return -1
      }

      return 0;
    }


  })

  return ordenados;


}


/*----------------------------Crear Tabla 1------------------------------------------------------ */

function addTable() {

  var tabla = '<thead class="thead-light"><tr><th>Party</th><th>Number of reps</th><th>% Voted with Party</th></tr></thead>';
  tabla += '<tbody>';

  tabla += '<tr>';
  tabla += '<td class="party">' + "Democrat" + '</td>';
  tabla += '<td class="state">' + statistics.number_of_democrats + '</td>';
  tabla += '<td>' + statistics.democrats_average_votes_with_party + '</td>';
  tabla += '</tr>';

  tabla += '<tr>';
  tabla += '<td class="party">' + "Republican" + '</td>';
  tabla += '<td class="state">' + statistics.number_of_republicans + '</td>';
  tabla += '<td>' + statistics.republicans_average_votes_with_party + '</td>';
  tabla += '</tr>';
  if (statistics.independents_average_votes_with_party > 0) {
    tabla += '<tr>';
    tabla += '<td class="party">' + "Independent" + '</td>';
    tabla += '<td class="state">' + statistics.number_of_independents + '</td>';
    tabla += '<td>' + statistics.independents_average_votes_with_party + '</td>';
    tabla += '</tr>';
  }
  tabla += '<tr>';
  tabla += '<td class="party">' + "Total" + '</td>';
  tabla += '<td class="state">' + statistics.total + '</td>';
  tabla += '<td>' + statistics.total_average + '</td>';
  tabla += '</tr>';
  tabla += '</tbody>';

  return tabla;
}

/*----------------------------Crear Tabla 2------------------------------------------------------ */

function addTable1(masomenos) {

  var tabla = '<thead class="thead-light"><tr><th>Name</th><th>No. Missed Votes</th><th>%  Missed</th></tr></thead>';
  tabla += '<tbody>';

  if (masomenos == "menos") {
    for (let i = 0; i < statistics.least_engaged.length; i++) {

      tabla += '<tr>';
      tabla += '<td class="party"> <a href="' + statistics.least_engaged[i].url + '">' + statistics.least_engaged[i].first_name + ' ' + statistics.least_engaged[i].last_name + '</td>';
      tabla += '<td class="state">' + statistics.least_engaged[i].missed_votes + '</td>';
      tabla += '<td>' + statistics.least_engaged[i].missed_votes_pct + '</td>';
      tabla += '</tr>';
    }
  }

  else {
    for (let i = 0; i < statistics.most_engaged.length; i++) {
      tabla += '<tr>';
      tabla += '<td class="party"> <a href="' + statistics.most_engaged[i].url + '">' + statistics.most_engaged[i].first_name + ' ' + statistics.most_engaged[i].last_name + '</td>';
      tabla += '<td class="state">' + statistics.most_engaged[i].missed_votes + '</td>';
      tabla += '<td>' + statistics.most_engaged[i].missed_votes_pct + '</td>';
      tabla += '</tr>';
    }
  }

  return tabla;
}



/*----------------------------Crear Tabla 3------------------------------------------------------ */

function addTable2(masomenos) {


  var tabla = '<thead class="thead-light"><tr><th>Name</th><th>No. Party Votes</th><th>%  Party Votes</th></tr></thead>';
  tabla += '<tbody>';

  if (masomenos == "menos") {
    for (let i = 0; i < statistics.least_loyal.length; i++) {

      tabla += '<tr>';
      tabla += '<td class="party"> <a href="' + statistics.least_loyal[i].url + '">' + statistics.least_loyal[i].first_name + ' ' + statistics.least_loyal[i].last_name + '</td>';
      tabla += '<td class="state">' +  ((statistics.least_loyal[i].total_votes * statistics.least_loyal[i].votes_with_party_pct) / 100).toFixed(2) + '</td>';
      tabla += '<td>' + statistics.least_loyal[i].votes_with_party_pct + '</td>';
      tabla += '</tr>';
    }
  }

  else {
    for (let i = 0; i < statistics.most_loyal.length; i++) {
      tabla += '<tr>';
      tabla += '<td class="party"> <a href="' + statistics.most_loyal[i].url + '">' + statistics.most_loyal[i].first_name + ' ' + statistics.most_loyal[i].last_name + '</td>';
      tabla += '<td class="state">' + ((statistics.most_loyal[i].total_votes * statistics.most_loyal[i].votes_with_party_pct) / 100).toFixed(2) + '</td>';
      tabla += '<td>' + statistics.most_loyal[i].votes_with_party_pct + '</td>';
      tabla += '</tr>';
    }
  }

  return tabla;
}