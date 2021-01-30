import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<UserModel>({Id: 'test', Name: 'Jake'});
  public User = this.user.asObservable();

  constructor() { }


}
