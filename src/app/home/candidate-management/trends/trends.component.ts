import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { LocationService } from 'src/app/services/location.service';
import { JobdescriptionService } from 'src/app/services/jobdescription.service';
import { SkillService } from 'src/app/services/skill.service';
import { InstituteService } from 'src/app/services/institute.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrendService } from 'src/app/services/trend.service';
import { ChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit
{

  single: any[] = [ ];
  view: any[] = [700, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'No. of Candidates';
  bar : boolean = true;
  pie : boolean = false;
  ButtonValue : String = "Toggle To Pie Chart"

  constructor(private trendservice : TrendService,private locationservice : LocationService, private jobdescriptionservice : JobdescriptionService, private skillservice : SkillService, private instituteservice : InstituteService, private candidateservice : CandidateService, private http : HttpClient) {}
  public visible : boolean = false;
  public filters = [
    {
        value: "Locations",
        id: "locations"
    },
    {
        value: "Institutes",
        id: "institutes"
    },
    {
        value: "Skills",
        id: "skills"
    }
  ];
  initialFilter: String = "skills"
  trendForm : FormGroup;

  ngOnInit()
  {
    this.trendForm = new FormGroup({
      'filter': new FormControl(null, Validators.required)
  });

  
   this.trendservice.getSkillsCount().subscribe(trends => {
            let data: any[] = [];
            for(let trend of trends)
            {
              data.push({
                "name" : trend.label,
                "value" : trend.count
              })
            }
            this.single= data;
            this.xAxisLabel = "Skills";
          });
  }



  onChange() {
    let currentFilter = this.trendForm.get('filter').value;
    this.visible = true;
    console.log(currentFilter);
    switch (currentFilter) {
       case "locations":
            this.trendservice.getLocationsCount().subscribe(trends => {
              let data: any[] = [];
              for(let trend of trends)
              {
                data.push({
                  "name" : trend.label,
                  "value" : trend.count
                })
              }
              this.single= data;
              this.xAxisLabel = "Locations";
               
              
            });
            break;
        case "institutes":
          this.trendservice.getInstitutesCount().subscribe(trends => {
            let data: any[] = [];
            for(let trend of trends)
            {
              data.push({
                "name" : trend.label,
                "value" : trend.count
              })
            }
            this.single= data;
            this.xAxisLabel = "Institutes";
         });
            break;
        case "skills":
          this.trendservice.getSkillsCount().subscribe(trends => {
            let data: any[] = [];
            for(let trend of trends)
            {
              data.push({
                "name" : trend.label,
                "value" : trend.count
              })
            }
            this.single= data;
            this.xAxisLabel = "Skills";
     
         });
            break;
    this.visible = true;
            
    }
  }

  onChangeChart()
  {
    this.bar = !this.bar;
    this.pie = !this.pie;
    if(this.bar)
    {
      this.ButtonValue = "Toggle To Pie Chart"
    }
    else
    {
      this.ButtonValue = "Toggle To Bar Chart"
    }
  }
}