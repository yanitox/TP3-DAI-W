import express from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors
import  {sumar, restar, dividir, multiplicar} from './modules/matematica.js'
import { OMDBGetByImdbID, OMDBSearchByPage, OMDBSearchComplete } from "./modules/OMDBWrapper.js";
import Alumno from "./models/alumno.js";

const app = express();
const port = 3000;

// Agrego los Middlewares

app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

//Agrego array Alumnos

const alumnosArray = [];

alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "vv", 18));

//
// Aca pongo todos los EndPoints
//


app.get('/', (req, res) => { // EndPoint "/"
    res.status(200).send('Ya estoy respondiendo (200)!');
})

app.get('/saludar/:nombre', (req, res) => { // EndPoint "/saludar"
    res.status(200).send('Hola ' + req.params.nombre + ' (200)');
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => { 
    
    let fecha = new Date(req.params.ano, req.params.mes - 1, req.params.dia);
    if(!isNaN(fecha)){
        res.status(200).send(fecha);
    }
    else{
        res.status(400).send();
    }
})

//EndPoints que utilizan matematica.js

app.get('/matematica/sumar', (req, res) => {
    let suma = sumar(req.query.n1, req.query.n2);
    res.status(200).send(suma.toString());
})

app.get('/matematica/restar', (req, res) => {
    let resta = restar(req.query.n1, req.query.n2);
    res.status(200).send(resta.toString());
})

app.get('/matematica/multiplicar', (req, res) => {
    let producto = multiplicar(req.query.n1, req.query.n2);
    res.status(200).send(producto.toString());
})

app.get('/matematica/dividir', (req, res) => {
    let cociente = dividir(req.query.n1, req.query.n2);
    if(req.query.n2 == 0){
        res.status(400).send("El divisor no puede ser 0");
    }
    else{
        res.status(200).send(cociente.toString());
    }
})

//EndPoints que usan el modulo OMBDWrapper.js

app.get('/ombd/searchbypage', async (req, res) => {
    let returnObject = await OMDBSearchByPage(req.query.search, req.query.p);
    res.status(200).send(returnObject);
})

app.get('/ombd/searchcomplete', async (req, res) => {
    let returnObject = await OMDBSearchComplete(req.query.search);
    res.status(200).send(returnObject);
})

app.get('/ombd/getombdid', async (req, res) => {
    let returnObject = await OMDBGetByImdbID(req.query.imbdID);
    res.status(200).send(returnObject);
})

//EndPoints que utilizan Modelo alumno.js

app.get('/alumnos', (req, res) => {
    res.status(200).send(alumnosArray);
})

app.get('/alumnos/:dni', (req, res) => {
    const dni = req.params.dni;
    const alumno = alumnos.find(alumno => alumno.dni === dni);
    if (alumno) {
        res.status(200).json(alumno);
    } else {
        res.status(404).json({ message: 'Alumno no encontrado' });
    }
});


app.post('/alumnos', (req, res) => {
    alumnosArray.push(new Alumno(req.query.nombre, req.query.dni, parseInt(req.query.edad)));
    res.status(201).send("Created");
})

app.delete('/alumnos', (req, res) => {
    let dni = req.body.dni;
    let alumno = alumnosArray.find(a => a.dni == dni);
    if (alumno) {
        alumnosArray.splice(alumnosArray.findIndex(a => a === alumno), 1);
        res.status(200).send('OK');
    }
    else {
        res.status(404).send();
    }
})

// Inicio el server.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
