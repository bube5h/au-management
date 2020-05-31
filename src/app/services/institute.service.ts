
import { HttpHeaders,HttpParams,HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Institute } from '../models/institute.model';

@Injectable()
export class InstituteService
{

    constructor(private http: HttpClient) {}
    geInstitutes(): Observable<Institute[]> {  
        return this.http.get<Institute[]>('http://localhost:8080/institutes');
    }

}