import {Animal} from "./Animal";

export class Minijuego{


    constructor() {
        this.puntosLocales = 0;
        this.areaJuego = document.querySelector("#areaJuego");
        this.areaAnimal = document.querySelector("#areaAnimal");
        this.areaHabitat = document.querySelector("#areaHabitat");
        this.puntos = 0;
        this.animalesActuales = [];

        setInterval(()=>{
            const puntuac = document.querySelector("#areaPuntuac");
            if (puntuac){
                if (puntuac.innerHTML==3){
                    this.iniciarNuevoJuego();
                }
            }
        },1000);
    }

    dragStartFunc(event) {
        event.dataTransfer.setData("Text", event.target.id);
    }

    eventoOnDropHabitat(event){
        event.preventDefault();
        let data = event.dataTransfer.getData("Text");
        const dataPers = data.charAt(data.length-1);
        const dataHabit = event.target.id.charAt(event.target.id.length-1);
        //console.log("SE RECIBIO "+dataPers+ " LA BUENA ES "+dataHabit);
        if (dataPers==dataHabit){ // ESTAN BIEN
            const areaPuntos = document.querySelector("#areaPuntuac");
            document.querySelector("#"+data).classList.add("disabledImg");
            areaPuntos.innerHTML=parseInt(areaPuntos.innerHTML)+1;
        }
    }

    eventoOnDragOverHabitat (event){
        event.preventDefault();
    }

    eventoOnDragEnter (event){
        document.querySelector(`#${event.target.id}`).classList.add("dragEnter");
    }

    eventoOnDragLeave (event){
        document.querySelector(`#${event.target.id}`).classList.remove("dragEnter");
    }

    dibujarAnimales (){
        for(let anim of this.animalesActuales){
            const divElem = document.createElement("div");
            divElem.classList.add("animalObj");
            divElem.ondragstart = this.dragStartFunc;
            divElem.innerHTML=`
                <img draggable="true" id="pers${anim.idAnim}" src="${anim.animalImg}">
            `
            this.areaAnimal.append(divElem);
        }
    }

    dibujarHabitats (){
        for(let anim of this.animalesActuales){
            const divElem = document.createElement("div");
            divElem.ondrop = this.eventoOnDropHabitat;
            divElem.ondragover = this.eventoOnDragOverHabitat;
            divElem.ondragenter = this.eventoOnDragEnter;
            divElem.ondragleave = this.eventoOnDragLeave;
            divElem.classList.add("habitatObj");
            divElem.innerHTML=`
                <img id="hab${anim.idAnim}" src="${anim.animalHabit}">
            `
            this.areaHabitat.append(divElem);
        }

    }

    prepararAnimales(){
        const posiblesAnimales = [1,2,3,4,5,6,7,8,9];
        posiblesAnimales.sort(() => Math.random() - 0.5)
        for (let i=0;i<3;i++){
            this.animalesActuales.push(new Animal(posiblesAnimales.pop()));
        }
    }

    reiniciarPuntos (){
        document.querySelector("#areaPuntuac").innerHTML=0;
    }

    iniciarNuevoJuego (){
        if (this.areaHabitat){
            this.areaHabitat.innerHTML="";
        }
        if (this.areaAnimal){
            this.areaAnimal.innerHTML="";
        }
        this.animalesActuales=[];
        this.reiniciarPuntos();
        this.prepararAnimales();
        this.dibujarHabitats();
        this.dibujarAnimales();
    }
}
