import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Audience } from '../pages/scheduler/Audience';
@Injectable({
  providedIn: 'root'
})
export class ServiceschedulerService {

  constructor(private http: HttpClient) { }
  // crud schedule

  private apiUrl = 'http://localhost:8081/picosoft/api/schedule/loadData';
  private addapi="http://localhost:8081/picosoft/api/schedule/addAudience"

  getAudienceList(): Observable<Audience[]> {
    return this.http.get<Audience[]>(this.apiUrl); 
  }
  addAppointment(newAppointment: any): Observable<any> {
    return this.http.post<any>(this.addapi, newAppointment);
  }
  deleteAudience(id: number): Observable<any> {
    const deleteUrl = `http://localhost:8081/picosoft/api/schedule/deleteAudience/${id}`;
    return this.http.delete<any>(deleteUrl);
  }
  updateAudience(id: number, updatedAudience: Audience): Observable<any> {
    const updateUrl = `http://localhost:8081/picosoft/api/schedule/updateAudience/${id}`;
    return this.http.put<any>(updateUrl, updatedAudience);
  }
  getFilteredAppointmentsByLocation(location: string): Observable<Audience[]> {
    const apiUrl = `http://localhost:8081/picosoft/api/schedule/AudienceByLocation/${location}`;
    return this.http.get<Audience[]>(apiUrl);
  }
  getResources(): Resource[] {
    return resources;
  }
  getFilteredAppointmentsByRoom(room: string): Observable<Audience[]> {
    const apiUrl = `http://localhost:8081/picosoft/api/schedule/AudienceByRoom/${room}`;
    return this.http.get<Audience[]>(apiUrl);
  }
  
// crud tribunal

private apiUrlTribunal = 'http://localhost:8081/picosoft/api/tribunal/listTribunal';
private addapiTribunal="http://localhost:8081/picosoft/api/tribunal/addTribunal"
getTribunalList(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrlTribunal); 
}


addTribunal(newTribunal: any): Observable<any> {
  console.log("service add tribunal"+newTribunal.text);
  return this.http.post<any>(this.addapiTribunal, newTribunal);
}

}
export class Resource {
  text: string;

  id: number;

  color: string;
}
const resources: Resource[] = [
  {
    text: 'Room 401',
    id: 1,
    color: '#bbd806',
  }, {
    text: 'Room 402',
    id: 2,
    color: '#f34c8a',
  }, {
    text: 'Room 403',
    id: 3,
    color: '#ae7fcc',
  }, {
    text: 'Room 407',
    id: 4,
    color: '#ff8817',
  }, {
    text: 'Room 409',
    id: 5,
    color: '#03bb92',
  },
];
 