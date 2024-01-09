import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { v4 } from "uuid";
import { User } from "./User";

@ObjectType()
@Entity()
export class ForgotPassword {
  @PrimaryKey()
  @Field()
  id: string = v4();

  @Field(() => User)
  @ManyToOne(() => User)
  user!: User;

  @Field()
  @Property()
  time: Date = new Date();

  constructor(u: User) {
    this.user = u;
  }
}
