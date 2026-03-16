import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly API = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.API);
  }

  getByUser(userId: string): Observable<Booking[]> {
    return this.getAll().pipe(map(b => b.filter(x => x.userId === userId)));
  }

  getByTrip(tripId: string): Observable<Booking[]> {
    return this.getAll().pipe(map(b => b.filter(x => x.tripId === tripId)));
  }

  create(booking: Omit<Booking, 'id'>): Observable<Booking> {
    return this.http.post<Booking>(this.API, booking);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
