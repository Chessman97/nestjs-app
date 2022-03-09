import { IsEmail, IsOptional, IsString } from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class UserLoginRequestDto {

    @ApiModelProperty()
    @IsEmail()
    @IsOptional()
    public readonly email: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    public readonly phone: string;

    @ApiModelProperty()
    @IsString()
    public readonly password: string;
}
