import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { UserEntity } from '../entities';

const USER_ID_COLUMN_NAME = 'id';

@Entity({ name: 'password_vault' })
export class PasswordVaultEntity {
  @Column()
  @PrimaryColumn({
    name: USER_ID_COLUMN_NAME,
    primaryKeyConstraintName: 'UQ_password_vault_user_id',
  })
  id!: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: USER_ID_COLUMN_NAME,
    foreignKeyConstraintName: 'FK_password_vault_to_user',
  })
  user!: UserEntity;

  @Column('text')
  passwordHash!: string;
}
