import {Component, OnInit} from '@angular/core';

import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {LocationService} from 'src/app/services/location.service';
import {Location} from 'src/app/models/location.model';
import {Jobdescription} from 'src/app/models/jobdescription.model';
import {Skill} from 'src/app/models/skill.model';
import {JobdescriptionService} from 'src/app/services/jobdescription.service';
import {SkillService} from 'src/app/services/skill.service';
import {SafeHtml} from '@angular/platform-browser';
import {InstituteService} from 'src/app/services/institute.service';
import {Institute} from 'src/app/models/institute.model';
import {Candidate} from 'src/app/models/candidate.model';
import {CandidateService} from 'src/app/services/candidate.service';

import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap,
    catchError
} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';


@Component({selector: 'app-search-and-edit-candidates', 
templateUrl: './search-and-edit-candidates.component.html', 
styleUrls: ['./search-and-edit-candidates.component.css']
})
export class SearchAndEditCandidatesComponent implements OnInit {
    public model : any;
    public searchSuggestions : String[];
    public filters = [
        {
            value: "By Id",
            id: "id"
        },
        {
            value: "By Location",
            id: "location"
        },
        {
            value: "By Institute",
            id: "institute"
        },
        {
            value: "By Jobdescription",
            id: "jobdescription"
        }, {
            value: "By Skill",
            id: "skill"
        }
    ];
    private currentFilter : String;
    updateCandidateForm : FormGroup;
    searchCandidateForm : FormGroup;
    public candidates : Candidate[] = [];
    public visible : boolean = false;
    public editing : boolean = false;


    constructor(private locationservice : LocationService, private jobdescriptionservice : JobdescriptionService, private skillservice : SkillService, private instituteservice : InstituteService, private candidateservice : CandidateService, private http : HttpClient) {}


    public locations : Location[];
    public locationid : number;
    public jobdescriptions : Jobdescription[];
    public skills : Skill[];
    public selectedskills : Skill[] = [];
    public institutes : Institute[];
    private candidate : Candidate;
    private skillmap = new Map();
    private locationmap = new Map();
    private jobdescriptionmap = new Map();
    private institutemap = new Map();


    ngOnInit() {
        this.http.get<String[]>("http://localhost:8080/candidates/empids").subscribe(s => this.searchSuggestions = s);

        this.locationservice.getLocations().subscribe(l => {
            this.locations = l;
            for (let location of this.locations) {
                this.locationmap.set(location.locationid, location.location);
            }
        });
        this.jobdescriptionservice.getJobdescriptions().subscribe(j => {
            this.jobdescriptions = j;
            for (let jobdescription of this.jobdescriptions) {
                this.jobdescriptionmap.set(jobdescription.jobdescriptionid, jobdescription.jobdescription);
            }
        });
        this.skillservice.getSkills().subscribe(s => {
            this.skills = s;
            for (let skill of this.skills) {
                this.skillmap.set(skill.skillid, skill.skill);
            }
        });
        this.instituteservice.geInstitutes().subscribe(i => {
            this.institutes = i;
            for (let institute of this.institutes) {
                this.institutemap.set(institute.instituteid, institute.institute);
            }
        });


        this.searchCandidateForm = new FormGroup({'search-box': new FormControl(null), 'filter': new FormControl(null)});


        // this.updateCandidateForm = new FormGroup({
        //     'empid': new FormControl(null, Validators.required),
        //     'firstname': new FormControl(null, Validators.required),
        //     'lastname': new FormControl(null, Validators.required),
        //     'email': new FormControl(null, [Validators.required, Validators.email]),
        //     'contactnumber': new FormControl(null, Validators.required),
        //     'instituteid': new FormControl(null, Validators.required),
        //     'jobdescriptionid': new FormControl(null, Validators.required),
        //     'joiningdate': new FormControl(null, Validators.required),
        //     'locationid': new FormControl(null, Validators.required),
        //     'feedback': new FormControl(null, Validators.required),
        //     'skills' : new FormArray([])
        // });


    }

    onChange() {
        let currentFilter = this.searchCandidateForm.get('filter').value;
        this.visible = false;
        this.editing = false;
        console.log(currentFilter);
        switch (currentFilter) {
            case "id":
                this.http.get<String[]>("http://localhost:8080/candidates/empids").subscribe(s => this.searchSuggestions = s);
                break;
            case "location":
                this.http.get<Location[]>("http://localhost:8080/locations").subscribe(locations => {
                    let temp: String[] = [];
                    for (let location of locations) {
                        temp.push(location.location);
                    }
                    this.searchSuggestions = temp;
                });
                this.currentFilter = this.searchCandidateForm.get('filter').value;
                break;
            case "institute":
                this.http.get<Institute[]>("http://localhost:8080/institutes").subscribe(institutes => {
                    let temp: String[] = [];
                    for (let institute of institutes) {
                        temp.push(institute.institute);
                    }
                    this.searchSuggestions = temp;
                });
                break;
            case "jobdescription":
                this.http.get<Jobdescription[]>("http://localhost:8080/jobdescriptions").subscribe(jobdescriptions => {
                    let temp: String[] = [];
                    for (let jobdescription of jobdescriptions) {
                        temp.push(jobdescription.jobdescription);
                    }
                    this.searchSuggestions = temp;
                });
                break;
            case "skill":
                this.http.get<Skill[]>("http://localhost:8080/skills").subscribe(skills => {
                    let temp: String[] = [];
                    for (let skill of skills) {
                        temp.push(skill.skill);
                    }
                    this.searchSuggestions = temp;
                });
                break;
        }
        this.searchCandidateForm.get('search-box').reset();
    }


    onSearch() {
        this.visible = true;
        let params = new HttpParams();
        params = params.append('by', this.searchCandidateForm.get('filter').value);
        this.http.get<Candidate[]>("http://localhost:8080/candidates/" + this.searchCandidateForm.get('search-box').value, {params: params}).subscribe(res => {
            this.candidates = res;
            // console.log(this.candidates);
        });
    }


    onEdit(event) {
		this.updateCandidateForm = new FormGroup({
            'empid': new FormControl(null, Validators.required),
            'firstname': new FormControl(null, Validators.required),
            'lastname': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'contactnumber': new FormControl(null, Validators.required),
            'instituteid': new FormControl(null, Validators.required),
            'jobdescriptionid': new FormControl(null, Validators.required),
            'joiningdate': new FormControl(null, Validators.required),
            'locationid': new FormControl(null, Validators.required),
            'feedback': new FormControl(null, Validators.required),
            'skills' : new FormArray([])
        });

        var target = event.target ;
        // || event.srcElement || event.currentTarget
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        // console.log(value);
        // console.log(this.candidates[value]);
        this.editing = true;

        this.candidate = this.candidates[value];
        this.updateCandidateForm.patchValue({
            empid: this.candidate.empid,
            firstname: this.candidate.firstname,
            lastname: this.candidate.lastname,
            email: this.candidate.email,
            contactnumber: this.candidate.contactnumber,
			instituteid: this.candidate.instituteid,
            jobdescriptionid: this.candidate.jobdescriptionid,
            joiningdate: this.candidate.joiningdate,
            locationid: this.candidate.locationid,
            feedback: this.candidate.feedback
		})
		let formArrayValues : String[] = []
		let temp : String;
		for(let skill of this.candidate.skills)
		{
			(<FormArray>this.updateCandidateForm.get('skills')).push(new FormControl(null,Validators.required));
			temp = "" + skill.skillid;
			formArrayValues.push(temp);
		}
		// console.log(formArrayValues);
		this.updateCandidateForm.patchValue(
			{
				skills : formArrayValues
			}
		)

		// this.updateCandidateForm.get('skills').
        

	}
	
	onAddSkill()
	{
		(<FormArray>this.updateCandidateForm.get('skills')).push(new FormControl(null,Validators.required));
	}

    onUpdate() {
		this.candidate.empid = this.updateCandidateForm.get('empid').value;
		this.candidate.firstname = this.updateCandidateForm.get('firstname').value;
        this.candidate.lastname = this.updateCandidateForm.get('lastname').value;
        this.candidate.email = this.updateCandidateForm.get('email').value;
		this.candidate.contactnumber = this.updateCandidateForm.get('contactnumber').value;
		this.selectedskills = [];
        for(let i of this.updateCandidateForm.get('skills').value)
        {
        let skill = new Skill(+i,this.skillmap.get(+i));
        // console.log(skill);
        this.selectedskills.push(skill);
        }
        this.candidate.skills = this.selectedskills;
        this.candidate.instituteid = this.updateCandidateForm.get('instituteid').value;
        this.candidate.institute =  this.institutemap.get(+this.candidate.instituteid);
        this.candidate.jobdescriptionid = this.updateCandidateForm.get('jobdescriptionid').value;
        this.candidate.jobdescription = this.jobdescriptionmap.get(+this.candidate.jobdescriptionid);
        this.candidate.locationid = this.updateCandidateForm.get('locationid').value;
        this.candidate.location = this.locationmap.get(+this.candidate.locationid);
        this.candidate.joiningdate = this.updateCandidateForm.get('joiningdate').value;
        this.candidate.feedback = this.updateCandidateForm.get('feedback').value;
        // console.log(this.candidate);
        this.candidateservice.updateCandidate(this.candidate);
		this.updateCandidateForm.reset();
		// this.updateCandidateForm.
        this.editing = false;
    }

    onCancelEdit()
    {
        this.editing = false;
    }

    onDelete(event)
    {
        var target = event.target ;
        // || event.srcElement || event.currentTarget
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        // console.log(value);
        // console.log(this.candidates[value]);
        this.editing = false;


        this.candidate = this.candidates[value];
        this.candidateservice.deleteCandidate(this.candidate.empid);
        // console.log(this.candidates[value]);
        // console.log(value);
        this.candidates.splice(value,1);
        // console.log(this.candidates);
    }


    search = (text$ : Observable < string >) => text$.pipe(debounceTime(200), distinctUntilChanged(), map(term => term.length < 1 ? [] : this.searchSuggestions.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))

}


// search = (text$: Observable<string>) =>
// text$.pipe(
//     debounceTime(200),
//     distinctUntilChanged(),
//       switchMap( (searchText) =>  this.http.get<String[]>("http://localhost:8080/candidates/test") ),
// );

// resultFormatBandListValue(value: any) {
//     return value.name;
// }
// /**
//     * Initially binds the string value and then after selecting
//     * an item by checking either for string or key/value object.
// */
// inputFormatBandListValue(value: any)   {
//     if(value.name)
//       return value.name
//     return value;
// }
