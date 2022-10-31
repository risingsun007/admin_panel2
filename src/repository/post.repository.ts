import { EntityRepository, Repository } from "typeorm";
import { PostEntity, PostEntity2 } from "../database/entities/post.entity";

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
}

@EntityRepository(PostEntity2)
export class PostRepository2 extends Repository<PostEntity2> {
}