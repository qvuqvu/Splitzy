import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto, EditExpenseDto } from './dto';

@UseGuards(JwtGuard)
@Controller('transaction')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post('create')
  createExpense(@Body() dto: CreateExpenseDto) {
    return this.expenseService.createExpense(dto);
  }

  @Patch('edit/:id')
  editExpense(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditExpenseDto,
  ) {
    return this.expenseService.editExpense(id, dto);
  }

  @Delete('delete/:id')
  deleteExpense(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.deleteExpense(id);
  }

  @Get('getAll')
  getExpenses() {
    return this.expenseService.getExpenses();
  }
}
