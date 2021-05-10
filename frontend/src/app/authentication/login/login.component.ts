import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.loading = true;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      this.authService
        .login(email, password)
        .subscribe(
          () => {
            this.router.navigate(['veiculos', 'home']);
          },
          (error) => {
            if (error.status === 401) {
              this.toastr.warning('E-mail ou senha inválidos', 'Atenção');
            } else {
              this.toastr.error('Erro ao efetuar o login', 'Erro');
            }
          }
        )
        .add(() => {
          this.loading = false;
        });
    }
  }
}
