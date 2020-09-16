import {
  getContacts,
  addNewContact,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/crmController.js";

const routes = (app) => {
  app
    .route("/contact")
    .get((req, res, next) => {
      // Middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
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
    .get(getContactWithID);
};

export default routes;
