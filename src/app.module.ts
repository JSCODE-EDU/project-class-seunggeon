import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "models/entities/Posts";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true
      }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      // host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      // username: 'root',
      password: process.env.DB_PASSWORD,
      // password: '970412',
      database: process.env.DB_DATABASE,
      // database: 'JSCODE_DB',
      entities: [
        Posts
      ],
      autoLoadEntities: true,
      keepConnectionAlive: true,
  }),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
