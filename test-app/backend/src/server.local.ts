import { container, setupPromises } from './env/provider';
import { callEachService, waitOnSetupPromises } from './env/util';
import app from './server';

const port = process.env.PORT || 8080;

callEachService(container);

(async () => {
  await waitOnSetupPromises(setupPromises);
})().then(() => {
  app.listen(port, () => {
    console.log(`\nServer running... listening on port ${port}`);
  });
}).catch((err) => { console.log(err); });
