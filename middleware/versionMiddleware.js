import * as constant from "@/app/helpers/constant";
import * as collection from "@/app/common/collection";

import statusType from "@/app/enum/statusTypes";
import ResponseService from "@/app/services/ResponseService";

export const setRequestVersion = (version) => {
    return (req, res, next) => {
        req['meta'] = {
            ...req['meta'],
            version
        };
        return next();
    };
}