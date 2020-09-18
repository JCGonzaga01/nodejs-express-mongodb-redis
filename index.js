import express from "express";
import routes from "./src/routes/crmRoutes.js";
import mongoose from "mongoose";
import bodyPayser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 4000;

// Mongoose Connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Body-Parser Set-up
app.use(bodyPayser.urlencoded({ extended: true }));
app.use(bodyPayser.json());

routes(app);

// Serving static files
app.use(express.static("static"));

app.use(cors());

app.get("/", (req, res) => {
  res.send(`Node and express server running on port ${PORT}`);
});

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}!`));
