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

  getScheduleById(id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURl}GetBusScheduleById?id=${id}`);
  }

  getBookedSeats(id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURl}getBookedSeats?shceduleId=${id}`);
  }

  registerUser(userData:any):Observable<any[]>{
    return this.http.post<any[]>(this.apiURl+"AddNewUser", userData);
  }

  onBookingTicket(bookingData:any):Observable<any[]>{
    return this.http.post<any[]>(this.apiURl + "PostBusBooking", bookingData);
  }

  userSignIn(userLoginData:any){
    return this.http.post<any[]>(this.apiURl + "login", userLoginData);
  }
}
