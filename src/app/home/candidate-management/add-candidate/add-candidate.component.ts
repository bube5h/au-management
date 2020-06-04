import { Component, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/location.model';
import { Jobdescription } from 'src/app/models/jobdescription.model';
import { Skill } from 'src/app/models/skill.model';
import { JobdescriptionService } from 'src/app/services/jobdescription.service';
import { SkillService } from 'src/app/services/skill.service';
import { SafeHtml } from '@angular/platform-browser';
import { InstituteService } from 'src/app/services/institute.service';
import { Institute } from 'src/app/models/institute.model';
import { Candidate } from 'src/app/models/candidate.model';
import { CandidateService } from 'src/app/services/candidate.service';
import { LowerCasePipe } from '@angular/common';


@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent  
{

	addCandidateForm: FormGroup;

 constructor(private locationservice : LocationService,
             private jobdescriptionservice : JobdescriptionService,
			 private skillservice : SkillService,
			 private instituteservice : InstituteService,
			 private candidateservice : CandidateService){}


 public locations : Location[];
 public locationid : number;
 public jobdescriptions : Jobdescription[];
 public skills : Skill[];
 public selectedskills : Skill[] = [];
 public institutes : Institute[];
 private candidate : Candidate;
 private skillmap = new Map();
 private locationmap = new  Map();
 private jobdescriptionmap = new Map();
 private institutemap = new  Map();


	ngOnInit()
	{
		// this.skillmap.set(1,"fg");
		this.locationservice.getLocations().subscribe(l => {
																this.locations = l;
																for(let location of this.locations)
																{
																	this.locationmap.set(location.locationid,location.location);
																}
															}
														);
		this.jobdescriptionservice.getJobdescriptions().subscribe(j => 
																	{
																		this.jobdescriptions = j;
																		for(let jobdescription of this.jobdescriptions)
																		{
																			this.jobdescriptionmap.set(jobdescription.jobdescriptionid,jobdescription.jobdescription);
																		}
																	}
																	);
		this.skillservice.getSkills().subscribe(s => 
													{
														this.skills = s;
														for(let skill of this.skills)
														{
															this.skillmap.set(skill.skillid,skill.skill);
														}
													}
												);
		this.instituteservice.geInstitutes().subscribe(i => {
																this.institutes = i;
																for(let institute of this.institutes)
																{
																	this.institutemap.set(institute.instituteid,institute.institute);
																}
															}
														);
		
		this.addCandidateForm = new FormGroup({
			'empid': new FormControl(null, Validators.required),
			'firstname' : new FormControl(null,Validators.required),
			'lastname' : new FormControl(null,Validators.required),
			'email' : new FormControl(null,[Validators.required , Validators.email]),
			'contactnumber' : new FormControl(null,Validators.required),
			'instituteid' : new FormControl(null,Validators.required),
			'jobdescriptionid' : new FormControl(null,Validators.required),
			'joiningdate' : new FormControl(null,Validators.required),
			'locationid' : new FormControl(null,Validators.required),
			'feedback' : new FormControl(null,Validators.required),
			'skills' : new FormArray([])
		});
	}

	onAddSkill()
	{
		(<FormArray>this.addCandidateForm.get('skills')).push(new FormControl(null,Validators.required));
	}

	onSubmit()
	{
	


		this.candidate = new Candidate();
		this.candidate.empid = this.addCandidateForm.get('empid').value;
		this.candidate.firstname = this.addCandidateForm.get('firstname').value;
		this.candidate.lastname = this.addCandidateForm.get('lastname').value;
		this.candidate.email = this.addCandidateForm.get('email').value;
		this.candidate.contactnumber = this.addCandidateForm.get('contactnumber').value;
		for(let i of this.addCandidateForm.get('skills').value)
		{
			let skill = new Skill(+i,this.skillmap.get(+i));
			console.log(skill);
			this.selectedskills.push(skill);
		}
		this.candidate.skills = this.selectedskills;
		this.candidate.instituteid = this.addCandidateForm.get('instituteid').value;
		this.candidate.institute =  this.institutemap.get(+this.candidate.instituteid);
		this.candidate.jobdescriptionid = this.addCandidateForm.get('jobdescriptionid').value;
		this.candidate.jobdescription = this.jobdescriptionmap.get(+this.candidate.jobdescriptionid);
		this.candidate.locationid = this.addCandidateForm.get('locationid').value;
		this.candidate.location = this.locationmap.get(+this.candidate.locationid);
		this.candidate.joiningdate = this.addCandidateForm.get('joiningdate').value;
		this.candidate.feedback = this.addCandidateForm.get('feedback').value;
		// console.log(this.candidate);
		this.candidateservice.createCandidate(this.candidate);
		this.addCandidateForm.reset();
		this.addCandidateForm = new FormGroup({
			'empid': new FormControl(null, Validators.required),
			'firstname' : new FormControl(null,Validators.required),
			'lastname' : new FormControl(null,Validators.required),
			'email' : new FormControl(null,[Validators.required, Validators.email]),
			'contactnumber' : new FormControl(null,Validators.required),
			'instituteid' : new FormControl(null,Validators.required),
			'jobdescriptionid' : new FormControl(null,Validators.required),
			'joiningdate' : new FormControl(null,Validators.required),
			'locationid' : new FormControl(null,Validators.required),
			'feedback' : new FormControl(null,Validators.required),
			'skills' : new FormArray([])
		});
		this.selectedskills = [];
	}

	onReset()
	{
		this.addCandidateForm.reset();
		this.addCandidateForm = new FormGroup({
			'empid': new FormControl(null, Validators.required),
			'firstname' : new FormControl(null,Validators.required),
			'lastname' : new FormControl(null,Validators.required),
			'email' : new FormControl(null,[Validators.required, Validators.email]),
			'contactnumber' : new FormControl(null,Validators.required),
			'instituteid' : new FormControl(null,Validators.required),
			'jobdescriptionid' : new FormControl(null,Validators.required),
			'joiningdate' : new FormControl(null,Validators.required),
			'locationid' : new FormControl(null,Validators.required),
			'feedback' : new FormControl(null,Validators.required),
			'skills' : new FormArray([])
		});
		this.selectedskills = [];
	}
}
