import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Posts } from "models/entities/Posts";

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
