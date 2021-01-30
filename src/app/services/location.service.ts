import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { LocationModel } from '../models/location-model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.urls.api + 'location';
  }

  public GetFromLocations(searchString: string): Observable<LocationModel[]> {
    const url = this.apiUrl + '/from/' + searchString;
    return this.httpClient.get<LocationModel[]>(url);
  }
}
