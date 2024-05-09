class Bankkonto {
    kontoNummer: number;
    kontoEier: string;
    kontoSaldo: number;

    constructor(kontoNummer: number, kontoEier: string, kontoSaldo: number) {
        this.kontoNummer = kontoNummer;
        this.kontoEier = kontoEier;
        this.kontoSaldo = kontoSaldo;
    }

    // The inntak method increases the account balance by the given amount
    innskudd(inn: number) {
        this.kontoSaldo += inn;
        return;
    }

    // The uttak method decreases the account balance by the given amount if it is available
    uttak(ut: number) {
        if(ut > this.kontoSaldo) {
            return console.error('Error: Insufficient balance');
        } else {
            return this.kontoSaldo -= ut;
        }
    }

    // The sjekk_saldo method returns the current account balance
    sjekk_saldo(): number {
        return this.kontoSaldo;
    }

    // The overforing method transfers the given amount to another account if it is available
    overforing(belop: number, tilKonto: Bankkonto) {
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
    bankNavn: string;
    kontoer: Bankkonto[];

    constructor(bankNavn: string) {
        this.bankNavn = bankNavn;
        this.kontoer = [];
    }
    // The nyKonto method creates a new account and adds it to the list of kontoer
    nyKonto(kontoNummer: number, kontoEier: string, kontoSaldo: number) {
        const konto = new Bankkonto(kontoNummer, kontoEier, kontoSaldo);
        this.kontoer.push(konto);
    }

    // The eksistererKonto method checks if a konto with the given number exists
    eksistererKonto(kontoNummer: number) {
        return this.kontoer.some(konto => konto.kontoNummer === kontoNummer);
    }
}

let dnb = new Bank('DNB');

dnb.nyKonto(1234, 'Per', 1000);
dnb.nyKonto(5678, 'Pål', 2000);

//create some transactions
dnb.kontoer[0].innskudd(500);
dnb.kontoer[1].uttak(500);
dnb.kontoer[0].overforing(1000, dnb.kontoer[1]);

console.log(dnb.kontoer);
// Expected output:
// [
//     Bankkonto { kontoNummer: 1234, kontoEier: 'Per', kontoSaldo: 500 },
//     Bankkonto { kontoNummer: 5678, kontoEier: 'Pål', kontoSaldo: 2500 }
// ]