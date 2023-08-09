import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Audience } from '../pages/scheduler/Audience';
@Injectable({
  providedIn: 'root'
})
export class ServiceschedulerService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8081/picosoft/api/schedule/loadData';
  private addapi="http://localhost:8081/picosoft/api/schedule/addAudience"
  // addAudience(audienceData: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, audienceData);
  // }
  getAudienceList(): Observable<Audience[]> {
    return this.http.get<Audience[]>(this.apiUrl); // Modify the URL if required
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
}
