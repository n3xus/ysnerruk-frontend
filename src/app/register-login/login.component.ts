import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;
  private returnUrl = '';

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      if (params.returnUrl) {
        console.log(params.returnUrl);
        this.returnUrl = params.returnUrl;
      }

    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  login() {
    const val = this.loginForm.value;

    if (val.username && val.password) {
      this.isLoading = true;

      this.authService.login(val.username, val.password)
        .subscribe(
          resp => {
            console.log(resp);
            this.router.navigate([this.returnUrl]);
          },
          err => {
            this.isLoading = false;
            const error = JSON.parse(err.error);
            const errorMsg = error.message;
            this.snackBar.open(errorMsg, 'Dismiss', {duration: 6000});
          }, () => {
            this.isLoading = false;
          }
        );
    }
  }
}
