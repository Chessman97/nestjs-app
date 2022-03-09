import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {

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
    @IsOptional()
    public readonly password: string;
}
