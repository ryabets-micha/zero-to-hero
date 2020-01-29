import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmCoreModule} from '@nestjs/typeorm/dist/typeorm-core.module';
import {typeOrmConfig} from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmCoreModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule
  ],
  controllers: []
})
export class AppModule {}
