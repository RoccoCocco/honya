import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User, UserStatusEnum, UserRoleEnum } from '../../../core';

@Entity({ name: 'users' })
@Unique('UQ_user_username', ['username'])
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
  id!: string;

  @Column('text')
  username!: string;

  @Column('text', { name: 'first_name' })
  firstName!: string;

  @Column('text', { name: 'last_name' })
  lastName!: string;

  @Column({ enum: UserRoleEnum })
  role!: UserRoleEnum;

  @Column({ enum: UserStatusEnum })
  status!: UserStatusEnum;
}
