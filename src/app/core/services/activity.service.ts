import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Activity} from '../models/activity.model';
import {ConfigService} from '../config/config.service';
import {MOCK_ACTIVITIES} from '../mock/activities.mock';
import {AuthService} from './auth.service';

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

    // Check if token is mock-jwt-token or useMockData is active
    if (stravaToken === 'mock-jwt-token' || this.configService.useMockData) {
      // If token is mock-jwt-token or using mock data, return mock activities
      return of(MOCK_ACTIVITIES);
    } else if (stravaToken) {
      // If we have a real Strava token, use it to fetch activities from Strava
      return this.getStravaActivities();
    } else {
      return EMPTY;
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
                duration: item.duration,
                startDate: item.startDate,
                endDate: item.endDate,
                elevationGain: item.elevationGain,
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
    // Check if token is mock-jwt-token or useMockData is active
    const stravaToken = localStorage.getItem('auth_token');
    if (stravaToken === 'mock-jwt-token' || this.configService.useMockData) {
      const activity = MOCK_ACTIVITIES.find(a => a.id === id);
      return of(activity);
    } else {
      return this.http.get<Activity>(`${this.configService.apiUrl}/activities/${id}`);
    }
  }
}
