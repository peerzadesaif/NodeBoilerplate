const fs = require("fs");
const path = require("path");

import * as versionMiddleware from "@/middleware/versionMiddleware";
import apiVersions from "@/app/enum/apiVersions";
const versionRoutePath = path.join(__dirname, "");

const initRoute = (app) => {
  fs.readdirSync(versionRoutePath).map((x) => {
    if (apiVersions[x.replace(/\./g, "_").toUpperCase()]) app.use(`/api/${x}`, versionMiddleware.setRequestVersion(x), require(`@/routes/${x}`));
  });
};
export default initRoute;
