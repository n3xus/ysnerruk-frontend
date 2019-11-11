import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private auth: AuthService) { }

  loggedIn() {
    return this.auth.isLoggedIn();
  }

  ngOnInit() {
  }

}
