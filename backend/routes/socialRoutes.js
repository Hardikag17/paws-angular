const express = require("express");
const { body, query } = require("express-validator");
const routes = express.Router();
const {
  get,
  getLikes,
  updateComments,
  updateSocial,
  getSocial,
  deleteSocial,
} = require("../controllers/socialController");

routes.get("/", get);
routes.get("/:PetID/getSocial", getSocial);
routes.get("/:PetID/:UserID/like", getLikes);
routes.get("/:PetID/:socialId/deletesocial", deleteSocial);
routes.post("/:PetID/comment", updateComments);
routes.post("/:PetID/social", updateSocial);

module.exports = routes;
