import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-all-trips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-trips.html',
  styleUrl: './all-trips.css'
})
export class AllTripsComponent implements OnInit {
  trips: Trip[] = [];
  filteredTrips: Trip[] = [];
  bookedTripIds = new Set<string>();
  tripBookingCounts: Record<string, number> = {};

  filterDestination = '';
  filterDate = '';
  filterMaxPrice = '';
  sortBy = '';

  showAddForm = false;
  editingTrip: Trip | null = null;
  confirmDeleteId: string | null = null;

  newTrip: Omit<Trip, 'id'> = { name: '', destination: '', date: '', price: 0, description: '', image: '' };

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
    this.tripService.getAll().subscribe(trips => {
      this.trips = trips;
      this.applyFilter();
    });
    const userId = this.auth.currentUser()?.id;
    if (userId) {
      this.bookingService.getByUser(userId).subscribe(bookings => {
        this.bookedTripIds = new Set(bookings.map(b => b.tripId));
      });
    }
    this.bookingService.getAll().subscribe(bookings => {
      this.tripBookingCounts = {};
      bookings.forEach(b => {
        this.tripBookingCounts[b.tripId] = (this.tripBookingCounts[b.tripId] || 0) + 1;
      });
    });
  }

  applyFilter() {
    let result = [...this.trips];
    if (this.filterDestination)
      result = result.filter(t => t.destination.includes(this.filterDestination));
    if (this.filterDate)
      result = result.filter(t => t.date >= this.filterDate);
    if (this.filterMaxPrice)
      result = result.filter(t => t.price <= +this.filterMaxPrice);
    if (this.sortBy === 'date')
      result.sort((a, b) => a.date.localeCompare(b.date));
    else if (this.sortBy === 'price')
      result.sort((a, b) => a.price - b.price);
    this.filteredTrips = result;
  }

  viewTrip(id: string) {
    this.router.navigate(['/home/trip', id]);
  }

  hasBookings(tripId: string): boolean {
    return (this.tripBookingCounts[tripId] || 0) > 0;
  }

  confirmDelete(id: string) {
    this.confirmDeleteId = id;
  }

  cancelDelete() {
    this.confirmDeleteId = null;
  }

  deleteTrip(id: string) {
    this.tripService.delete(id).subscribe(() => {
      this.confirmDeleteId = null;
      this.load();
    });
  }

  startEdit(trip: Trip) {
    this.editingTrip = { ...trip };
  }

  saveEdit() {
    if (!this.editingTrip) return;
    this.tripService.update(this.editingTrip.id, this.editingTrip).subscribe(() => {
      this.editingTrip = null;
      this.load();
    });
  }

  cancelEdit() {
    this.editingTrip = null;
  }

  addTrip() {
    this.tripService.create(this.newTrip).subscribe(() => {
      this.showAddForm = false;
      this.newTrip = { name: '', destination: '', date: '', price: 0, description: '', image: '' };
      this.load();
    });
  }
}
