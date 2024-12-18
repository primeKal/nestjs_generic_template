import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Generic Service Template')
    .setDescription('this is a backend server for a generic service')
    .setVersion('1.0')
    .build();

const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

await app.listen(process.env.PORT || 3000);
}
bootstrap();
