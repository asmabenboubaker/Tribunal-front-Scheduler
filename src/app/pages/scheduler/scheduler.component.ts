import { Component, OnInit,ViewChild, enableProdMode  } from '@angular/core';
import { Audience } from './Audience';
// import serciescheduler from './service/servicescheduler.service';
import { Resource, ServiceschedulerService } from '../../service/servicescheduler.service';
import { DxButtonModule, DxSchedulerModule, DxSchedulerComponent } from "devextreme-angular";
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import { LoadOptions } from 'devextreme/data';
import ODataStore from 'devextreme/data/odata/store';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})

export class SchedulerComponent    {
   
  resourcesData: Resource[];
// add fields to the form
onAppointmentFormCreated (e:any) {
  console.log("onAppointmentFormOpening fires");

  e.popup.option("showTitle", true);
  e.popup.option(
    "title",
    e.appointmentData.text
      ? e.appointmentData.text
      : "Create a new appointment"
  );

  const form = e.form;
  let mainGroupItems = form.itemOption("mainGroup").items;
  if (
    !mainGroupItems.find(function (i) {
      return i.dataField === "phone";
    })
  ) {
    mainGroupItems.push({
      colSpan: 2,
      label: { text: "Phone Number" },
      editorType: "dxTextBox",
      dataField: "phone"
    });
    form.itemOption("mainGroup", "items", mainGroupItems);
  }

  let formItems = form.option("items");
  if (
    !formItems.find(function (i) {
      return i.dataField === "location";
    })
  ) {
    formItems.push({
      colSpan: 2,
      label: { text: "Location" },
      editorType: "dxTextBox",
      dataField: "location"
    });
    form.option("items", formItems);
  }

}
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
 
  currentDate: Date = new Date(2021, 3, 27);
  appointmentsData: any;
//   constructor(private dataService:ServiceschedulerService,private http: HttpClient) {
     
//       const url = 'http://localhost:8081/picosoft/api/schedule';
   
//       this.appointmentsData = AspNetData.createStore({
//         key: 'AppointmentId',
//         loadUrl: `${url}/loadData`,
//         insertUrl: `${url}/addAudience`,
//         updateUrl: `${url}/Put`,
//         deleteUrl: `${url}/Delete`,
        
//         onBeforeSend(method, ajaxOptions) {
          
//           ajaxOptions.xhrFields = { withCredentials: true };
      
//         // i get bad request 
//         //   ajaxOptions.data = {
//         //     AppointmentId: 1,
//         //     Title: "test",
//         //     StartDate: new Date(2021, 3, 27),
//         //     EndDate: new Date(2021, 3, 27),
//         //     DayLong: false,
//         //     Recurrence: "test",
//         //     RecurrenceException: "test",
//         //     RecurrenceID: 1,
//         //     RecurrenceRule: "test",
//         //     Description: "test",
//         //     Location: "test",
//         //     OwnerId: 1,
//         //     Priority: 1,
//         //     ReminderInfo: "test",
//         //     ReminderTime: "test",
//         //     AllDay: false,
//         //     Type: "test",
//         //     Status: "test",
//         //     Label: "test",
//         //     ResourceId: 1,
//         //     ResourceIds: "test",
//         //     Attendees: "test",
//         //     AttendeesId: 1,
          
//         // };
// // unsupportable media type
        
//         },

//       });
    
// }
    
// store: CustomStore;
// constructor() {
//     let serviceUrl = "http://localhost:8081/picosoft/api/schedule";
//     this.store = createStore({
//         key: "AppointmentId",
//         loadUrl: serviceUrl + "/loadData",
     

//         insertUrl: serviceUrl + "/addAudience",
//         updateUrl: serviceUrl + "/UpdateAction",
//         deleteUrl: serviceUrl + "/DeleteAction",
//         onBeforeSend(method, ajaxOptions) {
//           method = "POST";
//           ajaxOptions.xhrFields = { withCredentials: true };
//           ajaxOptions.dataType = "json";
//           ajaxOptions.contentType = "application/json";
      
//         },
        
//     })
    
// }

 
store: CustomStore;
dataSource: DataSource;
 
constructor(private dataService:ServiceschedulerService,private cdr: ChangeDetectorRef) {
  
  this.resourcesData = dataService.getResources();
  this.store = new CustomStore({
    key: "idAudience",
    load: (loadOptions) => {
     
      return new Promise((resolve, reject) => {
        dataService.getAudienceList().subscribe(
          (audienceList) => {
            resolve(audienceList);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
    insert: (values) => {
      
      return dataService.addAppointment(values).toPromise();  
    },
    update: (key, values) => {
     
      return dataService.updateAudience(key, values).toPromise();  
    },
    remove: (key) => {
      return dataService.deleteAudience(key).toPromise().then(() => {
       
         
      });
    },
  });

  this.dataSource = new DataSource({
    store: this.store,
    paginate: false,  
  });
}
  }
