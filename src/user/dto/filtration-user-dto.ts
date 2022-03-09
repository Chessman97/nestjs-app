import {
    IsEmail, IsInt, IsOptional, IsPhoneNumber, IsString, Max, Min, ValidateIf
} from 'class-validator';

import { ApiModelProperty } from '@nestjs/swagger';

export class FiltrationUserDto {

    @ApiModelProperty()
    @IsPhoneNumber('ZZ')
    @IsOptional()
    public readonly phone: string;

    @ApiModelProperty()
    @IsEmail()
    @IsOptional()
    public readonly email: string;

    @ApiModelProperty({ example: 0 })
    @ValidateIf((o, v) => v !== undefined) @IsInt() @Min(1) @Max(2147483647)
    public skip: number;

    @ApiModelProperty({ example: 10 })
    @ValidateIf((o, v) => v !== undefined) @IsInt() @Min(1) @Max(2147483647)
    public take: number;
}
