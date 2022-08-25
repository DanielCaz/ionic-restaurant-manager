import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string;
  password: string;

  constructor() {}

  ngOnInit() {}

  login() {
    if (this.user === 'admin' && this.password === 'admin') {
      location.replace('/home');
    } else {
      alert('Invalid credentials');
    }
  }
}
