import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.loading = true;
      const name = this.form.get('name')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      this.authService
        .register(name, email, password)
        .subscribe(
          () => {
            this.toastr.success('Registro realizado', 'Sucesso');
            this.router.navigate(['/entrar']);
          },
          (error) => {
            console.error(error);
            if (error.status === 409) {
              this.toastr.warning('E-mail em uso', 'Atenção');
            } else {
              this.toastr.error('Erro ao realizar o cadastro', 'Erro');
            }
          }
        )
        .add(() => {
          this.loading = false;
        });
    }
  }
}
