import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username = '';
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.userService.loginUser(this.username).subscribe((data: any) => {
      this.router.navigate(['/chat', data.userId]);
    })
  }

}
