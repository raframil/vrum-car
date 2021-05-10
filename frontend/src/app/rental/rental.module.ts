import { ConfirmDialogComponent } from '../core/components/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { RentalRoutes } from './rental.routing';
import { ShareVehicleComponent } from './vehicles/share-vehicle/share-vehicle.component';

@NgModule({
  declarations: [
    VehiclesComponent,
    NavigationComponent,
    ConfirmDialogComponent,
    ShareVehicleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RentalRoutes),
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
export class RentalModule {}
