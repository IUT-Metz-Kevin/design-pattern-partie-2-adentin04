interface Etat {
    attaquer(): void | Promise<void>;
    deplacer(): void | Promise<void>;
    sauter(): void | Promise<void>;
}

class Personnage {
    private etat: Etat;

    constructor() {
        this.etat = new Idle(this);
    }

    public setEtat(etat: Etat): void {
        this.etat = etat;
    }

    public attaquer(): void | Promise<void> {
        return this.etat.attaquer();
    }

    public deplacer(): void | Promise<void> {
        return this.etat.deplacer();
    }

    public sauter(): void | Promise<void> {
        return this.etat.sauter();
    }

    public collision(collision: boolean): void {
        if (collision) {
            this.setEtat(new Etourdi(this));
        } else {
            this.setEtat(new Idle(this));
        }
    }
}

class Idle implements Etat {
    constructor(private personnage: Personnage) {}

    public attaquer(): void {
        console.log("Le personnage attaque depuis l'état Idle.");
        this.personnage.setEtat(new Attaquer(this.personnage));
    }

    public deplacer(): void {
        console.log("Le personnage commence à se déplacer.");
        this.personnage.setEtat(new Deplacer(this.personnage));
    }

    public sauter(): void {
        console.log("Le personnage saute.");
        this.personnage.setEtat(new Sauter(this.personnage));
    }
}

class Attaquer implements Etat {
    constructor(private personnage: Personnage) {}

    public attaquer(): void {
        console.log("Déjà en train d'attaquer !");
    }

    public deplacer(): void {
        console.log("Impossible de se déplacer en attaquant.");
    }

    public sauter(): void {
        console.log("Impossible de sauter en attaquant.");
    }
}

class Deplacer implements Etat {
    constructor(private personnage: Personnage) {}

    public attaquer(): void {
        console.log("Le personnage attaque pendant qu'il se déplace.");
        this.personnage.setEtat(new Attaquer(this.personnage));
    }

    public deplacer(): void {
        console.log("Le personnage est déjà en train de se déplacer.");
    }

    public sauter(): void {
        console.log("Le personnage saute en déplacement.");
        this.personnage.setEtat(new Sauter(this.personnage));
    }
}

class Sauter implements Etat {
    constructor(private personnage: Personnage) {}

    public attaquer(): void {
        console.log("Impossible d'attaquer en sautant.");
    }

    public deplacer(): void {
        console.log("Impossible de se déplacer en sautant.");
    }

    public sauter(): void {
        console.log("Le personnage est déjà en train de sauter.");
    }
}

class Etourdi implements Etat {
    constructor(private personnage: Personnage) {
        this.sortirDeLEtatEtourdi();
    }

    public async attaquer(): Promise<void> {
        console.log("Le personnage est étourdi, tu ne peux rien faire.");
    }

    public async deplacer(): Promise<void> {
        console.log("Le personnage est étourdi, tu ne peux rien faire.");
    }

    public async sauter(): Promise<void> {
        console.log("Le personnage est étourdi, tu ne peux rien faire.");
    }

    private async sortirDeLEtatEtourdi(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("Le personnage n'est plus étourdi.");
        this.personnage.collision(false);
    }
}

function collision(): boolean {
    return true; 
}


const perso = new Personnage();

const collisions = collision();
perso.collision(collisions);

setTimeout(() => {
    perso.attaquer();
    perso.sauter();
    perso.deplacer();
}, 600); 
