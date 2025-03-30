import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto, JoinGroupDto } from './dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  createGroup(dto: CreateGroupDto) {
    return this.prisma.group.create({
      data: {
        name: dto.name,
        users: {
          connect: dto.members.map((userId) => ({ id: userId })),
        },
      },
    });
  }

  joinGroup(dto: JoinGroupDto) {
    return this.prisma.group.update({
      where: { id: dto.groupId },
      data: {
        users: {
          connect: { id: dto.userId },
        },
      },
    });
  }

  getGroups() {
    return this.prisma.group.findMany({
      include: {
        users: true,
        expenses: true,
      },
    });
  }
}
