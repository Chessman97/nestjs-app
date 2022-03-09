import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './app.module';
import { LoggerTransport } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { setupSwagger } from './swagger';

async function bootstrap(): Promise<void> {
    const appOptions = { cors: true, logger: new LoggerService('debug', 'Logger', [LoggerTransport.CONSOLE]) };
    const app = await NestFactory.create(ApplicationModule, appOptions);
    app.setGlobalPrefix('api');

    // const options = new DocumentBuilder()
    //     .setTitle('NestJS App')
    //     .setDescription('API description')
    //     .setVersion('0.1.0')
    //     .setBasePath('api')
    //     .addBearerAuth()
    //     .build();
    // const document = SwaggerModule.createDocument(app, options);
    // SwaggerModule.setup('/docs', app, document);
    setupSwagger(app);

    await app.listen(3000);
}
bootstrap();
