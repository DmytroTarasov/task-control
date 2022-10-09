import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  authForm!: FormGroup;
  error: string = '';
  registerMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.handleUsernameControl();
  }

  onSwitchMode() {
    this.registerMessage = '';
    this.error = '';
    this.isLoginMode = !this.isLoginMode;
    this.handleUsernameControl();
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const { email, username, password } = this.authForm.value;

    let authObservable: Observable<any>;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.register(email, username, password);
    }

    authObservable.subscribe({
      next: (responseData) => {
        if (responseData.message) {
          this.registerMessage = responseData.message;
          return;
        }

        this.authForm.reset();
        this.router.navigate(['/']);
      },
      error: (errorMessage: string) => {
        this.error = errorMessage;
      },
    });
  }

  private handleUsernameControl() {
    if (!this.isLoginMode) {
      this.authForm.addControl(
        'username',
        new FormControl(null, [Validators.required])
      );
    } else {
      this.authForm.removeControl('username');
    }
  }
}
