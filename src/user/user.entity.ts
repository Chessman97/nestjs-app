import { IsEmail } from 'class-validator';
import * as crypto from 'crypto';
import {
    BeforeCreate, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt
} from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class UserEntity extends Model {

    @PrimaryKey
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    public id: number;

    @Column
    public phone: string;

    @Column
    @IsEmail()
    public email: string;

    @Column
    public password: string;

    @Column
    public isActive: boolean;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @BeforeCreate
    public static hashPassword(user: UserEntity): void {
        user.password = crypto.createHmac('sha256', user.password).digest('hex');
    }
}

