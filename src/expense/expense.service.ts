import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto, EditExpenseDto } from './dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  createExpense(dto: CreateExpenseDto) {
    return this.prisma.transaction.create({
      data: {
        description: dto.description,
        amount: dto.amount,
        category: dto.category,
        timestamp: dto.timestamp,
        involvedUsers: {
          connect: dto.involvedUsers.map((userId: number) => ({ id: userId })),
        },
        paidBy: {
          connect: { id: dto.paidById },
        },
      },
    });
  }

  editExpense(id: number, dto: EditExpenseDto) {
    return this.prisma.transaction.update({
      where: { id },
      data: {
        ...dto,
        involvedUsers: dto.involvedUsers
          ? {
              set: dto.involvedUsers.map((userId) => ({ id: userId })),
            }
          : undefined,
      },
    });
  }

  deleteExpense(id: number) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }

  getExpenses() {
    return this.prisma.transaction.findMany();
  }
}
