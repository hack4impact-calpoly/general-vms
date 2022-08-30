import { Container } from "inversify";
import { ALL_IDENTIFIERS, IServiceSetupPromise } from "src/types";

// Waits for each promise to finish, resolving or rejecting once ALL have finished
export async function waitOnSetupPromises(setupPromises: IServiceSetupPromise[]) {
  return Promise.all(
    setupPromises.map(({ promise, ...rest }) => {
      return promise
        .catch((err: unknown) => ({ ...rest, error: err }))
        .then(() => ({ ...rest, error: null }));
    }),
  )
    .then((results) => {
      results.forEach(({ identifier, error }) => {
        if (error) {
          console.warn(`Unexpected setup error when setting up ${identifier.toString()}:`);
          console.warn(error);
        } else {
          console.info(`Successfully setup "${identifier.toString()}"`);
        }
      });
    })
    .catch((err: Error) => {
      console.error("Early exit from waiting on setup:");
      console.error(err); // some coding error in handling happened
    });
}

// Needed to make sure inversify calls setup on each container
export function callEachService(container: Container) {
  ALL_IDENTIFIERS.forEach((id) => {
    container.get(id);
  });
}
