export default class Alumno {
    constructor(nombre, dni, edad) {
        this.nombre = nombre;
        this.dni = dni;
        this.edad = edad;
    }

    toString() {
        return `Nombre: ${this.nombre}, DNI: ${this.dni}, Edad: ${this.edad}`;
    }
}
