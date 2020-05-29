import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CandidateManagementComponent } from './home/candidate-management/candidate-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCandidateComponent } from './home/candidate-management/add-candidate/add-candidate.component';
import { SearchAndEditCandidatesComponent } from './home/candidate-management/search-and-edit-candidates/search-and-edit-candidates.component';
import { TrendsComponent } from './home/candidate-management/trends/trends.component';

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
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
