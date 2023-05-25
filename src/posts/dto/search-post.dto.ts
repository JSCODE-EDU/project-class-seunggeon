import { Matches, IsString } from 'class-validator';

export class SearchPostDto {
  @IsString()
  @Matches(/^\S.{0,}$/)
  keyword: string;
}