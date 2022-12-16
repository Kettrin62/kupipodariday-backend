import { 
  Length, 
  IsUrl, 
  IsNotEmpty, 
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsUrl()
  @IsOptional()
  image: string;

  @IsNotEmpty()
  price: number;

  @IsString()
  @Length(1, 1024)
  @IsOptional()
  description: string;
}
