import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { S3Module } from './s3/s3.module';
import { FileLinksModule } from './file-links/file-links.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule,
    UsersModule,
    AuthModule,
    FilesModule,
    S3Module,
    FileLinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
