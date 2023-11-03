
import { bikes } from "../data/sampleData";
import { Bike } from "../models/Bike";

class BikeService {
    constructor() {
        this._bikes = bikes.map(b => new Bike(b));
    }

    getBikes() {
        return this._bikes;
    }

    filterBikes({ model, color, rating }) {
        const distinctModels = this.getDistinctModels();
        const distinctColors = this.getDistinctColors();
        const distinctRatings = this.getDistinctRatings();

        return this._bikes.filter((bike) => {
            const modelMatch = !model || bike.model === model;
            const colorMatch = !color || bike.color === color;
            const ratingMatch = !rating || bike.rating === rating;

            return modelMatch && colorMatch && ratingMatch;
        });
    }

    getDistinctModels() {
        const uniqueModels = new Set();
        this._bikes.forEach(bike => uniqueModels.add(bike.model));
        return Array.from(uniqueModels);
    }

    getDistinctColors() {
        const uniqueColors = new Set();
        this._bikes.forEach(bike => uniqueColors.add(bike.color));
        return Array.from(uniqueColors);
    }

    getDistinctRatings() {
        const uniqueRatings = new Set();
        this._bikes.forEach(bike => uniqueRatings.add(bike.rating));
        return Array.from(uniqueRatings);
    }

    // Add a method to get bike details by bikeId
    getBikeById(bikeId) {
        return this._bikes.find(bike => bike.id === bikeId);
    }
}

export const bikeService = new BikeService();

