import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GenericService } from 'src/generic/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService extends GenericService<Post> {
  constructor(
    @InjectRepository(Post)
    protected repository: Repository<Post>,
  ) {
    super(repository);
  }
}
