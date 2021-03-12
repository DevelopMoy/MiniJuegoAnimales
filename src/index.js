import {Minijuego} from "./js/Minijuego";
import {Animal} from "./js/Animal";
import {MonoBailarin} from "./js/animal-saltarin";

const mono = new MonoBailarin(0);

const juegoPrinc = new Minijuego();

document.querySelector("#nuevoJuego").addEventListener("click",function (){
    juegoPrinc.iniciarNuevoJuego();
});

