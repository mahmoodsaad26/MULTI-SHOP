import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router) { }

  errMsg: string = ''


  registerForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{6,}$/)]],
    rePassword: [''],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators: [this.confirmPassword] } as FormControlOptions)

  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword')
    if (rePassword?.value == '') {
      rePassword.setErrors({ required: true })
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true })
    }
  }

  handleRegister(): void {
    if (this.registerForm.valid == true) {
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('res', res);

          this._Router.navigate(['/login'])

        },
        error: (err) => {
          console.log('err', err);
          this.errMsg=err.error.message;
          

        }
      })
    }
    console.log('form', this.registerForm);

  }

}
