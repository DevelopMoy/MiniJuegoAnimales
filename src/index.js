import {Minijuego} from "./js/Minijuego";
import {MonoBailarin} from "./js/animal-saltarin";

/*

<audio id="snd1">
    <source src="./assets/animales/sound/s1.mp3" type="audio/mpeg">
</audio>
 */

for (let i=1;i<=9;i++){
    const newElem = document.createElement("audio");
    newElem.id="snd"+i;
    newElem.innerHTML=`
        <source src="./assets/animales/sound/s${i}.mp3" type="audio/mpeg">
    `;
    document.querySelector("body").append(newElem);
}

const mono = new MonoBailarin(0);

const juegoPrinc = new Minijuego(mono);

juegoPrinc.pantallaInicio();

document.querySelector("#nuevoJuego").addEventListener("click",function (){
    juegoPrinc.iniciarNuevoJuego();
});

document.querySelector("#home").addEventListener("click",function (){
    juegoPrinc.pantallaInicio();
});

