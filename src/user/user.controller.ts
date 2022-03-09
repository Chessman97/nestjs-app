import { Request } from 'express';

import { Body, Controller, Delete, Get, Post, Put, Query, Req, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitQuery, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import {
    CreateUserDto, FiltrationUserDto, UpdateUserDto, UserDto, UserLoginRequestDto,
    UserLoginResponseDto
} from './dto';
import { UserService } from './user.service';

@ApiUseTags('User')
@Controller('user')
export class UserController {

    public constructor(private readonly userService: UserService) {}

    @UsePipes(new ValidationPipe())
    @Post('register')
    @ApiOkResponse({ type: UserLoginResponseDto })
    public async register(@Body() createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
        return this.userService.create(createUserDto);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    @ApiOkResponse({ type: UserLoginResponseDto })
    public async login(@Body() userLoginDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
        return this.userService.login(userLoginDto);
    }

    @UsePipes(new ValidationPipe())
    @Put('')
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserDto })
    public update(
        @Body() updateUserDto: UpdateUserDto, @Req() request: Request
    ): Promise<UserDto> {
        return this.userService.update(request['user'].id, updateUserDto);
    }

    @Delete('')
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserDto })
    public delete(@Req() request: Request): Promise<UserDto> {
        return this.userService.delete(request['user'].id);
    }

    @Get('')
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserDto })
    public findMe(@Req() request: Request): Promise<UserDto> {
        return this.userService.findMe(request['user'].id);
    }

    @Get('/all')
    @ApiBearerAuth()
    @ApiOkResponse({ type: [UserDto] })
    public findAll(@Query() query: FiltrationUserDto): Promise<UserDto[]> {
        return this.userService.findAll(query);
    }
}
