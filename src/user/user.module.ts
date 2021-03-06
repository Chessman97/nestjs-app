import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthMiddleware } from './auth.middleware';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports: [SequelizeModule.forFeature([UserEntity])],
    providers: [UserService],
    controllers: [
        UserController,
    ],
    exports: [UserService],
})
export class UserModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'user', method: RequestMethod.GET }, { path: 'user', method: RequestMethod.PUT },
                { path: 'user', method: RequestMethod.DELETE }
            );
    }
}
