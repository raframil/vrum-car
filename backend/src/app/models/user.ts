import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  OneToOne,
} from "typeorm";
import bcrypt from "bcrypt";
import { Address } from "cluster";
import Vehicle from "./vehicle";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @Column()
  public vehicle_id?: string | null;

  @OneToOne(() => Vehicle)
  @JoinColumn({ name: "vehicle_id" })
  public vehicle: Vehicle;
}
