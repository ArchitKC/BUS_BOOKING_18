import { Component, inject, Injectable } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { MasterService } from './pages/service/master.service';
import { FormsModule } from '@angular/forms';  
import { BehaviorSubject } from 'rxjs';
import { UserDataService } from './pages/service/user-data.service';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
}) 
export class AppComponent {
  title = 'Bus_Booking_18';
  isLoggedIn: boolean = true;

  private loggedInUserSubject = new BehaviorSubject<any | undefined>(undefined);
  masterSvc = inject(MasterService);

  loggedInUserData:any;
  registerObj:any={
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "role": "",
    "createdDate":  new Date(),
    "password": "",
    "projectName": "",
    "refreshToken": "",
    "refreshTokenExpiryTime": new Date()
  }

  userSignIn: any={
    "userName":"",
    "password":""
  }

  isBrowser: boolean = false;


  constructor(private userScv: UserDataService){ 
    this.loggedInUserData = this.userScv.getLoggedInUser();

    this.userScv.loggedInUser$.subscribe((res =>{
      this.loggedInUserData  = res;
    }))
  }

  closeModal(){
    const model = document.getElementById("myModal");
    if(model != null)
      model.style.display = 'none';
  }

  openModel(){
    const model = document.getElementById("myModal");
    if(model != null)
      model.style.display = 'block';
  }

  logoff(){
    this.userScv.clearUser();
    this.loggedInUserData = undefined;
  }

  onRegister(){
    this.masterSvc.registerUser(this.registerObj).subscribe((res:any)=>{
      alert("register successfully");
      this.userScv.setLoggedInUser(res);
      this.loggedInUserData =  res;
      this.closeModal()
    },error=>{
      alert(JSON.stringify(error))
    })
  }

  userLogin(){
    this.masterSvc.userSignIn(this.userSignIn).subscribe((res:any)=>{
      if(res.result){
        this.userScv.setLoggedInUser(res);
        this.closeModal();
      }else{
        alert("Incorrect password");
      }
    },error=>{
      alert(JSON.stringify(error));
    })
  }
}
