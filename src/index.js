import {Minijuego} from "./js/Minijuego";
import {Animal} from "./js/Animal";

const juegoPrinc = new Minijuego();

document.querySelector("#nuevoJuego").addEventListener("click",function (){
    juegoPrinc.iniciarNuevoJuego();
});
