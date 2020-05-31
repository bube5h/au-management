
import { HttpHeaders,HttpParams,HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jobdescription } from '../models/jobdescription.model';

@Injectable()
export class JobdescriptionService
{

    constructor(private http: HttpClient) {}
    getJobdescriptions(): Observable<Jobdescription[]> {  
        return this.http.get<Jobdescription[]>('http://localhost:8080/jobdescriptions');
    }

}