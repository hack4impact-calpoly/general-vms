import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Body,
  Delete,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { ValidationPipe } from "../validation.pipe";
import { ShiftBodySchema, ShiftQuery } from "./shift.dto";

@Controller("shift")
export class ShiftController {
  @Get()
  findAll(@Query() query: ShiftQuery): string[] {
    console.log(query);
    return ["This action returns all shifts"];
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): string {
    return `This action returns a #${id} shift`;
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateShiftDto: ShiftQuery): string {
    console.log(updateShiftDto);
    return `This action updates a #${id} shift`;
  }

  @Post()
  create(@Body(new ValidationPipe()) createShiftDto: ShiftBodySchema): string {
    console.log(createShiftDto);
    return "";
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return `This action removes a #${id} shift`;
  }
}
