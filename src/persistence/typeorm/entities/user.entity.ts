import { faker } from '@faker-js/faker';
import { Factory } from 'nestjs-seeder';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User, UserRoleEnum, UserStatusEnum } from '../../../core';

@Entity({ name: 'users' })
@Unique('UQ_user_username', ['username'])
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
  @Factory(() => faker.string.uuid())
  id!: string;

  @Column('text')
  @Factory(() => faker.internet.userName())
  username!: string;

  @Column('text', { name: 'first_name' })
  @Factory(() => faker.person.firstName())
  firstName!: string;

  @Column('text', { name: 'last_name' })
  @Factory(() => faker.person.lastName())
  lastName!: string;

  @Column({ enum: UserRoleEnum })
  @Factory(UserRoleEnum.Author)
  role!: UserRoleEnum;

  @Column({ enum: UserStatusEnum })
  @Factory(UserStatusEnum.Active)
  status!: UserStatusEnum;
}
