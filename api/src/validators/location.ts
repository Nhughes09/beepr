import { IsNumber, IsOptional } from 'class-validator';
import { Location } from '../entities/Location';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LocationInput implements Partial<Location> {

  @Field()
  @IsNumber()
  public latitude!: number;

  @Field()
  @IsNumber()
  public longitude!: number;

  @Field()
  @IsNumber()
  public altitude!: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  public accuracy?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  public altitideAccuracy?: number;

  @Field()
  @IsNumber()
  public heading!: number;

  @Field()
  @IsNumber()
  public speed!: number;
}
