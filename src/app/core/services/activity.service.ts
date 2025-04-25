import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Activity } from '../models/activity.model';
import { ConfigService } from '../config/config.service';
import { MOCK_ACTIVITIES } from '../mock/activities.mock';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private authService: AuthService
  ) { }

  getActivities(): Observable<Activity[]> {
    // Check if we have a Strava token
    const stravaToken = localStorage.getItem('auth_token');

    if (stravaToken) {
      // If we have a Strava token, use it to fetch activities from Strava
      return this.getStravaActivities();
    } else if (this.configService.useMockData) {
      // If no Strava token and using mock data, return mock activities
      return of(MOCK_ACTIVITIES);
    } else {
      // If no Strava token and not using mock data, fetch from regular API
      return this.http.get<Activity[]>(`${this.configService.apiUrl}/activities`);
    }
  }

  getStravaActivities(): Observable<Activity[]> {
    return this.authService.getStravaActivities()
      .pipe(
        map((response: any) => {
          // Map the Strava activities to our Activity model
          // This assumes the response structure matches or can be mapped to our Activity model
          if (Array.isArray(response)) {
            return response.map((item: any) => {
              return {
                id: item.id.toString(),
                name: item.name,
                description: item.description || null,
                distance: item.distance,
                duration: item.moving_time || item.elapsed_time,
                startDate: item.start_date,
                endDate: item.start_date, // Strava might not have end date, use start date
                elevationGain: item.total_elevation_gain || 0,
                type: item.type
              } as Activity;
            });
          }
          return [];
        }),
        catchError(error => {
          console.error('Error fetching Strava activities:', error);
          // If there's an error fetching from Strava, fall back to mock or regular API
          if (this.configService.useMockData) {
            return of(MOCK_ACTIVITIES);
          } else {
            return this.http.get<Activity[]>(`${this.configService.apiUrl}/activities`);
          }
        })
      );
  }

  getActivityById(id: string): Observable<Activity | undefined> {
    if (this.configService.useMockData) {
      const activity = MOCK_ACTIVITIES.find(a => a.id === id);
      return of(activity);
    } else {
      return this.http.get<Activity>(`${this.configService.apiUrl}/activities/${id}`);
    }
  }
}
