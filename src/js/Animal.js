const nombresAnimales = ["mono","ave","araña","oso","ornitorrinco","pez","cangrejo","dinosaurio","rana"]

export class Animal {
    constructor(idAnim) {
        this.idAnim=idAnim;
        this.id
        this.animalImg=`../assets/animales/pics/p${this.idAnim}.png`;
        this.animalHabit=`../assets/animales/hab/h${this.idAnim}.jpg`;
        this.animalSound=`../assets/animales/sound/s${this.idAnim}.mp3`;
        this.nombre = nombresAnimales[this.idAnim-1];
    }
}
