import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Activity } from '../models/activity.model';
import { ConfigService } from '../config/config.service';
import { MOCK_ACTIVITIES } from '../mock/activities.mock';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  getActivities(): Observable<Activity[]> {
    if (this.configService.useMockData) {
      return of(MOCK_ACTIVITIES);
    } else {
      return this.http.get<Activity[]>(`${this.configService.apiUrl}/activities`);
    }
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
