import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../../types";
import SessionMock from "./UserSessionValidator";
import { MockDatabase } from "../../models/database/mock-db/mock-database";
import { ZodValidator } from "../../validators/js/zod/zod";

const container = new Container();

container.bind(TYPES.UserSessionValidator).to(SessionMock).inSingletonScope();
container.bind(TYPES.UserDatabase).to(MockDatabase).inSingletonScope();
container.bind(TYPES.ShiftDatabase).toService(TYPES.UserDatabase);
container.bind(TYPES.FormDatabase).toService(TYPES.UserDatabase);
container.bind(TYPES.RequestInputValidator).to(ZodValidator).inSingletonScope();

export { container };
