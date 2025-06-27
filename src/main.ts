import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const firebaseConfig = configService.get<Record<string, string>>('firebase');
  if (!firebaseConfig) {
    throw new Error('Firebase configuration is missing');
  }
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });

  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 9200);
}
export default bootstrap();
