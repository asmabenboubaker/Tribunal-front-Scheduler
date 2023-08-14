import { Component, OnInit,ViewChild, enableProdMode  } from '@angular/core';
import { Audience } from './Audience';
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
//translation
import { ChangeDetectorRef } from '@angular/core';
import { locale, loadMessages } from 'devextreme/localization';
import arMessages from 'devextreme/localization/messages/ar.json';
//filter by location
import { assignees as allAssignees, places } from './data';
import { OptionChangedEvent } from 'devextreme/ui/tag_box';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})

export class SchedulerComponent   implements OnInit {
  @ViewChild('scheduler', { static: false }) schedulerInstance: DxSchedulerComponent;

  //arabic scheduler
  ngOnInit() {
    loadMessages(arMessages); 
    locale('ar'); 
  }
  resourcesData: Resource[];
// add fields to the form
onAppointmentFormCreated (e:any) {
  console.log("onAppointmentFormOpening fires");

  e.popup.option("showTitle", true);
  e.popup.option(
    "title",
    e.appointmentData.text
      ? e.appointmentData.text
      : "قم بإنشاء موعد جديد"
  );

  const form = e.form;
  let mainGroupItems = form.itemOption("mainGroup").items;
  
  let formItems = form.option("items");
  // if (
  //   !formItems.find(function (i) {
  //     return i.dataField === "location";
  //   })
  // ) {
  //   formItems.push({
  //     colSpan: 2,
  //     label: { text: "المحكمة " },
  //     editorType: "dxTextBox",
  //     dataField: "location"
  //   });
  //   form.option("items", formItems);
  // }

}
  audienceList: Audience[] = [];
  //customDataSource: CustomStore;
  customDataSource: CustomStore;
  productsStore: ODataStore;
 
  currentDate: Date = new Date(2021, 3, 27);
  appointmentsData: any;



 
store: CustomStore;
dataSource: DataSource;
 

 views = ['day'];

 groups = ['location'];
constructor(private dataService:ServiceschedulerService,private cdr: ChangeDetectorRef) {
  this.rooms = dataService.getTribunalList().subscribe(

    (data) => {
      this.rooms = data;
    },
    (error) => {
      console.log(error);
    }

  );
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
 // filter by location  
 
locations: { id: number; text: string }[] = [
  { id: 1, text: 'tribunal1' },
  { id: 2, text: 'tribunal2' },
  
];
onLocationFilterChanged(location: string) {
  if (!location) {
    // Load all appointments
    this.store = new CustomStore({
      key: 'idAudience',
      load: (loadOptions) => {
     
        return new Promise((resolve, reject) => {
          this.dataService.getAudienceList().subscribe(
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
        
        return this.dataService.addAppointment(values).toPromise();  
      },
      update: (key, values) => {
       
        return this.dataService.updateAudience(key, values).toPromise();  
      },
      remove: (key) => {
        return this.dataService.deleteAudience(key).toPromise().then(() => {
         
           
        });
      },
    });
     
  } else {
    
    this.store = new CustomStore({
      key: 'idAudience',
      load: (loadOptions) => {
        console.log("ee"+location )
        return new Promise((resolve, reject) => {
          this.dataService.getFilteredAppointmentsByLocation(location).subscribe(
            (filteredAppointments) => {
              resolve(filteredAppointments);
            },
            (error) => {
              reject(error);
            }
          );
        });
      },
      insert: (values) => {
        
        return this.dataService.addAppointment(values).toPromise();  
      },
      update: (key, values) => {
       
        return this.dataService.updateAudience(key, values).toPromise();  
      },
      remove: (key) => {
        return this.dataService.deleteAudience(key).toPromise().then(() => {
         
           
        });
      },
     
    });
  }
}

//color of the appointment

rooms: any;
resourcesList: string[] = ['all', 'Tribunal', 'Priority'];
selectedResource: string = this.resourcesList[0];
  }
