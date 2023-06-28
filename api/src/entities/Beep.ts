import { Entity, Enum, Filter, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { v4 } from 'uuid';

export enum Status {
  CANCELED = "canceled",
  DENIED = "denied",
  WAITING = "waiting",
  ACCEPTED = "accepted",
  ON_THE_WAY = "on_the_way",
  HERE = "here",
  IN_PROGRESS = "in_progress",
  COMPLETE = "complete",
}

@ObjectType()
@Entity()
@Filter({
  name: 'in',
  cond: (args) => ({ $or: [{ beeper: args.id }, { rider: args.id }] })
})
@Filter({
  name: 'inProgress',
  cond: {
    $and: [
      { status: { $ne: Status.DENIED } },
      { status: { $ne: Status.COMPLETE } },
      { status: { $ne: Status.CANCELED } }, 
    ]
  }
})
export class Beep {
  constructor(values?: Partial<Beep>) {
    if (values) {
      Object.assign(this, values);
    }
  }

  @PrimaryKey()
  @Field(() => String)
  id: string = v4();

  @Field(() => User)
  @ManyToOne(() => User)
  beeper!: User;

  @Field(() => User)
  @ManyToOne(() => User)
  rider!: User;

  @Field(() => String)
  @Property()
  origin!: string;

  @Field(() => String)
  @Property()
  destination!: string;

  @Field(() => Number)
  @Property()
  groupSize!: number;

  @Field(() => Date)
  @Property()
  start!: Date;

  @Field(() => Date, { nullable: true })
  @Property({ type: 'datetime', nullable: true })
  end!: Date | null;

  @Field(() => String)
  @Enum(() => Status)
  status: Status = Status.COMPLETE;

  @Field(() => Number)
  @Property({ persist: false })
  position: number = -1;
}
