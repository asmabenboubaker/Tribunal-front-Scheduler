import { Component, OnInit,ViewChild  } from '@angular/core';
import { Audience } from './Audience';
// import serciescheduler from './service/servicescheduler.service';
import { ServiceschedulerService } from '../../service/servicescheduler.service';
import { DxButtonModule, DxSchedulerModule, DxSchedulerComponent } from "devextreme-angular";
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import { LoadOptions } from 'devextreme/data';
import ODataStore from 'devextreme/data/odata/store';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent   {
  store: CustomStore;
    
  @ViewChild(DxSchedulerComponent, { static: false }) scheduler: DxSchedulerComponent;
  // customDataSource: CustomStore;
  audienceList: Audience[] = [];
  //customDataSource: CustomStore;
  customDataSource: CustomStore;
  productsStore: ODataStore;
  // dataSource: Audience[] = [
  //   {
  //     title: 'Meeting 1',
  //     startDate: new Date(2023, 7, 7, 10, 0), // Year, Month (0-indexed), Day, Hour, Minute
  //     endDate: new Date(2023, 7, 7, 11, 30),
  //     dayLong: false,
  //   },
  //   {
  //     title: 'All-Day Event',
  //     startDate: new Date(2023, 7, 8),
  //     endDate: new Date(2023, 7, 9),
  //     dayLong: true,
  //   },
  //   {
  //     title: 'Recurring Event',
  //     startDate: new Date(2023, 7, 9, 15, 0),
  //     endDate: new Date(2023, 7, 9, 16, 30),
  //     dayLong: false,
  //     recurrence: 'FREQ=WEEKLY;BYDAY=TU;COUNT=5', // Recurs every Tuesday for 5 occurrences
  //   },
  // ];
  constructor(private dataService:ServiceschedulerService,private http: HttpClient) {
    
    const isNotEmpty = (value: unknown) => value !== undefined && value !== null && value !== '';
  
    this.productsStore = new ODataStore({
      url: 'http://localhost:8081/picosoft/api/schedule/loadData',
      key: 'idAudience',
      version: 3,
      onLoaded: () => {
        
         console.log("aaaaaaa");
      }
  });
//   this.productsStore.remove({
//     idAudience: 1,
// }).then(
//     (key) => { /* Process the "key" here */ },
//     (error) => { console.log("ERRRRRRRRROR" + error); }
// );
 
//    getAudienceList() {
//     this.dataService.getAudienceList().subscribe(
//       (response) => {
//         this.audienceList = response;
       
//       },
//       (error) => {
//         console.error('Error fetching audience list:', error);
//       }
//     );
//   }
//   addAppointment() {
//     this.scheduler.instance.addAppointment({
//         text: "Website Re-Design Plan",
//         startDate: new Date("2016-04-25T01:30:00.000Z"),
//         endDate: new Date("2016-04-25T02:30:00.000Z")
//     });
//     console.log("aaaaaaaaaaaaaaaaaaaaaaaaa)");
// }
 
}
    

  }

