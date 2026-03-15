import { Permission } from 'src/entities/permission.entity';
import { User } from 'src/entities/user.entity';
import { RoleName } from 'src/types/role';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    unique: true,
    type: 'enum',
    enum: RoleName,
    default: RoleName.VIEWER,
  })
  name: RoleName;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];
}
