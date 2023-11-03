/**
 * Represents a Rental.
 * @constructor
 * @param {number} userId - The userId of the rental.
 * @param {number} bikeId - The  bikeId of the rental.
 * @param {string} startDate - The startDate of the rental.
 * @param {string} endDate - The endDate of the rental.
 */
export class Booking {
    constructor(options) {
        this.userId = options.userId;
        this.bikeId = options.bikeId;
        this.startDate = options.startDate;
        this.endDate = options.endDate;
        this.isCancelled = options.isCancelled || false;
    }
}