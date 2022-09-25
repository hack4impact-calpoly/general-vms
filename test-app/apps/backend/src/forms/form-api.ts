import * as express from "express";
import { getDB } from "../models/database/database";
import { IFormDB, FormModel } from "./form-db";
import { FormDataTransformer } from "@general-vms/shared";

const router = express.Router();

const database = getDB<IFormDB>(FormModel);

router.route("/forms").get(async (_req, res) => {
  try {
    const forms = await database.getForms();

    res.status(200).json(
      FormDataTransformer.transform({
        forms,
      }),
    );
    return;
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

export default router;
