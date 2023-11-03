import { Booking } from "../models/Booking";

class BookingService {
    constructor() {
        this._bookings = [];
        this._currentRental = null;
    }

    bookRental(userId, bikeId, startDate, endDate) {
        const existingBooking = this._bookings.find(
            (booking) =>
                booking.userId === userId &&
                booking.bikeId === bikeId &&
                booking.startDate === startDate &&
                booking.endDate === endDate
        );

        if (existingBooking) {
            console.error('Booking already exists for the selected user and bike on these dates.');
            return false;
        }


        const newBooking = new Booking({
            userId,
            bikeId,
            startDate,
            endDate,
            isAvailable: false,
        });

        this._bookings.push(newBooking);
        console.log('Booking added:', newBooking);

        return true;
    }


    getUserBookings(userId) {
        if (!this._bookings || this._bookings.length === 0) {
            return [];
        }

        const userBookings = this._bookings
            .filter((booking) => booking.userId === userId)
            .filter((booking, index, self) => {
                return (
                    index ===
                    self.findIndex(
                        (b) =>
                            b.userId === booking.userId &&
                            b.bikeId === booking.bikeId &&
                            b.startDate === booking.startDate &&
                            b.endDate === booking.endDate
                    )
                );
            });

        return userBookings;
    }

    getCurrentRental() {
        return this._currentRental;
    }

}

export const bookingService = new BookingService();
