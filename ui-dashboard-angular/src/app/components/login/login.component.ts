import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: any;
  private isSubmitting: boolean;
  private user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.user = new User;
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    const formValues = this.loginForm.value;
    if (formValues.username && formValues.password) {
      console.log('press');
      // Use authentication service to do a login
      // The token will be saved by the authentication service
      this.authService.login({
        username: formValues.username,
        password: formValues.password
      }).subscribe(
        (result) => {
          this.user = result;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // TODO: show an error message
          console.log(error);
        }
      );
    }
  }
}
