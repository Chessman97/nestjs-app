import { IHelmetConfiguration } from 'helmet';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CompressionMiddleware } from './common/middlewares/compression.middleware';
import { HelmetMiddleware } from './common/middlewares/helmet.middleware';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { LoggerModule } from './logger/logger.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

const allRoutes = {
    method: RequestMethod.ALL,
    path: '*',
};

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        SequelizeModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                const sequelizeOrmConfig = config.get('database');
                sequelizeOrmConfig.config.models.push(UserEntity);
                return sequelizeOrmConfig.config;
            },
            inject: [ConfigService],
        }),
        UserModule,
        LoggerModule,
    ],
    controllers: [],
    providers: [],
})
export class ApplicationModule implements NestModule {
    public static helmetOptions: IHelmetConfiguration = {
        hsts: {
            maxAge: 31536000,
            includeSubdomains: true,
        },
        noCache: true,
    };

    public constructor(private readonly sequelize: Sequelize) {}
    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(LoggerMiddleware)
            .with('IncomingRequest')
            .forRoutes(allRoutes)
            .apply(HelmetMiddleware)
            .with(ApplicationModule.helmetOptions)
            .forRoutes(allRoutes)
            .apply(CompressionMiddleware)
            .forRoutes(allRoutes);
    }

}
