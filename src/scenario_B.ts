interface Mediator{
    gestionAtterissage(numeroAvion:number):void;
    gestionDecollage(numeroAvion:number):void;

}
class Avion{
    private numeroAvion:number;
    private typeAvion : string;
    private dateHeure: string;
    private mediator: Mediator;

constructor(numeroAvion: number, typeAvion: string,dateHeure:string, mediator: Mediator) {
    this.numeroAvion = numeroAvion;
    this.typeAvion = typeAvion;
    this.mediator = mediator;
    this.dateHeure = dateHeure;
}

demanderAtterrissage() {
    this.mediator.gestionAtterissage(this.getNumeroAvion());
}
demanderDecollage() {
    this.mediator.gestionDecollage(this.getNumeroAvion());
}
    setNumeroAvion(numeroAvion:number):void{
        this.numeroAvion=numeroAvion;
    }
    getNumeroAvion():number{
        return this.numeroAvion;
    }
    setTypeAvionlocation(typeAvion:string):void{
        this.typeAvion=typeAvion;
    }
    geTypeAvion():string{
        return this.typeAvion;
    }
 
}



class Piste{
    private numeroPiste :number;
    private location : string;
    private mediator : Mediator;
    constructor(numeroPiste: number, location: string, mediator: Mediator) {
        this.numeroPiste = numeroPiste;
        this.location = location;
        this.mediator = mediator;
    }
    
   
    setNumeroPiste(numeroPiste:number):void{
        this.numeroPiste=numeroPiste;
    }
    getNumeroPiste():number{
        return this.numeroPiste;
    }
    setLocation(location:string):void{
        this.location=location;
    }
    getLocation():string{
        return this.location;
    }

    
   
}
class Ajouter{

private piste:Piste;
public allAvion: Avion[] = [];
public allPiste: Piste[] = [];


ajouterAvion(avion:Avion){
    this.allAvion.push(avion);
}
ajouterPiste(piste:Piste){
    this.allPiste.push(piste);
}
}

class TourControle implements Mediator{
    private enAir:Array<Avion>;
    private enAir1:Ajouter;
    private dateHeure:string;
    private pisteDisponible:Array<Piste>
    private ajouter:Ajouter;


    constructor(ajouter: Ajouter) {
        this.ajouter = ajouter;
    }
gestionAtterissage(numeroAvion:number):void{
    for (let avion of this.ajouter.allAvion) {
        if (avion.getNumeroAvion() === numeroAvion) {
            if(this.ajouter.allPiste.length !=0){
            let numero = this.getRandomInt(this.ajouter.allPiste.length);
            let pisteChoisie = this.ajouter.allPiste[numero];
            console.log("vous pouvez atterrir dans la piste :", pisteChoisie.getNumeroPiste());
    
            // (facultatif) retirer la piste de la liste disponible si c’est ce que tu veux simuler
            this.ajouter.allPiste = this.ajouter.allPiste.filter(p => p !== pisteChoisie);
        }} else 
            console.log(" tout les pistes sont occupés, attendais ls ordre"  );
    }
    

}

gestionDecollage(numeroAvion:number):void{}

 getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
}


let ajouter = new Ajouter();
let mediator = new TourControle(ajouter);

let piste = new Piste(123,'ab',mediator);
let piste2 = new Piste(125,'ab',mediator);
let piste3 = new Piste(128,'ab',mediator);

let avion2 = new Avion(124,'a','2025',mediator);
let avion = new Avion(135,'a','2025',mediator);
let avion5 = new Avion(185,'a','2025',mediator);
let avion4 = new Avion(195,'a','2025',mediator);
ajouter.ajouterAvion(avion);
ajouter.ajouterPiste(piste);
ajouter.ajouterAvion(avion2);
ajouter.ajouterPiste(piste2);

ajouter.ajouterAvion(avion5);
ajouter.ajouterPiste(piste3);

ajouter.ajouterAvion(avion4);





mediator.gestionAtterissage(avion.getNumeroAvion())

mediator.gestionAtterissage(avion2.getNumeroAvion())

mediator.gestionAtterissage(avion5.getNumeroAvion())

mediator.gestionAtterissage(avion4.getNumeroAvion())

