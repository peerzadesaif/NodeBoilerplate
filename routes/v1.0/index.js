const express = require("express");
const router = express.Router();
import apiVersions from "@/app/enum/apiVersions";
import TestingRoutes from "@/routes/v1.0/AdminRoutes/Testing";
/**
 * Common ROUTES WITH NO MIDDLEWARE
 */
// Import Common Routes Here
router.use("/", TestingRoutes);

/**
 * ADMIN LEVEL ROUTES
 */
router.use("/admin", TestingRoutes);

/**
 * WEBAPP LEVEL ROUTES
 */
// Import Wep app Routes Here
router.use("/webapp", TestingRoutes);

/**
 * APP LEVEL ROUTES
 */
// Import Mobile app Routes Here
router.use("/app", TestingRoutes);

module.exports = router;
