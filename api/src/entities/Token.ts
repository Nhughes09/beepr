import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { v4 } from "uuid";
import { User } from "./User";

@ObjectType()
@Entity()
export class Token {

  @PrimaryKey()
  @Field()
  id: string = v4();

  @Field()
  @Property()
  tokenid: string = v4();

  @Field(() => User)
  @ManyToOne(() => User)
  user!: User;

  constructor(u: User) {
    this.user = u;
  }
}
