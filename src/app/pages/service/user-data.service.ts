import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private loggedInUserSubject = new BehaviorSubject<any | undefined>(undefined);

  get loggedInUser$(): Observable<any | undefined> {
    return this.loggedInUserSubject.asObservable();
  }

  getLoggedInUser(): any | undefined {
    return this.loggedInUserSubject.value;
  }

  setLoggedInUser(userData: any): void {
    this.loggedInUserSubject.next(userData);
  }

  clearUser(): void {
    this.loggedInUserSubject.next(undefined);
  }
}
