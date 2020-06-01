
import { HttpHeaders,HttpParams,HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate.model';
import { Skill } from '../models/skill.model';
import { Trend } from '../models/trend.model';

@Injectable()
export class TrendService
{

    constructor(private http: HttpClient) {}
    getSkillsCount(): Observable<Trend[]> {  
        return this.http.get<Trend[]>('http://localhost:8080/trend/skills');
    }

    getLocationsCount(): Observable<Trend[]> {  
        return this.http.get<Trend[]>('http://localhost:8080/trend/locations');
    }

    getInstitutesCount(): Observable<Trend[]> {  
        return this.http.get<Trend[]>('http://localhost:8080/trend/institutes');
    }

}