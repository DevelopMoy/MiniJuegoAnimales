const pistaBaile =document.querySelector('#areaBailando');
const imagen = document.querySelector('#imagen');
export class MonoBailarin{
         //0 Mono tranquis, 1 Mono feliz y 2 mono enojado
        constructor(estado) {
            this.estado = estado;
            this.dibujarMono(estado);
        }
        dibujarMono(estado){
            this.estado=estado;
            clearInterval(this.intervalo);
            if(this.estado==0){
                this.dibujoCanvas('../assets/reposo/');
            }else if(this.estado==1){
                this.dibujoCanvas('../assets/feliz/');
            }else{
                this.dibujoCanvas('../assets/enojado/');
            }
        }

        dibujoCanvas(gif){
            let ctx = pistaBaile.getContext('2d');
            ctx.clearRect(0,0,350,350);
            let img = new Image();
            this.intervalo = setInterval(()=>{
                for(let i=0;i<1000;i+=100){
                    setTimeout(()=>{
                        img.src=`${gif}${i/100}.gif`;
                        img.onload=(() => {
                            ctx.clearRect(0,0,350,350);
                            ctx.drawImage(img,0,0);
                        });
                    },i);
                }
            },1000);
        }
}
