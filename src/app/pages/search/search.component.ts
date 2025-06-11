import { Observable } from 'rxjs';
import { MasterService } from './../service/master.service';
import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule, DatePipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent { 

  locations$: Observable<any[]> = new Observable<any[]>
  masterSrv = inject(MasterService);
  searchObj: any={
    fromLocation: '',
    toLocation: '',
    travelDate: ''
  }
  busList:any[]=[];

  ngOnInit(): void {
    this.getAllLocations();
    
  }

  getAllLocations(){
    this.locations$ = this.masterSrv.getLocation();
  }

  onSearch(){
    const {fromLocation, toLocation, travelDate} = this.searchObj;
    this.masterSrv.searchBus(this.searchObj.fromLocation, 
      this.searchObj.toLocation, 
      this.searchObj.travelDate).subscribe((res:any)=>{
        this.busList = res;
        if(this.busList.length == 0){
          alert("There is no bus plying on this route for the given day");
        }
    })
  }

}
