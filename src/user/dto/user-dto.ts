import { Expose } from 'class-transformer';

import { ApiModelProperty } from '@nestjs/swagger';

import { UserEntity } from '../user.entity';

export class UserDto {

    @Expose()
    @ApiModelProperty()
    public id: number;

    @Expose()
    @ApiModelProperty()
    public readonly email: string;

    @Expose()
    @ApiModelProperty()
    public readonly phone: string;

    @Expose()
    @ApiModelProperty()
    public readonly isActive: boolean;

    @Expose()
    @ApiModelProperty()
    public readonly createdAt: Date;

    @Expose()
    @ApiModelProperty()
    public readonly updatedAt: Date;

    public constructor(user: UserEntity) {
        this.id = user.id;
        this.email = user.email;
        this.phone = user.phone;
        this.isActive = user.isActive;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
