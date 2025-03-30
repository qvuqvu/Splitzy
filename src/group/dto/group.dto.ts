import { IsString, IsArray } from 'class-validator';

import { IsNumber } from 'class-validator';
import { MinArrayLength } from '../decorator/min-length.decorator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsArray()
  @MinArrayLength(2, { message: 'A group must have at least 2 members' })
  members: number[];
}

export class JoinGroupDto {
  @IsNumber()
  groupId: number;

  @IsNumber()
  userId: number;
}
