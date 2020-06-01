import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
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

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit
{

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
  trendForm : FormGroup;

  ngOnInit()
  {
    this.trendForm = new FormGroup({
      'filter': new FormControl(null, Validators.required)
  });

  }



  onChange() {
    let currentFilter = this.trendForm.get('filter').value;
    this.visible = true;
    console.log(currentFilter);
    switch (currentFilter) {
       case "locations":
            this.trendservice.getLocationsCount().subscribe(trends => {
               let data : number[] = [];
               let label : Label[] = [];
               for(let trend of trends)
               {
                  data.push(trend.count);
                  label.push(<Label>trend.label);
               }
               
                this.lineChartData = data;
                this.lineChartLabels = label;
                console.log(this.lineChartData);
                console.log(this.lineChartLabels);
                this.labelMFL =  [
                  { data: this.lineChartData,
                    label: 'Locations'
                  }
              ];
                this.chart.chart.update();
            });
            break;
        case "institutes":
          this.trendservice.getInstitutesCount().subscribe(trends => {
            let data : number[] = [];
            let label : Label[] = [];
            for(let trend of trends)
            {
               data.push(trend.count);
               label.push(<Label>trend.label);
            }
            this.lineChartData = data;
            this.lineChartLabels = label;
            console.log(this.lineChartData);
            console.log(this.lineChartLabels);
            this.labelMFL =  [
              { data: this.lineChartData,
                label: 'Institutes'
              }
          ];
            this.chart.chart.update();
         });
            break;
        case "skills":
          this.trendservice.getSkillsCount().subscribe(trends => {
            let data : number[] = [];
            let label : Label[] = [];
            for(let trend of trends)
            {
               data.push(trend.count);
               label.push(<Label>trend.label);
            }
            this.lineChartData = data;
            this.lineChartLabels = label;
            this.labelMFL =  [
              { data: this.lineChartData,
                label: 'Skills'
              }
          ];

            console.log(this.lineChartData);
            console.log(this.lineChartLabels);
            this.chart.chart.update();

         });
            break;
    this.visible = true;
            
    }
}


@ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public label = 8;
  public a = 0;

  public lineChartData: Array<any> = [1,2 ,3];

  public lineChartLabels: Array<any> = ["a","b","c"];
  public lineChartOptions: any = {
    responsive: true,
    scales : {
    yAxes: [{
       ticks: {
          min : 0,
        }
    }] 
  }
  };

  public labelMFL: Array<any> = [
      { data: this.lineChartData,
        label: 'aa'
      }
  ];

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType = 'line';

    // // events
    // public chartClicked(e: any): void {
    //   console.log(e);
    // }
  
    // public chartHovered(e: any): void {
    //   console.log(e);
    // }
  





}