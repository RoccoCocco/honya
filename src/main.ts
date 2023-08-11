import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { promises } from 'fs';

import { AppModule } from '@/app.module';
import { USER_AUTHENTICATION } from '@/http';

async function bootstrap() {
  const packageJson = await promises.readFile('./package.json');
  const { version } = JSON.parse(packageJson.toString());

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth({ type: 'http' }, USER_AUTHENTICATION)
    .setTitle('Book management')
    .setVersion(version ?? 'unknown')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
