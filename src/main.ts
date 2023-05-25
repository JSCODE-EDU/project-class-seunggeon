import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('posts')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // end-point path
  app.use('/docs', express.static(path.join(__dirname, 'swagger-ui')));
  app.use('/docs/swagger.json', (req, res) => {
    res.json(document);
  });
  
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  console.log(`listening on port ${port}`);
}
bootstrap();
