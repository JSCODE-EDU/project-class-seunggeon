import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { PostsService } from './posts.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: 'The created post', type: Post })
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postsService.createPost(createPostDto);
    return post;
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiResponse({ status: 200, description: 'The list of posts', type: [Post] })
  async findAll() {
    const posts = await this.postsService.findAll();
    return posts;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'The post', type: Post })
  async findOne(@Param('id') postId: number) {
    const post = await this.postsService.findOne(postId);
    return post;
  }

  @Get('search/:keyword')
  @ApiOperation({ summary: 'search a post title by keyword' })
  @ApiParam({ name: 'keyword', type: 'string' })
  @ApiResponse({ status: 200, description: 'Search By keyword', type: Post })
  async searchById(@Param('keyword') searchPostDto: SearchPostDto) {
    const post = await this.postsService.searchById(searchPostDto);
    return post;
  }
  
  @Put(':id')
  @ApiOperation({ summary: 'search a post title by keyword' })
  @ApiParam({ name: 'id', type: 'int' })
  @ApiResponse({ status: 200, description: 'Search By keyword', type: Post })
  async update(@Param('id') postId: number, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postsService.updatePost(postId, updatePostDto);
    return post;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete post by id' })
  @ApiParam({ name: 'id', type: 'int' })
  @ApiResponse({ status: 200, description: 'Search By keyword', type: Post })
  async remove(@Param('id') postId: number) {
    await this.postsService.remove(postId);
    return { message: `Post ${postId} has been deleted` };
  }
}
