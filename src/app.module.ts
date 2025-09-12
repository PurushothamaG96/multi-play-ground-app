import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import envConfiguration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { ParentStudentModule } from './modules/parent-student/parent-student.module';
import { UserModule } from './modules/user/user.module';
import { TeachersModule } from './modules/teachers/teachers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.production'],
      load: [envConfiguration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // ssl: {
      //   rejectUnauthorized: false,
      // },

      ssl:
        process.env.DATABASE_SSL === 'true'
          ? { rejectUnauthorized: false }
          : false,
      entities: [__dirname + '/entity/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    ParentStudentModule,
    UserModule,
    TeachersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
