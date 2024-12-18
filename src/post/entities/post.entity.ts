import { BaseEntity } from "src/generic/entity/base.entity";
import { Entity } from "typeorm";

@Entity("Post")
export class Post extends BaseEntity<Post> {
    // add any columns you want here
    
}
