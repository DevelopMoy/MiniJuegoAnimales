export class Animal {

    constructor(idAnim) {
        this.idAnim=idAnim;
        this.animalImg=`../assets/animales/pics/p${this.idAnim}.png`;
        this.animalHabit=`../assets/animales/hab/h${this.idAnim}.jpg`;
        this.animalSound=`../assets/animales/sound/s${this.idAnim}.mp3`;
    }
}
