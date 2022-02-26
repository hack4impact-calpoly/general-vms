import yargs from "yargs";
import { runMigrations } from "./src/db/migrate";
import { runServer } from "./src/server";
import { errorHandler } from "./src/util/errorHandler";

const debug = !!process.env.DEBUG || false;
process.on("unhandledRejection", errorHandler(debug));

void yargs.scriptName("gvms")
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	.command("$0", "Start the server", () => {}, () => { runServer(); })
	.command("migrate", "Run database migrations", () => {}, async() => {
		await runMigrations();
		process.exit(0);
	})
	.help()
	.argv;
