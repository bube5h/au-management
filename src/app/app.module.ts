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
import { LineChartComponent } from './home/candidate-management/trends/line-chart/line-chart.component';
import { BarChartComponent } from './home/candidate-management/trends/bar-chart/bar-chart.component';
import { PieChartComponent } from './home/candidate-management/trends/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { TrendService } from './services/trend.service';
import { SocialLoginModule, AuthServiceConfig,GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("536838765105-fjvmdjl2n9emdcdtk6fcd71fgi19aece.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('YOUR-APP-ID')
  }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CandidateManagementComponent,
    AddCandidateComponent,
    SearchAndEditCandidatesComponent,
    TrendsComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    SocialLoginModule
  ],
  providers: [LocationService,
    {
      provide : AuthServiceConfig,
      useFactory: provideConfig
    },
    JobdescriptionService,CandidateService,SkillService,InstituteService,TrendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
