import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user";

@Entity("vehicles")
export default class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  year: number;

  @Column()
  color: string;

  @Column()
  vehicle_type: string;

  @Column()
  plate_number: string;

  @Column()
  mileage: number;

  @Column()
  image: string;

  @OneToOne(() => User, (user: User) => user.vehicle)
  public user: User;
}
