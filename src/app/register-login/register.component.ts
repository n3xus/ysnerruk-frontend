import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  registerForm: FormGroup;


  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
            ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    });

  }

  get form() {
    return this.registerForm.controls;
  }

  register() {
    if (this.form.username.value.length < 4) {
      this.snackBar.open('Username should be 4 characters', 'Dismiss', {duration: 2000});
      return;
    }
    if (this.form.password.value !== this.form.passwordRepeat.value) {
      this.snackBar.open('Passwords don\'t match', 'Dismiss', {duration: 2000});
      return;
    }
    if (this.form.password.value.length === 0) {
      this.snackBar.open('Please enter a password', 'Dismiss', {duration: 2000});
      return;
    }
    this.isLoading = true;
    this.authService.register(
      this.form.username.value,
      this.form.email.value,
      this.form.password.value,
    ).subscribe(resp => {
        this.isLoading = false;
        console.log(resp);
        this.router.navigate(['/trade']);
      },
      err => {
        this.isLoading = false;
        console.log(err);
        const errorMsg = err.error.message;
        this.snackBar.open(errorMsg, 'Dismiss', {duration: 6000});
      });
  }
}
