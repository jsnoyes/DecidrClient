import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UserModel | undefined;
  public usernameToLogin = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.User.subscribe(u => this.user = u);
  }

  public Login(): void{
    this.userService.Login(this.usernameToLogin);
  }
}
