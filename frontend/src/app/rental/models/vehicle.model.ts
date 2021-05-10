import { User } from 'src/app/core/models/user.model';

export interface Vehicle {
  id: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  vehicle_type: string;
  plate_number: string;
  mileage: number;
  image: string;
  user: User;
}
