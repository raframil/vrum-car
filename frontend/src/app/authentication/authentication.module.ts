import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { AuthenticationRoutes } from './authentication.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, NavigationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 5000,
      closeButton: true,
    }),
  ],
})
export class AuthenticationModule {}
