let url = "";

if (document.getElementById("house")) {

url = 'https://api.propublica.org/congress/v1/113/house/members.json';
}
else{
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
        console.log(app.miembros);
    })


var app = new Vue({
    el: "#app",
    data: {
        aux: [],
        miembros: [],
        miembrosFiltered: [],

    },

    methods: {
        mifiltro:
            function () {

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
            }
    }
});