
import { HttpHeaders,HttpParams,HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate.model';
import { Skill } from '../models/skill.model';

@Injectable()
export class SkillService
{

    constructor(private http: HttpClient) {}
    getSkills(): Observable<Skill[]> {  
        return this.http.get<Skill[]>('http://localhost:8080/skills');
    }

}