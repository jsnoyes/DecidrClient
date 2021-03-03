import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<UserModel | undefined>(undefined);
  public User = this.user.asObservable();
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.urls.api + 'user';
  }

  // LoadLogged in User
  public LoadUser(): void{
    this.httpClient.get<UserModel>(this.apiUrl, {withCredentials: true})
      .subscribe(u => this.user.next(u === null ? undefined : u));
  }

  // Logout
  public Logout(): void{
    this.httpClient.post(this.apiUrl + '/logout', null, {withCredentials: true})
      .subscribe(() => this.user.next(undefined));
  }

  // Login
  public Login(username: string): void{
    this.httpClient.post<UserModel>(this.apiUrl + '/login/' + username, null, {withCredentials: true})
      .subscribe((user) => this.user.next(user));
  }
}
