import * as constant from "@/app/helpers/constant";
import * as collection from "@/app/common/collection";

const setRequestUserDevice = (req, res, next) => {
    console.log('object :>> ');
    let device = collection.parseUserAgent(req.device);
    // let device = collection.parseUserAgent(req.headers["user-agent"]);
    req.headers.device = device;
    req.app.set('device', String(device));
    return next();
};
export default { setRequestUserDevice }