import { IsString, IsNotEmpty, Length} from 'class-validator';
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 15)
  "title" : string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  "content" : string;

  @IsNotEmpty()
  titleNotOnlyWhiteSpace() {
    const isOnlyWhiteSpace = this.title.trim().length === 0;
    if (isOnlyWhiteSpace) {
      throw new Error('Title should not be only white spaces');
    }
  }
}