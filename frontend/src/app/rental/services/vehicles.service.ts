import { HttpHelper } from './../../core/helpers/http.helper';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  url = environment.apiUrl;
  authorizationHeaders?: HttpHeaders;

  constructor(private http: HttpClient, private httpHelper: HttpHelper) {
    this.authorizationHeaders = this.httpHelper.setAuthorizationHeaders();
  }

  list(query?: string): Observable<Vehicle[]> {
    const params = new HttpParams().set('query', query || '');
    return this.http.get<Vehicle[]>(`${this.url}/vehicles`, {
      headers: this.authorizationHeaders,
    });
  }

  rentVehicle(vehicleId: string): Observable<any> {
    const body = {
      action: 'rent',
      vehicleId,
    };
    return this.http.patch<any>(`${this.url}/vehicles`, body, {
      headers: this.authorizationHeaders,
    });
  }

  returnVehicle(vehicleId: string): Observable<any> {
    const body = {
      action: 'return',
      vehicleId,
    };
    return this.http.patch<any>(`${this.url}/vehicles`, body, {
      headers: this.authorizationHeaders,
    });
  }
}
