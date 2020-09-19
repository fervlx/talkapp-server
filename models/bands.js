

class Bands {

    constructor() {
        this.bands = [];
    }

    add( band ) {
        this.bands.push( band );
    }

    delete( id ) {
        this.bands = this.bands.filter( b => b.id !== id );
        return this.bands;
    }

    vote( id ) {
        this.bands = this.bands.map( band => {

            if ( band.id == id ) {
                band.votes++;
                return band;
            } else {
                return band;
            }
        });
    }

    getAll() {
        return this.bands;
    }
}


module.exports = Bands;