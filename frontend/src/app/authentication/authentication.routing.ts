import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Routes } from '@angular/router';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        redirectTo: 'entrar',
        pathMatch: 'full',
      },
      {
        path: 'registrar',
        component: RegisterComponent,
      },
      {
        path: 'entrar',
        component: LoginComponent,
      },
    ],
  },
];
