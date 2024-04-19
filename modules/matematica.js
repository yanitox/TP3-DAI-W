/* Exporto desde el módulo "matematicas" la constante PI,
la funciones sumar y multiplicar */

const PI = 3.14;

function sumar(x, y) {
    return parseInt(x)+parseInt(y);
}

const multiplicar = (a, b) => {
    return parseInt(a)*parseInt(b);
};

function dividir(divisor, dividendo){
    return parseInt(divisor)/parseInt(dividendo);
};

function restar(a, b){
    return parseInt(a)-parseInt(b);
};

// Exporto todo lo que yo quiero exponer del módulo hacia el exterior.
export {PI, sumar, multiplicar, dividir, restar};
