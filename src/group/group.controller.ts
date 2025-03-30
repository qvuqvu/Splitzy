import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateGroupDto, JoinGroupDto } from './dto';
import { GroupService } from './group.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('create')
  createGroup(@Body() dto: CreateGroupDto) {
    return this.groupService.createGroup(dto);
  }

  @Post('join')
  joinGroup(@Body() dto: JoinGroupDto) {
    return this.groupService.joinGroup(dto);
  }

  @Get()
  getGroups() {
    return this.groupService.getGroups();
  }
}
