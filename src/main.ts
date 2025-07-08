import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  app.enableCors({
    origin: 'http://localhost:3000', // allow frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true, // if you're using cookies or auth headers
  });

  const firebaseConfig = configService.get<Record<string, string>>('firebase');
  if (!firebaseConfig) {
    throw new Error('Firebase configuration is missing');
  }
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });

  app.setGlobalPrefix('api/v1');

  // admin api documentation
  const adminConfig = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin api documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const allDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [AppModule],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('admin/docs', app, allDocument, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });
  await app.listen(process.env.PORT ?? 9200);
}
export default bootstrap();
