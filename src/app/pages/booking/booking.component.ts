import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../service/master.service';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  scheduledId: number = -1;
  scheduledData:any;

  seatArray:number[]=[];
  bookedSeatsArray:number[]=[];
  userSelectedSeats:any[]=[];
  loggedInUserData:any;


  constructor(private activatedRoute: ActivatedRoute,
    private mastersvc: MasterService,
    private userDataSvc: UserDataService
  ){
    this.activatedRoute.params.subscribe((res:any)=>{
      this.scheduledId = res.id;
      this.getScheduledDetailById();
      this.getBookedSeats();
    })
    this.loggedInUserData = userDataSvc.getLoggedInUser();
  }

  getScheduledDetailById(){
    this.mastersvc.getScheduleById(this.scheduledId).subscribe((res:any)=>{
      this.scheduledData = res;
      for (let index = 1; index < this.scheduledData.totalSeats; index++) {
        this.seatArray.push(index);
      }
    })
  }

  getBookedSeats(){
    this.mastersvc.getBookedSeats(this.scheduledId).subscribe((res:any)=>{
      this.bookedSeatsArray = res;
    })
  }

  checkedIfBookedSeat(seatNo:number){
    return this.bookedSeatsArray.indexOf(seatNo);
  }
  
  checkIsSeatSelected(seatNo:number){
    return this.userSelectedSeats.findIndex(m=>m.seatNo == seatNo);
  }

  selectSeat(seatNo: number) {
    const obj = {
      "passengerId": 0,
      "bookingId": 0,
      "passengerName": "",
      "age": 0,
      "gender": "",
      "seatNo": 0
    }
    const exists = this.userSelectedSeats.some(seat=>seat.seatNo === seatNo);
    if(exists){
      alert("Seat already selected")
    }else{
      obj.seatNo = seatNo;
      this.userSelectedSeats.push(obj)
    }
  }

  bookNow(){
    if(this.userSelectedSeats.length ===0){
      alert('Please Select seats and provide passenger details');
    }else{
      if(this.loggedInUserData != null|| this.loggedInUserData == undefined){
        this.loggedInUserData = this.userDataSvc.getLoggedInUser();
        const obj = {
          "bookingId": 0,
          "custId": this.loggedInUserData.userId,
          "bookingDate": new Date(),
          "scheduleId": this.scheduledId,
          "BusBookingPassengers": this.userSelectedSeats
        }
        this.mastersvc.onBookingTicket(obj).subscribe(()=>{
          alert("Booking success");
        },error=>{
          alert(error)
        })
      }else{
        alert("Please Login ")
      }
    }
  }
}

