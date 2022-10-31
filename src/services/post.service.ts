import { getConnection, SimpleConsoleLogger } from 'typeorm';
import { PostEntity, PostEntity2 } from '../database/entities/post.entity';
import { PostRepository, PostRepository2 } from './../repository/post.repository';

export class PostService {
  private postRepository: PostRepository;
  private postRepository2: PostRepository2;

  constructor() {
    this.postRepository = getConnection("blog").getCustomRepository(PostRepository);
    this.postRepository2 = getConnection("blog").getCustomRepository(PostRepository2);
  }

  public index = async () => {
    console.log(`index`);
    const posts = await this.postRepository.find()
    const posts2 = await this.postRepository2.find()
    console.log(`posts: ${posts} post2: ${posts2}`);
    return posts;
  }

  public index2 = async () => {
    console.log(`index`);
    const posts2 = await this.postRepository2.find();
    return posts2;
  }

  public create = async (post: PostEntity | PostEntity2) => {
  }

  public update = async (post: any, id: number) => {
    const post2 = JSON.parse(JSON.stringify(post));
    const updatedPost = await this.postRepository2.update(id, post2);
    return updatedPost;
  }

  public delete = async (id: number) => {
  }
}