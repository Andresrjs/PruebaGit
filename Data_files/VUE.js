let url = "";

if (document.getElementById("house")) {

    url = 'https://api.propublica.org/congress/v1/113/house/members.json';
}
else {
    url = 'https://api.propublica.org/congress/v1/113/senate/members.json';
}


fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'L6x2Gbl9kawrKwFw4kQp75kCXLgCQokZEtDC1zFN',
    }
}).then(response => response.json())
    .then(json => {
        app.miembros = json.results[0].members;
        app.miembrosFiltered = json.results[0].members;
        app.aux = json.results[0].members;
        app.diezporciento = app.caldiezporciento;
        app.number_of_democrats = app.calcularm(app.miembros, "D");
        app.number_of_independents = app.calcularm(app.miembros, "I");
        app.number_of_republicans = app.calcularm(app.miembros, "R");
        app.democrats_average_votes_with_party = app.calcularp(app.miembros, "D");
        app.republicans_average_votes_with_party = app.calcularp(app.miembros, "R");
        app.independents_average_votes_with_party = app.calcularp(app.miembros, "I");
        app.total = app.calcularp(app.miembros, "D") + app.calcularp(app.miembros, "R") + app.calcularp(app.miembros, "I");
        app.total_average = app.calcularptotal(app.miembros);
        app.most_loyal = app.primeros(miembros, diezporciento,"perdido", "menores");
        app.most_engaged = app.primeros(miembros, diezporciento, "voto", "menores");
        app.least_engaged = app.primeros(miembros,diezporciento,"voto", "mayores");
        app.least_loyal = app.primeros(miembros,diezporciento,"perdido", "mayores");
        console.log(app.miembros);
    })


var app = new Vue({
    el: "#app",
    data: {
        aux: [],
        miembros: [],
        miembrosFiltered: [],
        number_of_democrats: 0,
        number_of_republicans: 0,
        number_of_independents: 0,
        total: 0,
        democrats_average_votes_with_party: 0,
        republicans_average_votes_with_party: 0,
        independents_average_votes_with_party: 0,
        total_average: 0,
        least_engaged: [],
        most_engaged: [],
        least_loyal: [],
        most_loyal: [],
        diezporciento: 0,

    },

    methods: {
        mifiltro:
            function() {
                //console.log("filtros:", arrayBruto);
                let listaFiltrada = [];
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


                if (selected !== 'ALL') {
                    for (let i = 0; i < this.miembrosFiltered.length; i++) {

                        if (valoresTildados.includes(this.miembrosFiltered[i].party) && (this.miembrosFiltered[i].state === selected)) {
                            listaFiltrada.push(this.miembrosFiltered[i])
                        }

                    }
                } else {
                    for (let i = 0; i < this.miembrosFiltered.length; i++) {

                        if (valoresTildados.includes(this.miembrosFiltered[i].party)) {
                            listaFiltrada.push(this.miembrosFiltered[i])
                        }

                    }
                }
                this.miembros = listaFiltrada;
            },

        //-------------------------------------------------------------------------------------------------------//
        caldiezporciento:
        function(){
            this.diezporciento = Math.round(miembros.length * 10 / 100);
        },
        
        calcularm:
            function (array, letraPartido) {
                let contador = array.filter(function (members) {
                    return members.party === letraPartido;
                })

                return contador.length;


            },

        //-------------------------------------------------------------------------------------------------------//

        calcularp:
            function (arrayMembers, nombreDePartido) {
                let divisor = 0;
                let contador = 0;
                arrayMembers.forEach(element => {
                    if (element.party === nombreDePartido) {
                        contador += element.votes_with_party_pct;
                        divisor++;
                    }

                });
                return (contador / divisor).toFixed(2);
            },

        //-------------------------------------------------------------------------------------------------------//

        calcularptotal:
            function (arrayMembers) {
                let contador = 0;
                arrayMembers.forEach(element => {
                    contador += element.votes_with_party_pct;
                }
                );
                return (contador / arrayMembers.length).toFixed(2);
            },

        //-------------------------------------------------------------------------------------------------------//


        primeros:
            function (arraymiembros, porcentaje, votos, mayomen) {
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

            },

        //-------------------------------------------------------------------------------------------------------//

        ordenarmenormayor:
            function (arrayorden, votos) {
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
            },

        //-------------------------------------------------------------------------------------------------------//
        ordenarmayormenor:
            function (arrayorden, votos) {
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
        }
    });
