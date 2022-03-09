import { Module } from '@nestjs/common';

import { LoggerTransport } from '../logger/logger.interface';
import { LoggerService } from '../logger/logger.service';

@Module({
    providers: [
        {
            provide: LoggerService,
            useFactory: () => {
                return new LoggerService('debug', 'Logger', [LoggerTransport.CONSOLE]);
            },
        },
    ],
    exports: [LoggerService],
})
export class LoggerModule {
}
