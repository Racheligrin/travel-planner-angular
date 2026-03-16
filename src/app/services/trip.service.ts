import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip.model';

@Injectable({ providedIn: 'root' })
export class TripService {
  private readonly API = 'http://localhost:3000/trips';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.API);
  }

  getById(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.API}/${id}`);
  }

  create(trip: Omit<Trip, 'id'>): Observable<Trip> {
    return this.http.post<Trip>(this.API, trip);
  }

  update(id: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.API}/${id}`, trip);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
