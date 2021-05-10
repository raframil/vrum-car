import { VehiclesComponent } from './vehicles/vehicles.component';
import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

export const RentalRoutes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: VehiclesComponent,
      },
    ],
  },
];
