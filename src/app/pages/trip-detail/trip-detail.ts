import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Trip } from '../../models/trip.model';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-detail.html',
  styleUrl: './trip-detail.css'
})
export class TripDetailComponent implements OnInit {
  trip: Trip | null = null;
  totalRegistered = 0;
  numPeople = 1;
  alreadyBooked = false;
  myBooking: Booking | null = null;
  successMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private bookingService: BookingService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.tripService.getById(id).subscribe(trip => (this.trip = trip));
    this.loadBookings(id);
  }

  loadBookings(tripId: string) {
    const userId = this.auth.currentUser()?.id!;
    this.bookingService.getByTrip(tripId).subscribe(bookings => {
      this.totalRegistered = bookings.reduce((sum, b) => sum + b.numPeople, 0);
      const mine = bookings.find(b => b.userId === userId);
      this.alreadyBooked = !!mine;
      this.myBooking = mine || null;
    });
  }

  register() {
    const userId = this.auth.currentUser()?.id!;
    this.bookingService.create({ userId, tripId: this.trip!.id, numPeople: this.numPeople }).subscribe(() => {
      this.alreadyBooked = true;
      this.totalRegistered += this.numPeople;
      this.successMsg = 'נרשמת בהצלחה לטיול!';
    });
  }

  cancelBooking() {
    if (!this.myBooking?.id) return;
    this.bookingService.delete(this.myBooking.id).subscribe(() => {
      this.router.navigate(['/home/my-trips']);
    });
  }

  goBack() {
    this.router.navigate(['/home/all-trips']);
  }
}
