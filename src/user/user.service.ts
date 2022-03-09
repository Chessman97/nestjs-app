import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { WhereOptions } from 'sequelize/types';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectModel } from '@nestjs/sequelize';

import auth from '../config/auth';
import {
    CreateUserDto, FiltrationUserDto, UpdateUserDto, UserDto, UserLoginRequestDto
} from './dto';
import { UserLoginResponseDto } from './dto/user-login-response-dto';
import { UserEntity } from './user.entity';
import { UserRO } from './user.interface';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    public constructor(
        @InjectModel(UserEntity)
        private readonly userModel: typeof UserEntity
    ) {}

    public async findAll(query: FiltrationUserDto): Promise<UserDto[]> {
        const skip = query.skip || 0;
        const take = query.take || 10;
        const whereOptions: WhereOptions = { };
        if (query.email) {
            whereOptions.email = query.email;
        }
        if (query.phone) {
            whereOptions.phone = query.phone;
        }
        const users = await this.userModel.findAll({
            where: whereOptions,
            offset: skip,
            limit: take,
        });
        return users.map(user => new UserDto(user));
    }

    public async findOne(userLoginDto: UserLoginRequestDto): Promise<UserEntity> {
        let findOneOptions;
        if (userLoginDto.email) {
            findOneOptions = {
                where: {
                    email: userLoginDto.email,
                    password: crypto.createHmac('sha256', userLoginDto.password).digest('hex'),
                },
            };
        } else {
            findOneOptions = {
                where: {
                    phone: userLoginDto.phone,
                    password: crypto.createHmac('sha256', userLoginDto.password).digest('hex'),
                },
            };
        }
        return this.userModel.findOne(findOneOptions);
    }

    public async login(userLoginDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
        if (!userLoginDto.email && !userLoginDto.phone) {
            throw new HttpException('Email and phone is empty.', HttpStatus.BAD_REQUEST);
        }
        const user = await this.findOne(userLoginDto);

        if (!user) {
            throw new HttpException('Invalid credentials.', 401);
        }

        const token = this.generateJWT(user);
        const userResponse = new UserLoginResponseDto(user, token);
        return userResponse;
    }

    public async create(createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
        const findOneOptions = {
            where: {
                email: createUserDto.email,
            },
        };
        const userExist = await this.userModel.findOne(findOneOptions);
        if (userExist) {
            throw new HttpException('User already exists.', HttpStatus.CONFLICT);
        }
        const user = new UserEntity();
        user.email = createUserDto.email;
        user.phone = createUserDto.phone;
        user.password = createUserDto.password;
        user.isActive = true;
        const now = new Date();
        user.createdAt = now;
        user.updatedAt = now;

        const userData = await user.save();

        const token = this.generateJWT(userData);
        return new UserLoginResponseDto(userData, token);
    }

    public async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
        const user = await this.userModel.findByPk<UserEntity>(id);
        if (!user) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }

        user.email = updateUserDto.email || user.email;
        user.phone = updateUserDto.phone || user.phone;
        user.password = updateUserDto.password || user.password;

        try {
            const data = await user.save();
            return new UserDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async delete(id: number): Promise<UserDto> {
        const user = await this.userModel.findByPk<UserEntity>(id);
        await user.destroy();
        return new UserDto(user);
    }

    public async findById(id: number): Promise<UserRO> {
        const user = await this.userModel.findOne({ where: { id } });

        if (!user) {
            const errors = { User: ' not found' };
            throw new HttpException({ errors }, 401);
        }

        return this.buildUserRO(user);
    }

    public async findMe(id: number): Promise<UserDto> {
        const user = await this.userModel.findByPk<UserEntity>(id);
        return new UserDto(user);
    }

    public generateJWT(user: UserEntity): string {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        return jwt.sign({
            id: user.id,
            email: user.email,
            exp: exp.getTime() / 1000,
        }, auth.secret);
    }

    private buildUserRO(user: UserEntity): UserRO {
        const userRO = {
            id: user.id,
            phone: user.phone,
            email: user.email,
            token: this.generateJWT(user),
        };
        return { user: userRO };
    }
}
