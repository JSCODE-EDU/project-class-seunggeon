import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postsService.create(createPostDto);
    return post;
  }

  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    return posts;
  }

  @Get(':id')
  async findOne(@Param('id') postId: number) {
    const post = await this.postsService.findOne(postId);
    return post;
  }

  @Put(':id')
  async update(@Param('id') postId: number, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postsService.update(postId, updatePostDto);
    return post;
  }

  @Delete(':id')
  async remove(@Param('id') postId: number) {
    await this.postsService.remove(postId);
    return { message: `Post ${postId} has been deleted` };
  }
}
