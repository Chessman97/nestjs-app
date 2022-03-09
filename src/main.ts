import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './app.module';
import { LoggerTransport } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { setupSwagger } from './swagger';

async function bootstrap(): Promise<void> {
    const appOptions = { cors: true, logger: new LoggerService('debug', 'Logger', [LoggerTransport.CONSOLE]) };
    const app = await NestFactory.create(ApplicationModule, appOptions);
    app.setGlobalPrefix('api');
    setupSwagger(app);

    await app.listen(3000);
}
bootstrap();
