import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Feedback {
  constructor(values?: Partial<Feedback>) {
    if (values) {
      Object.assign(this, values);
    }
  }

  @PrimaryKey()
  @Field(() => String)
  id: string = crypto.randomUUID();

  @Field(() => User)
  @ManyToOne()
  user!: User;

  @Field(() => String)
  @Property()
  message!: string;

  @Field(() => Date)
  @Property()
  created: Date = new Date();
}
