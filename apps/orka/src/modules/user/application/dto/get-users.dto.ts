import { IsString, IsNotEmpty } from 'class-validator';

export class GetUsersDto {
  @IsString()
  @IsNotEmpty()
  appId: string;
}
