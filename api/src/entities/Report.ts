import { Entity, Filter, ManyToOne, PrimaryKey, Property, type Rel } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Beep } from "./Beep";
import { User } from "./User";

@ObjectType()
@Entity()
@Filter({ name: 'in', cond: args => ({ $or: [{ reporter: args.id }, { reported: args.id }] }) })
export class Report {

  @PrimaryKey()
  @Field(() => String)
  id: string = crypto.randomUUID();

  @Field(() => User)
  @ManyToOne(() => User)
  reporter!: Rel<User>;

  @Field(() => User)
  @ManyToOne(() => User)
  reported!: Rel<User>;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  handledBy?: Rel<User> | null;

  @Field(() => String)
  @Property()
  reason!: string;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  notes?: string;

  @Field(() => Date)
  @Property()
  timestamp: Date;

  @Field(() => Boolean)
  @Property({ default: false })
  handled: boolean = false;

  @Field(() => Beep, { nullable: true })
  @ManyToOne(() => Beep, { nullable: true })
  beep?: Rel<Beep>;

  constructor(reporter: Rel<User>, reported: Rel<User>, reason: string, beep?: string) {
    this.reporter = reporter;
    this.reported = reported;
    this.reason = reason;
    this.timestamp = new Date();
    if (beep) {
      this.beep = beep as unknown as Beep;
    }
  }
}
