import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-trips.html',
  styleUrl: './my-trips.css'
})
export class MyTripsComponent implements OnInit {
  myTrips: Trip[] = [];

  constructor(
    private tripService: TripService,
    private bookingService: BookingService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    const userId = this.auth.currentUser()?.id!;
    this.bookingService.getByUser(userId).subscribe(bookings => {
      const tripIds = bookings.map(b => b.tripId);
      this.tripService.getAll().subscribe(trips => {
        this.myTrips = trips.filter(t => tripIds.includes(t.id));
      });
    });
  }

  viewTrip(id: string) {
    this.router.navigate(['/home/trip', id]);
  }
}
