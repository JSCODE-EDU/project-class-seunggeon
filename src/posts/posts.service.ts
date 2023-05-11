import { Injectable  } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from '../../models/entities/Posts';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<Posts[]> {
    const posts = await this.postsRepository.find();
    return posts;
  }

  async findOne(postId: number): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where : { postId }
    });
    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<Posts> {
    const newPost = this.postsRepository.create(createPostDto);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async update(postId: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    const updatePost = this.postsRepository.create(updatePostDto);
    await this.postsRepository.update(
      postId, updatePost
    );
    return updatePost;
  }

  async remove(postId: number): Promise<void> {
    await this.postsRepository.delete(
      postId
    );
  }
}
