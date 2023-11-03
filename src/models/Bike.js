/**
 * Represents a Bike.
 * @constructor
 * @param {number} id - The id of the bike.
 * @param {string} model - The model of the bike.
 * @param {string} color - The color of the bike.
 * @param {string} location - The location of the bike.
 * @param {number} rating - The rating of the bike.
 * @param {boolean} isAvailable - The availability of the bike.
 */
export class Bike {
    constructor(options) {
        this.id = options.id;
        this.model = options.model;
        this.color = options.color;
        this.location = options.location;
        this.rating = options.rating;
        this.isAvailable = options.isAvailable;
    }
}