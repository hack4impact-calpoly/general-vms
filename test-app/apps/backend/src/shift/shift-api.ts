// isUserAdmin should be omitted for testing
// import isUserAdmin from '../middleware';
import { IShift, ShiftSchema } from "@general-vms/shared";
import * as express from "express";
import { IAuthAndValidatedReq } from "../models/user-session/types";
import { bodyValidate, paramValidate } from "../validators/middleware";
import { z } from "zod";
import { getDB } from "../models/database/database";
import { IUser } from "../models/user/User";
import { IShiftDB, ShiftModel } from "./shift-db";

const router = express.Router();

const database = getDB<IShiftDB>(ShiftModel);

router.post(
  "/new-shift",
  bodyValidate<IShift>({ schema: ShiftSchema }),
  (req: IAuthAndValidatedReq<IShift>, res) => {
    console.log("POST: Creating Calendar Event...");
    console.log(req.body);

    database.saveShift({} as IUser, req.body);

    return res.status(201).send("New shift successfully created");
  },
);

const ShiftParamSchema = z.object({ id: z.preprocess(Number, z.number().min(0)) });
type IShiftParams = z.infer<typeof ShiftParamSchema>;

router.put(
  "/shift/:id",
  paramValidate<IShiftParams>({ schema: ShiftParamSchema }),
  bodyValidate<IShift>({ schema: ShiftSchema }),
  (req: IAuthAndValidatedReq<IShift, IShiftParams>, res) => {
    console.log("PATCH: Editting Calender Event...");
    // Just an example
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const id = req.params.id;
    // request body should be checked for valid properties before cast
    const { start, end, maxVolunteers, title, description, eventAdmin } = req.body;

    const newShift: Partial<IShift> = {
      start,
      end,
      maxVolunteers,
      title,
      description,
      eventAdmin,
    };

    console.log(database.updateShift({} as Partial<IUser>, newShift as IShift));

    return res.status(200).send("Shift has been updated");
  },
);

export default router;
