import { IsString, MaxLength } from 'class-validator';

export class CreateHangoutDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  ownerId: string;
}
