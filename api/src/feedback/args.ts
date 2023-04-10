import { IsString, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class FeedbackArgs {
  @Field()
  @IsString()
  @MinLength(10)
  message!: string;
}
