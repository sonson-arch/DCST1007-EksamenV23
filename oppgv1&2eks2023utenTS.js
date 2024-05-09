//Oppgave 1

// Base class for all figures
class Figur {
    constructor() {}
// Methods, return 0 by default

    beregnAreal() { return 0; }
    beregnOmkrets() { return 0; }
    beregnVolum() { return 0; }
    beregnOverflate() { return 0; }
}

class Rektangel extends Figur {
    constructor(hoyde, bredde) {
        super();
        this.hoyde = hoyde;
        this.bredde = bredde;   
    }
    
    // Method to calculate area of rectangle
    beregnAreal() {
        return this.hoyde * this.bredde;
    }

    // Method to calculate circumference of rectangle
    beregnOmkrets() {
        return (2 * this.hoyde) + (2 * this.bredde);
    }
}

class Boks extends Rektangel {
    constructor(hoyde, bredde, lengde) {
        super(hoyde, bredde);
        this.lengde = lengde;
    }
    // Method to calculate volume of box
    beregnVolum() {
        return this.hoyde * this.bredde * this.lengde;
    }
    // Method to calculate surface area of box
    beregnOverflate() {
        return (
            (2 * this.hoyde * this.bredde) + 
            (2 * this.hoyde * this.lengde) + 
            (2 * this.bredde * this.lengde)
        );
    }
}

class Sirkel extends Figur {
    constructor(radius) {
        super();
        this.radius = radius;
    }
// Method to calculate area of circle
    beregnAreal() {
        return Math.PI * this.radius * this.radius;
    }
// Method to calculate circumference of circle
    beregnOmkrets() {
        return 2 * Math.PI * this.radius;
    }
}

class Sylinder extends Sirkel {
    constructor(radius, lengde) {
        super(radius);
        this.lengde = lengde;
    }
    // Method to calculate volume of cylinder
    beregnVolum() {
        return Math.PI * this.radius * this.radius * this.lengde;
    }
// Method to calculate surface area of cylinder
    beregnOverflate() {
        return (
            (2 * Math.PI * this.radius * this.radius) +
            (2 * Math.PI * this.radius * this.lengde)
        );
    }
}

// Create new box and cylinder objects
let b = new Boks(2,3,4);
let s = new Sylinder(2,3);

// Log volume and surface area of box and cylinder to console
console.log("Volum Boks: " + b.beregnVolum());
console.log("Overflate Boks: " + b.beregnOverflate());
console.log("Volum Sylinder: " + s.beregnVolum());
console.log("Overflate Sylinder: " + s.beregnOverflate());

//Oppgave 2

class Bankkonto {
    constructor(kontoNummer, kontoEier, kontoSaldo) {
        this.kontoNummer = kontoNummer;
        this.kontoEier = kontoEier;
        this.kontoSaldo = kontoSaldo;
    }

    // The inntak method increases the account balance by the given amount
    inntak(belop) {
        return this.kontoSaldo += belop;
    }

    // The uttak method decreases the account balance by the given amount if it is available
    uttak(belop) {
        if(belop > this.kontoSaldo) {
            return console.log('Error: Insufficient balance');
        } else {
            return this.kontoSaldo -= belop;
        }
    }

    // The sjekk_saldo method returns the current account balance
    sjekk_saldo() {
        return this.kontoSaldo;
    }

    // The overforing method transfers the given amount to another account if it is available
    overforing(belop, tilKonto) {
        if(belop > this.kontoSaldo) {
            return console.log('Error: Insufficient balance');
        } else if (!tilKonto) {
            return console.log('Error: Account does not exist');
        } else {
            this.kontoSaldo -= belop;
            tilKonto.kontoSaldo += belop;
        }
    }
}
class Bank {
    constructor(bankNavn) {
        this.bankNavn = bankNavn;
        this.kontoer = [];
    }
    // The nyKonto method creates a new account and adds it to the list of kontoer
    nyKonto(kontoNummer, kontoEier, kontoSaldo) {
        const konto = new Bankkonto(kontoNummer, kontoEier, kontoSaldo);
        this.kontoer.push(konto);
    }

    // The eksistererKonto method checks if a konto with the given number exists
    eksistererKonto(kontoNummer) {
        return this.kontoer.some(konto => konto.kontoNummer === kontoNummer);
    }
}
