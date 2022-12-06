import {
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Length,
  IsUrl,
} from 'class-validator';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    unique: true,
  })
  @Length(2, 30)
  username: string;

  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;


} 