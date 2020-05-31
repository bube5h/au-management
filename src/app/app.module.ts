import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CandidateManagementComponent } from './home/candidate-management/candidate-management.component';
import { NgbModule, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AddCandidateComponent } from './home/candidate-management/add-candidate/add-candidate.component';
import { SearchAndEditCandidatesComponent } from './home/candidate-management/search-and-edit-candidates/search-and-edit-candidates.component';
import { TrendsComponent } from './home/candidate-management/trends/trends.component';
import { LocationService } from './services/location.service';
import { JobdescriptionService } from './services/jobdescription.service';
import { CandidateService } from './services/candidate.service';
import { SkillService } from './services/skill.service';
import { InstituteService } from './services/institute.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CandidateManagementComponent,
    AddCandidateComponent,
    SearchAndEditCandidatesComponent,
    TrendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LocationService,JobdescriptionService,CandidateService,SkillService,InstituteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
