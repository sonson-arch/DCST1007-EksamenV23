//Del A
class Figur {
    getArea(): number {
        return 0
    }
    getcircumference(): number {
        return 0
    }
    getVolume(): number {
        return 0
    }
    getOverflate(): number {
        return 0
    }
}

class Rektangel extends Figur {
    height: number;
    width: number;
    
    constructor(height: number, width: number) {
        super();
        this.height = height;
        this.width = width;
    }

    getArea(): number {
        return this.height * this.width;
    }

    getcircumference(): number {
        return ((2 * this.height) + (2 * this.width));
    }
}

class Sirkel extends Figur {
    radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }

    getcircumference(): number {
        return 2 * Math.PI * this.radius;
    }
}

//Del B

class Boks extends Rektangel {
    length: number;

    constructor(height: number, width: number, length: number) {
        super(height, width);
        this.length = length;
    }

    //Bruker getArea() metoden fra moderklassen Rektangel
    getVolume(): number {
        return this.getArea() * this.length;
    }

    getOverflate(): number {
        return (2 * (this.height * this.width) + 
        (2 * this.height * this.length) + 
        (2 * this.width * this.length));
    }
}

class Sylinder extends Sirkel {
    length: number;

    constructor(radius: number, length: number) {
        super(radius);
        this.length = length;
    }

    //Bruker getArea() metoden fra moderklassen Sirkel
    getVolume(): number {
        return this.getArea() * this.length;
    }
    //Bruker getOverflate() metoden fra moderklassen Sirkel
    getOverflate(): number {
        return (2 * this.getArea() + (2 * Math.PI * this.radius * this.length));
    }
}

//Del C

let boks = new Boks(2, 3, 4);
let sylinder = new Sylinder(2, 3);

console.log(`Boksen har et volum på ${boks.getVolume().toFixed(2)} cm^3` +
` og en overflate på ${boks.getOverflate().toFixed(2)} cm^2`);

console.log(`Sylinderen har et volum på ${sylinder.getVolume().toFixed(2)} cm^3` + 
` og en overflate på ${sylinder.getOverflate().toFixed(2)} cm^2`);