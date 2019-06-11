/*Nombre*/

var myName = "Andres"
console.log(myName);

/*Edad*/

var age = 25
console.log(age);

/*Diferencia Edad*/

var ignasiAge = 32
var ageDiff = ignasiAge - age
console.log(ageDiff);

/*Condicion*/

if (age < 21) {
  console.log("No tiene mas de 21");
} else {
  console.log("Ya es mayor de 21");
}

/*Condicion 2*/

if (ignasiAge > age) {
  console.log("Ignasi es mayor que usted");
} else if (ignasiAge < age) {
  console.log("Tiene la misma edad que Ignasi ");
} else {
  console.log("Ignasi es más joven que usted");
}

/*Matriz  Ejercicio 1*/

var companeros = ["Eliana", "Leon", "Adriana", "Aibby", "Alan", "Ayelen", "Birdie", "Carla", "Cintia", "David",
  "Diego", "Edgar", "Federico", "Fernando", "Andrés", "Giannina", "Luis", "Ignacio", "Janneth", "Juan", "Laura",
  "Lauri", "Marcelo", "Margara", "Maria", "Mariana", "Matias", "Nazarena", "Rodrigo", "Scarlet", "Stefania",
  "Stephanie", "Victoria C.", "Victoria", "Yanina", "Judith"
];

console.log(companeros[0]);
console.log(companeros[(companeros.length) - 1]);

companeros.sort()

for (var i = 0; i < companeros.length; i++) {
  console.log(companeros[i]);
}

/*Matriz Ejercicio 2*/

var edadesCompas = [24, 35, 23, 26, 20, 18, 27, 26, 36, 33, 32, 34, 36, 37, 29, 27, 25, 22, 23, 26, 24, 36, 33,
  32, 34, 36, 37, 29, 27, 25, 22, 23, 26, 24, 19, 25, 33
];

var x = 0;
var edades = []
var pares = []
while (x < edadesCompas.length) {
  edades.push(edadesCompas[x])

  if ((edadesCompas[x] % 2) == 0) {
    pares.push(edadesCompas[x])
  }
  x++
}
console.log(edades);
console.log(pares);

var edades = []
var pares = []

for (var i = 0; i < edadesCompas.length; i++) {
  edades.push(edadesCompas[i])
}

for (var i = 0; i < edadesCompas.length; i++) {
  if ((edadesCompas[i] % 2) == 0) {
    pares.push(edadesCompas[i])
  }
}

console.log(edades);
console.log(pares);


/* Funciones Ejercicio 3*/

var array = [3, 6, 67, 6, 23, 11, 100, 8, 93, 0, 17, 24, 7, 1, 33, 45, 28, 33, 23, 12, 99, 100];

function matrizmen(vector) {
  mp = vector[0];
  for (var i = 0; i < vector.length; i++) {
    if (mp > vector[i]) {
      mp = vector[i];
    }
  }
  return mp;

}
console.log(matrizmen(array));

/* Funciones Ejercicio 4*/

function matrizmay(vector) {
  mp = vector[0];
  for (var i = 0; i < vector.length; i++) {
    if (mp < vector[i]) {
      mp = vector[i];
    }
  }
  return mp;

}

console.log(matrizmay(array));

/* Ejercicio 5 */

var array5 = [3, 6, 67, 6, 23, 11, 100, 8, 93, 0, 17, 24, 7, 1, 33, 45, 28, 33, 23, 12, 99, 100];
var index = 1;

function elementopos(vector, pos) {
  ep = vector[pos]
  return ep;

}


console.log(elementopos(array5, index));

/* Ejercicio 6*/

var array6 = [3, 6, 67, 6, 23, 11, 100, 8, 93, 0, 17, 24, 6, 7, 1, 33, 45, 28, 33, 23, 12, 99, 100];

function repes(array) {

  var arrayOrdenado = array.slice().sort();
  var repetidos = [];

  for (var i = 0; i < array.length - 1; i++) {
    if (arrayOrdenado[i + 1] == arrayOrdenado[i]) {
      while (arrayOrdenado[i + 1] == arrayOrdenado[i]) {
        i++
      }
      repetidos.push(arrayOrdenado[i - 1]);
    }
  }
  return repetidos;
}
console.log(repes(array6));


/*Ejercicio 7*/

var myColor = ["Red", "Green", "White", "Black"];

function cadena(array) {
  var elementos
  elementos = array.join();

  return elementos;
}

console.log(cadena(myColor));


/*-------------------------------Funciones de Cadena-------------------------------*/

/* Ejercicio 1*/

var x = 32443;

function invertir(cadena) {
  var cadenaInvertida = "";
  var string = cadena.toString();
  var numero = string.split("");
  numero.reverse();
  cadenaInvertida = numero.join("");
  return cadenaInvertida;

}

console.log(invertir(x));


/* Ejercicio 2*/

var x = "webmaster";

function ordenar(palabra){
  var palabraordenada = "";
  var string = palabra.toString();
  var array = string.split("");

  array.sort();

palabraordenada = array.join("")
return palabraordenada;
}

console.log(ordenar(x));

/* Ejercicio 3*/

var  x = "príncipe de persia"

function primeramayus(frase){

  var palabras = frase.split(" ");
  var ip =[];
  for (var i = 0; i < palabras.length; i++){
  ip.push(palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1));
  }
  return ip.join(" ");
}

console.log(primeramayus(x));


/* Ejercicio 4*/

var x = "Tutorial de desarrollo web";
function palabralarga(frase){
  var z = [0];
  var palabras = frase.split(" ");
  for (var i = 0; i < palabras.length; i++){
      if(z.length < palabras[i].length){
       z = palabras[i];
    }
}
return z;
}

console.log(palabralarga(x));
