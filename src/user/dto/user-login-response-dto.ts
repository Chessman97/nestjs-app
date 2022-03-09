import { ApiModelProperty } from '@nestjs/swagger';

import { UserEntity } from '../user.entity';
import { UserDto } from './user-dto';

export class UserLoginResponseDto extends UserDto {
    @ApiModelProperty()
    public readonly token: string;

    public constructor(user: UserEntity, token?: string) {
        super(user);
        this.token = token;
    }
}
