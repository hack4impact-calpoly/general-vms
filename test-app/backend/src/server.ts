import * as dotenv from "dotenv";
import * as express from "express";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get("/test", (req, res) => {
  res.send("Hi there!");
});

app.get('*', (req, res) => {
  res.status(400).send('Page not found');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`\nServer running... listening on port ${port}`);
});

module.exports = app;

