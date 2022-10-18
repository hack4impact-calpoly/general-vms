import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ShiftController } from "./shift/shift.controller";

@Module({
  imports: [],
  controllers: [AppController, ShiftController],
  providers: [AppService],
})
export class AppModule {}
