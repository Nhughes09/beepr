import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Authorized, Field, ObjectType } from "type-graphql";
import { QueueEntry } from './QueueEntry';
import { Rating } from './Rating';
import { v4 } from "uuid";
import { PointType } from "../location/types";
import { Point } from "../location/resolver";

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@ObjectType()
@Entity()
export class User {

  constructor(values?: Partial<User>) {
    if (values) {
      Object.assign(this, values);
    }
  }

  @PrimaryKey()
  @Field()
  id: string = v4();

  @Field()
  @Property()
  first!: string;

  @Field()
  @Property()
  last!: string;

  @Field()
  @Property()
  @Unique()
  username!: string;

  @Field({ nullable: true })
  @Property()
  @Unique()
  email!: string;

  @Field({ nullable: true })
  @Property()
  phone!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  venmo?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  cashapp?: string;

  @Field()
  @Property()
  @Authorized('admin')
  password!: string;

  @Field()
  @Property()
  isBeeping: boolean = false;

  @Field()
  @Property()
  isEmailVerified: boolean = false;

  @Field()
  @Property()
  isStudent: boolean = false;

  @Field()
  @Property()
  groupRate: number = 4.0;

  @Field()
  @Property()
  singlesRate: number = 3.0;

  @Field()
  @Property()
  capacity: number = 4;

  @Field()
  @Property()
  queueSize: number = 0;

  @Field({ nullable: true })
  @Property({ columnType: 'numeric', nullable: true })
  rating?: number;

  @Field()
  @Enum(() => UserRole)
  role: UserRole = UserRole.USER;

  @Field({ nullable: true })
  @Property({ nullable: true })
  @Authorized('No Verification Self')
  pushToken?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  photoUrl?: string;

  @Field(() => String)
  @Property({ persist: false })
  name(): string {
    return `${this.first} ${this.last}`;
  }

  @Field({ nullable: true })
  @Property({
    type: PointType,
    columnType: 'geometry',
    nullable: true,
  })
  location?: Point;

  @Field(() => [QueueEntry])
  @OneToMany(() => QueueEntry, q => q.beeper, { orphanRemoval: true, lazy: true, eager: false })
  queue = new Collection<QueueEntry>(this);

  @Field(() => [Rating])
  @OneToMany(() => Rating, r => r.rated, { lazy: true, eager: false })
  ratings = new Collection<Rating>(this);

  @Field({ nullable: true })
  @Property({ nullable: true })
  created: Date = new Date();
}
