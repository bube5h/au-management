
import { HttpHeaders,HttpParams,HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate.model';

@Injectable()
export class CandidateService
{

    constructor(private http: HttpClient) {}
    getCandidates(): Observable<Candidate[]> {  
        return this.http.get<Candidate[]>('http://localhost:8080/candidates');
    }

    createCandidate(candidate : Candidate)
    {
        let newcandidate= 
        {
            empid : candidate.empid,
            firstname : candidate.firstname,
            lastname : candidate.lastname,
            instituteid : candidate.instituteid,
            institute : candidate.institute,
            skills : candidate.skills,
            locationid : candidate.locationid,
            location : candidate.location,
            joiningdate : candidate.joiningdate,
            jobdescriptionid : candidate.jobdescriptionid,
            jobdescription : candidate.jobdescription,
            feedback : candidate.feedback,
            contactnumber : candidate.contactnumber,
            email : candidate.email
        }


        console.log(JSON.stringify(candidate.skills));
        console.log(candidate.skills[0]);

        this.http.post('http://localhost:8080/candidates',JSON.stringify(newcandidate),{headers: { 'Content-Type': 'application/json' }}).subscribe();
        
        console.log(JSON.stringify(newcandidate));
  
    }
    

    updateCandidate(candidate : Candidate)
    {
        this.http.put('http://localhost:8080/candidates',JSON.stringify(candidate),{headers: { 'Content-Type': 'application/json' }}).subscribe();     
    }
  
    deleteCandidate(empid : String )
    {
        this.http.delete('http://localhost:8080/candidates/' + empid).subscribe();
    }

}