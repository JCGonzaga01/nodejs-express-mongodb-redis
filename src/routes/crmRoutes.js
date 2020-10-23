import Redis from "ioredis";
import {
  getContacts,
  addNewContact,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/crmController.js";
import {
  addNewCountry,
  getCountries,
  getCountryWithId,
} from "../controllers/countryController.js";

const redis = new Redis({
  // password: "p@ssw0rd",
  // Add host: "redis" if run via docker, remove/comment if run locally
  // host: "redis",
});

const routes = (app) => {
  app.route("/testrediscon").get((req, res) => {
    redis.set("puff", "the mighty dragon");
    console.log("puff");
    let resultRedis = "None";
    redis.get("puff", (err, result) => {
      console.log(result);
      resultRedis = `The result is: Puff, ${result}`;
      res.send(resultRedis);
    });
  });

  app
    .route("/contact")
    .get((req, res, next) => {
      // Middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      // console.log(`Resolve: ${res}`);
      next();
    }, getContacts)
    // (req, res, next) => {
    //   return res.send("GET request successful!");
    // }
    .post(addNewContact);

  app
    .route("/contact/:contactID")
    .put(updateContact)
    .delete(deleteContact)
    .get((req, res, next) => {
      // Middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      // console.log(`Resolve: ${res}`);
      redis.hgetall(req.params["contactID"], (err, result) => {
        if (!!Object.keys(result).length) {
          console.log("Result:");
          console.log(result);
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(result);
        } else {
          next();
        }
      });
    }, getContactWithID(redis));

  app
    .route("/country")
    .get((req, res, next) => {
      // Middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      // console.log(`Resolve: ${res}`);
      next();
    }, getCountries)
    .post(addNewCountry);

  app.route("/country/:countryId").get((req, res, next) => {
    // Middleware
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    // console.log(`Resolve: ${res}`);
    redis.hgetall(req.params["contactID"], (err, result) => {
      if (!!Object.keys(result).length) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(result);
      } else {
        next();
      }
    });
  }, getCountryWithId(redis));
};

export default routes;
