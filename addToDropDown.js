//--------------------------------------------------------------------------------------------------------*-//
jQuery(document).ready(function () {
    $(".oculto").hide();
    $(".inf").click(function () {
        var nodo = $(this).attr("href");
        if ($(nodo).is(":visible")) {
            $(nodo).hide();
            return false;
        }
        else {
            $(".oculto").hide("slow");
            $(nodo).fadeToggle("fast");
            return false;
        }
    });
});
//--------------------------------------------------------------------------------------------------//
function addToDropDown(state) {
    var elDropDownStates = document.getElementById('select-states');
    var elOption = document.createElement('OPTION');
    if (elDropDownStates.getElementsByClassName(state).length == 0) {
        elOption.className = state;
        elOption.nodeValue = state;
        elOption.textContent = state;
        elDropDownStates.appendChild(elOption);
    }
}
;
//-------------FILTRAR TABLA-------------------------------------------------------------------//
function filterTable(array) {
    // variables a crear
    let items = [];
    let aux = [];
    let stateSelect = document.getElementById("select-states").value;
    let final = [];
    // traer checkboxes checked
    let checkeds = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(element => element.value);
    // Filtro de Party 
    checkeds.forEach(element => {
        aux = [];
        aux = array.filter(item => item.party === element);
        items.push.apply(items, aux);
    });
    // return items;
    // Seleccion de State
    for (var i = 0; i < items.length; i++) {
        if (items[i].state == stateSelect || stateSelect == "ALL") {
            final.push(items[i]);
        }
        ;
    }
    return final;
}
