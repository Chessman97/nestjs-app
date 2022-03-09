import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiModelProperty()
    @IsPhoneNumber('ZZ')
    @IsOptional()
    public readonly phone: string;

    @ApiModelProperty()
    @IsEmail()
    @IsOptional()
    public readonly email: string;

    @ApiModelProperty()
    @IsString()
    public readonly password: string;
}
