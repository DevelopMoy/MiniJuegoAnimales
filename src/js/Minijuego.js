import {Animal} from "./Animal";

export class Minijuego{
    constructor(mono) {
        this.puntosLocales = 0;
        this.areaJuego = document.querySelector("#areaJuego");
        this.areaAnimal = document.querySelector("#areaAnimal");
        this.butonNuevoJuego = document.querySelector ("#nuevoJuego");
        this.butonHome = document.querySelector("#home");
        this.areaHabitat = document.querySelector("#areaHabitat");
        this.puntos = 0;
        this.animalesActuales = [];
        this.mono=mono;

        this.myInterval = setInterval(()=>{
            const puntuac = document.querySelector("#areaPuntuac");
            if (puntuac){
                if (puntuac.innerHTML==3){
                    document.querySelector("#puntLocales").innerHTML=parseInt(document.querySelector("#puntLocales").innerHTML)+1;
                    this.mono.dibujarMono(1);
                    if (localStorage.getItem("puntos")){
                        localStorage.setItem("puntos",parseInt(localStorage.getItem("puntos"))+1);
                    }else{
                        console.log("no existe");
                        const value =1;
                        localStorage.setItem("puntos",value.toString());
                    }
                    this.iniciarNuevoJuego();
                }

            }
        },1000);
    }

    monoReposo (){
        console.log("mono dejo de bailar")
        console.log(this);
        this.mono.dibujarMono(0);
    }

    dragStartFunc(event) {
        event.dataTransfer.setData("Text", event.target.id);
    }

    prepararJuegoPanel(){
        const areaJuego = `
            <div id="areaPuntuac"></div>
            <div id="areaHabitat"></div>
            <div id="areaAnimal"></div>`;
        this.areaJuego.innerHTML=areaJuego;
        this.areaAnimal = document.querySelector("#areaAnimal");
        this.areaHabitat = document.querySelector("#areaHabitat");
        clearInterval(this.myInterval);
        this.myInterval=setInterval(()=>{
            const puntuac = document.querySelector("#areaPuntuac");
            if (puntuac){
                if (puntuac.innerHTML==3){
                    document.querySelector("#puntLocales").innerHTML=parseInt(document.querySelector("#puntLocales").innerHTML)+1;
                    this.mono.dibujarMono(1);
                    if (localStorage.getItem("puntos")){
                        localStorage.setItem("puntos",parseInt(localStorage.getItem("puntos"))+1);
                    }else{
                        console.log("no existe");
                        const value =1;
                        localStorage.setItem("puntos",value.toString());
                    }
                    this.iniciarNuevoJuego();
                }

            }
        },1000);
    }

    eventoOnDropHabitat(event){
        event.preventDefault();
        let data = event.dataTransfer.getData("Text");
        const dataPers = data.charAt(data.length-1);
        const dataHabit = event.target.id.charAt(event.target.id.length-1);
        //console.log("SE RECIBIO "+dataPers+ " LA BUENA ES "+dataHabit);
        if (dataPers==dataHabit){ // ESTAN BIEN
            document.querySelector("#snd"+dataPers).play();
            const areaPuntos = document.querySelector("#areaPuntuac");
            document.querySelector("#"+data).classList.add("disabledImg");
            document.querySelector("#tituloAnim"+dataPers).classList.remove("hiddenImg");
            areaPuntos.innerHTML=parseInt(areaPuntos.innerHTML)+1;
        }else{
            document.querySelector("#sonidoError").play();
            document.querySelector("#botonEnojado").click();
        }
    }

    funcionEnojado (){
        const mono = this.mono;
        setTimeout(function (){
            mono.dibujarMono(0);
        },4000);
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
                <h1 id="tituloAnim${anim.idAnim}" class="hiddenImg subtitulo">${anim.nombre}</h1>
            `
            this.areaAnimal.append(divElem);
        }
    }

    dibujarHabitats (){
        const habitTemporal = [];
        for(let anim of this.animalesActuales){
            habitTemporal.push(anim);
        }
        habitTemporal.sort(() => Math.random() - 0.5);
        for (let an of habitTemporal){
            const divElem = document.createElement("div");
            divElem.ondrop = this.eventoOnDropHabitat;
            divElem.ondragover = this.eventoOnDragOverHabitat;
            divElem.ondragenter = this.eventoOnDragEnter;
            divElem.ondragleave = this.eventoOnDragLeave;
            divElem.classList.add("habitatObj");
            divElem.innerHTML=`
                <img id="hab${an.idAnim}" src="${an.animalHabit}">
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
        const areaPuntuac =document.querySelector("#areaPuntuac");
        if (areaPuntuac){
            areaPuntuac.innerHTML=0;
        }
    }

    pantallaInicio (){
        this.areaJuego.innerHTML="";
        const nuevaArea = document.createElement("div");
        const puntos = localStorage.getItem("puntos");
        nuevaArea.classList.add("homeView");
        nuevaArea.innerHTML=`
            <h1 id="titulo">Animalia</h1>  
            <h3>Puntos: ${puntos}</h3>
        `;
        this.areaJuego.append(nuevaArea);
    }

    dibujaPantallaGanado (){
        this.areaJuego.innerHTML="";
        const nuevaArea = document.createElement("div");
        nuevaArea.innerHTML=`
            <h1 id="titulo">Has ganado</h1>  
        `;
        this.areaJuego.append(nuevaArea);
    }

    iniciarNuevoJuego (){
        console.log(document.querySelector("#puntLocales").innerHTML);
        const mono = this.mono;
        document.querySelector("#botonEnojado").addEventListener("click",function (){
            mono.dibujarMono(2);
            setTimeout(function (){
                mono.dibujarMono(0);
            },4000);
        })
        this.areaJuego.innerHTML="";
        this.prepararJuegoPanel();
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
        if (document.querySelector("#puntLocales").innerHTML==3){
            document.querySelector("#puntLocales").innerHTML=0;
            this.dibujaPantallaGanado();
        }
    }
}
