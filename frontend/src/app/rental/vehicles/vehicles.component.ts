import { AuthService } from './../../authentication/services/AuthService';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { Vehicle } from '../models/vehicle.model';
import { VehiclesService } from '../services/vehicles.service';
import { MatDialog } from '@angular/material/dialog';
import { ShareVehicleComponent } from './share-vehicle/share-vehicle.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] | undefined;
  loadingVehicles = false;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private vehiclesService: VehiclesService,
    private toastr: ToastrService
  ) {
    this.list();
  }

  ngOnInit(): void {}

  isRentedByMe(vehicle: Vehicle) {
    const currentUser = this.authService.currentUserValue;

    if (vehicle.user?.id === currentUser.user.id) {
      return true;
    }

    return false;
  }

  list() {
    this.loadingVehicles = true;
    this.vehiclesService
      .list()
      .subscribe((res) => {
        this.vehicles = res;
        console.log(res);
      })
      .add(() => {
        this.loadingVehicles = false;
      });
  }

  share(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(ShareVehicleComponent, {
      maxWidth: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const url = `https://wa.me/55${result.number}?text=Estou%20interessado%20neste%20${vehicle.brand}-${vehicle.model},%20acha%20bom%20negócio?`;
      window.open(url, '_blank');
    });
  }

  return(vehicle: Vehicle) {
    const message = `Você tem certeza que deseja devolver ${vehicle.model} - ${vehicle.brand}?`;
    const dialogData = new ConfirmDialogModel('Confirmar devolução', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehiclesService.returnVehicle(vehicle.id).subscribe(
          (res) => {
            this.toastr.success('Veículo devolvido', 'Obrigado!');
            this.list();
          },
          (error) => {
            this.toastr.error(error.error.message, 'Opa...');
            this.list();
          }
        );
      }
    });
  }

  rent(vehicle: Vehicle) {
    const message = `Você tem certeza que deseja alugar ${vehicle.model} - ${vehicle.brand}?`;
    const dialogData = new ConfirmDialogModel('Confirmar aluguel', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehiclesService.rentVehicle(vehicle.id).subscribe(
          (res) => {
            this.toastr.success('Veículo alugado', 'Parabéns!');
            this.list();
          },
          (error) => {
            this.toastr.error(error.error.message, 'Opa...');
            this.list();
          }
        );
      }
    });
  }
}
