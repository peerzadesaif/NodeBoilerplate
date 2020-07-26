const express = require("express");
const router = express.Router();
import AdminController from "@/controllers/v1.0/AdminController";

router.route("/testing/:id").get(AdminController.Testing);

router.route("/testing").get(AdminController.Testing);

module.exports = router;
