import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiURl: string = 'https://api.freeprojectapi.com/api/BusBooking/';


  constructor(private http: HttpClient) { }
  
  getLocation():Observable<any[]>{
    return this.http.get<any[]>(this.apiURl+"GetBusLocations");
  }

  searchBus(fromLocation: number, toLocation: number, travelDate: string):Observable<any[]>{
    //return this.http.get<any[]>(this.apiURl+"searchBus?fromLocation="+fromLocation+"&toLocation="+toLocation+"&travelDate="+travelDate);
    return this.http.get<any[]>(`${this.apiURl}searchBus?fromLocation=${fromLocation}&toLocation=${toLocation}&travelDate=${travelDate}`)
  }
}
