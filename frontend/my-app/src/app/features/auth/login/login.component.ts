import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.services';
// import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string = '';

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private formBuilder: FormBuilder) {
      
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.loginService.login(username, password).subscribe(
      (response) => {
        console.log(response);
        this.login(username, password);
      },
      (error) => {
        console.error(error);
        this.error = error.message;
      }
    );
  }
  
  login(username: string, password: string): void {
    this.loginService.login(username, password).subscribe(
      (response) => {
        // Login success, navigate to home page
        this.router.navigate(['/home']);
      },
      (error) => {
        // Login failed, handle error
        console.error(error);
      }
    );
  }
}


