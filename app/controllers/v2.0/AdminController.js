import ResponseService from "@/app/services/ResponseService";
import statusTypes from "@/app/enum/statusTypes";
import LoggingService from "@/app/services/LoggingService";

import * as constant from "@/app/helpers/constant";

module.exports.Testing = (req, res) => {
  let apiVersion = req.app.get('version')
  LoggingService.consoleLog(`TESTING", "Here we are on ${apiVersion}`, {
    error: "error",
  });
  // Get List From the Queries and pass it to the response service
  let data = [{ data: "data" }];

  return res.status(statusTypes.SUCCESS).json(ResponseService.sendResponse(statusTypes.SUCCESS, constant.CUSTOM_RESPONSE_MESSAGES.USER_RES, apiVersion, data));
};
