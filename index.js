import express from "express";
import routes from "./src/routes/crmRoutes.js";
import mongoose from "mongoose";
import bodyPayser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 4000;

// Mongoose Connection
mongoose.Promise = global.Promise;
/**
 * use "mongodb://{MongoDB name at Docker-compose}/{DB Name}" if run via Docker
 * use "mongodb://localhost/{DB Name}" if run locally
 */
mongoose.connect("mongodb://localhost/CRMdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Body-Parser Set-up
app.use(bodyPayser.urlencoded({ extended: true }));
app.use(bodyPayser.json());

routes(app);

// Serving static files
// "static" is the folder name
// This is useful if we want to serve static files such as images from the back-end server
// to call the static file: just append the static file name after the root url
// e.g. localhost:4000/sky.jpeg
app.use(express.static("static"));

app.use(cors());

app.get("/", (req, res) => {
  res.send(`Node and express server running on port ${PORT}`);
});

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}!`));
