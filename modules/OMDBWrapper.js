import axios from "axios";

const apiKey = '11f72b82';
const apiUrl = 'http://www.omdbapi.com/?apikey=';

const OMDBSearchByPage = async (searchText, page = 1) => {

    let returnObject = {
    respuesta : false,
    cantidadTotal : 0,
    datos : {}
};
    const requestString = `${apiUrl}${apiKey}&s=${searchText}&page=${page}`;
    const apiResponse = await axios.get(requestString);
    returnObject.respuesta = apiResponse.statusText;
    returnObject.datos = apiResponse.data.Search;
    returnObject.cantidadTotal = apiResponse.data.totalResults;

    return returnObject;
};

const OMDBSearchComplete = async (searchText) => {

    let returnObject = {
    respuesta : false,
    cantidadTotal : 0,
    datos : {}
};
    const requestString = `${apiUrl}${apiKey}&s=${searchText}`;
    const apiResponse = await axios.get(requestString);
    returnObject.respuesta = apiResponse.statusText;
    returnObject.datos = apiResponse.data.Search;
    returnObject.cantidadTotal = apiResponse.data.totalResults;

    return returnObject;
};

const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = {
    respuesta : false,
    cantidadTotal : 0,
    datos : {}
};

    const requestString = `${apiUrl}${apiKey}&i=${imdbID}`;
    const apiResponse = await axios.get(requestString);
    returnObject.respuesta = apiResponse.statusText;
    returnObject.datos = apiResponse.data.Search;
    returnObject.cantidadTotal = apiResponse.data.totalResults;

    return returnObject;
};

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};
