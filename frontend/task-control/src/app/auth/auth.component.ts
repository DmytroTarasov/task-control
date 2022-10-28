import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  authForm!: UntypedFormGroup;
  error: string = '';
  registerMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, [
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
        this.router.navigate(['/boards']);
      },
      error: (error: Error) => {
        this.error = error.message;
      },
    });
  }

  private handleUsernameControl() {
    if (!this.isLoginMode) {
      this.authForm.addControl(
        'username',
        new UntypedFormControl(null, [Validators.required])
      );
    } else {
      this.authForm.removeControl('username');
    }
  }
}
