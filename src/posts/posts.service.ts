import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from '../../models/entities/Posts';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<Posts[]> {
    const posts = await this.postsRepository
    .find({
      order: {
        createdAt: 'DESC'
      },
      take : 100
    });
    return posts;
  }

  async findOne(postId: number): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where : { postId }
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found.`);
    }
    return post;
  }
  
  async createPost(createPostDto: CreatePostDto): Promise<Posts> {
    const newPost = this.postsRepository.create(createPostDto);
    try {
      await this.postsRepository.save(newPost);
      return newPost;
    } catch (error) {
      throw new NotFoundException('Failed to create post');
    }
  }

  async updatePost(
    postId: number,
    updatePostDto: UpdatePostDto
  ): Promise<Posts> {
    const updateResult: UpdateResult = await this.postsRepository.update(
      postId,
      updatePostDto
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    const updatedPost: Posts = await this.postsRepository.findOne({
      where : { postId }
    });
    return updatedPost;
  }

  async remove(postId: number): Promise<void> {
    await this.postsRepository.delete(
      postId
    );
  }

  async searchById(word: string): Promise<Posts[]> {
    return await this.postsRepository
    .createQueryBuilder('posts')
    .where('posts.title LIKE :query', {
      query: `%${word}%`
    })
    .take(100) // 최대 100개까지 조회
    .orderBy('posts.createdAt', 'DESC')
    .getMany();
  }
}