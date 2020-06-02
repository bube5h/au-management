import { Skill } from './skill.model';

export class Candidate
{
    empid : String;
    firstname : String;
    lastname : String;
    instituteid : number;
    institute : String;
    skills : Skill[];
    locationid : number;
    location : String;
    joiningdate : Date;
    jobdescriptionid : number;
    jobdescription : String;
    feedback : String;
    contactnumber : String;
    email : String;
}