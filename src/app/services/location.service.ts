
import { HttpHeaders,HttpParams,HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';
import { Location } from '../models/location.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationService
{

    constructor(private http: HttpClient) {}
    getLocations(): Observable<Location[]> {  
        return this.http.get<Location[]>('http://localhost:8080/locations');
    }

}